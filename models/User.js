import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    namalengkap: {
      type: String,
      required: true,
    },
    userID: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;