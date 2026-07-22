import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true },
    // Tailwind gradient class chosen on the signup avatar-picker step, e.g.
    // "bg-gradient-to-br from-rose-500 to-red-700". Shown in the Navbar in
    // place of the default profile icon once the user is logged in.
    avatarColor: { type: String, default: null },
  },
  { timestamps: true }
);

// Avoid recompiling the model on every hot-reload in dev
export default mongoose.models.User || mongoose.model("User", UserSchema);
