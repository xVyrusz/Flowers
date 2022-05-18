/* eslint-disable import/no-anonymous-default-export */
import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";
import bcrypt from "bcrypt";
import { createAccessToken, createRefreshToken } from '../../../utils/generateToken';

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await login(req, res);
      break;
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ err: 'Please enter your email and password' });
    }

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ err: 'Email or  Password are incorrect.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ err: 'Email or  Password are incorrect.' });
    }

    const accessToken = createAccessToken({ id: user._id });
    const refreshToken = createRefreshToken({ id: user._id });

    res.json({
      msg: "Login success!",
      refreshToken,
      accessToken,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        root: user.root
      }
    });

  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
}