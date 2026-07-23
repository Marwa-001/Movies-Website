import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { signupSchema, flattenZodErrors } from "@/lib/zod-schemas";
import { signToken, AUTH_COOKIE_NAME, authCookieOptions } from "@/lib/jwt";

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = signupSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Validation failed", errors: flattenZodErrors(parsed.error) },
        { status: 400 }
      );
    }

    const { name, email, password, username } = parsed.data;

    await connectDB();

    const existing = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username }],
    });
    if (existing) {
      const field = existing.email === email.toLowerCase() ? "email" : "username";
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: { [field]: `This ${field} is already taken` },
        },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, username, email: email.toLowerCase(), passwordHash });

    const token = signToken({ sub: user._id.toString(), email: user.email });

    const response = NextResponse.json(
      {
        user: {
          id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
          avatarUrl: user.avatarUrl,
        },
      },
      { status: 201 }
    );
    response.cookies.set(AUTH_COOKIE_NAME, token, authCookieOptions);
    return response;
  } catch (err) {
    console.error("[signup] error:", err);
    return NextResponse.json({ message: "Something went wrong. Please try again." }, { status: 500 });
  }
}
