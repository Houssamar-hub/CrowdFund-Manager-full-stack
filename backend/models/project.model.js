import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    capital: { type: Number, required: true },
    status: { type: String, enum: ["open", "closed"], default: "open" },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    maxInvestmentPercent: { type: Number, default: 50 },
    investments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Investment" }],
  },
  { timestamps: true },
);

export const Project = mongoose.model("Project", projectSchema);
