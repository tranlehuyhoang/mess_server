import { User } from "../database/data.js"
import { Chatroom } from "../database/data.js";

export async function addUser(req, res) {
    const { username, password, avatar } = req.body;

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            res.status(400).json({ error: 'User already exists' });
            return;
        }
        await User.insertMany({ username, password, avatar });
        res.json({ message: 'User added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while adding the user' });
    }
}

export async function getAlluser(req, res) {
    try {
        const users = await User.find()
        res.json({ message: users })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving users' })
        console.error(error)
    }
}
export async function getuser(req, res) {
    try {
        const users = await User.findById()
        res.json({ message: users })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving users' })
        console.error(error)
    }
}

export const saveMessage = async (chatRoomId, data) => {
    try {
        const filter = { chatRoomId };
        const update = { $push: { messages: data } };
        const options = { upsert: true, new: true };
        const chatroom = await Chatroom.findOneAndUpdate(filter, update, options);
        return chatroom;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to save message');
    }
};
export const getData = async (req, res) => {
    try {
      const chatroom = await Chatroom.find()
     
      res.json({ message: chatroom });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get data');
    }
  };