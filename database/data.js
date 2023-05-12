import mongoose from 'mongoose';

// Định nghĩa cấu trúc cho bảng users
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, required: true }
});
const chatroomSchema = new mongoose.Schema({
  chatRoomId: { type: String, required: true },
  messages: { type: Array, required: true, default: [] },
});


// Tạo model cho bảng users
const User = mongoose.model('User', userSchema, 'users');
const Chatroom = mongoose.model('Chatroom', chatroomSchema, 'chatrooms');
export { User, Chatroom };