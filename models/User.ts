import mongoose from "mongoose";

interface IUser {
  username: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
