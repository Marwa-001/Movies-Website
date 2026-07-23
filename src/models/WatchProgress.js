import mongoose from "mongoose";

const WatchProgressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tmdbId: { type: String, required: true },
    mediaType: { type: String, enum: ["movie", "tv"], default: "movie" },
    title: { type: String, required: true },
    posterPath: { type: String, default: null },
    backdropPath: { type: String, default: null },
    progressSeconds: { type: Number, default: 0 },
    durationSeconds: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// One progress record per user+title
WatchProgressSchema.index({ user: 1, tmdbId: 1, mediaType: 1 }, { unique: true });

export default mongoose.models.WatchProgress ||
  mongoose.model("WatchProgress", WatchProgressSchema);