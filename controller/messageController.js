import Conversation from "../model/Conversation.js";
import Message from "../model/Message.js";

export const sendMessage = async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    const { conversationId, textValue } = req.body;
    await newMessage.save();
    await Conversation.findByIdAndUpdate(conversationId, { latestMessage: textValue });
    return res.status(200).json(`${newMessage}: message has been seen successfully`);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const messages = await Message.find({ conversationId: id });
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
