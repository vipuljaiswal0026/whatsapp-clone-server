import User from "../model/User.js";

export const addUser = async (req, res) => {
  try {
    console.log(req.body);
    const user = req.body;
    let exist = await User.findOne({ sub: user.sub });
    if (exist) {
      return res.status(200).json({ msg: "user already exist" });
    }

    const newUser = new User(req.body);
    await newUser.save();
    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
};
