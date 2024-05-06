import { user } from "../models/user.js";

export const addUser = async (req, res) => {
  try {
    const newUser = req.body.user;
    console.log(newUser);
    try {
      const createdUser = new user(newUser);
      await createdUser.save();
    } catch (error) {
      ///Lỗi ở đây chỉ là trùng uid user nên không cần nhảy ra
    }
    res.json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(100).json({ message: "fail" });
  }
};
export const getUsers = async (req, res) => {
  try {
    const userNotGet = req.query.userNotGet;
    const users = await user.find({ uid: { $ne: userNotGet } });
    console.log(userNotGet);
    // const createdUser = new user(newUser);
    // await createdUser.save();
    res.json({ users });
  } catch (error) {
    console.log(error);
    res.status(100).json({ message: "fail" });
  }
};

export const getUser = async (req, res) => {
  try {
    const uid = req.query.uid;
    const userFound = await user.findOne({ uid: uid });
    console.log(userFound);
    // const createdUser = new user(newUser);
    // await createdUser.save();
    res.json({ userFound });
  } catch (error) {
    console.log(error);
    res.status(100).json({ message: "fail" });
  }
};
