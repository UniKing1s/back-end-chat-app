import { message } from "../models/message.js";

export const sendMess = async (req, res) => {
  try {
    const newMessage = req.body.message;
    console.log(newMessage);
    const sentMess = new message(newMessage);
    await sentMess.save();
    res.json({ message: "send mess success" });
  } catch (error) {
    console.log(error);
    res.status(100).json({ message: "fail" });
  }
};
export const getMess = async (req, res) => {
  try {
    // console.log(req.body);
    const user = req.query.user;
    const userMessing = req.query.userMessing;
    console.log(user);
    console.log(userMessing);
    const mess = await message.find({
      $or: [
        { fromUid: user, toUid: userMessing },
        { fromUid: userMessing, toUid: user },
      ],
    });
    res.json({ mess });
  } catch (error) {
    console.log(error);
    res.status(100).json({ message: "fail" });
  }
};
