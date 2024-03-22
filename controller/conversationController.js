import Conversation from "../model/Conversation.js";

export const addConversation = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    const exist = await Conversation.findOne({ members: { $all: [receiverId, senderId] } });
    if (exist) {
      return res.status(200).json({ msg: "conversation already exist" });
    }

    const newConversation = new Conversation({
      members: [senderId, receiverId],
    });
    await newConversation.save();
    return res.status(200).json(`conversation added successfully${newConversation}`);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getConversation = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    let conversation = await Conversation.findOne({ members: { $all: [receiverId, senderId] } });
    return res.status(200).json(conversation);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
