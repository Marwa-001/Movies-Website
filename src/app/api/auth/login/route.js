import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { loginSchema, flattenZodErrors } from "@/lib/zod-schemas";
import { signToken, AUTH_COOKIE_NAME, authCookieOptions } from "@/lib/jwt";

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Validation failed", errors: flattenZodErrors(parsed.error) },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    await connectDB();

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password", errors: { form: "Invalid email or password" } },
        { status: 401 }
      );
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatches) {
      return NextResponse.json(
        { message: "Invalid email or password", errors: { form: "Invalid email or password" } },
        { status: 401 }
      );
    }

    const token = signToken({ sub: user._id.toString(), email: user.email });

    const response = NextResponse.json(
      {
        user: {
          id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
          avatarColor: user.avatarColor,
        },
      },
      { status: 200 }
    );
    response.cookies.set(AUTH_COOKIE_NAME, token, authCookieOptions);
    return response;
  } catch (err) {
    console.error("[login] error:", err);
    return NextResponse.json({ message: "Something went wrong. Please try again." }, { status: 500 });
  }
}
