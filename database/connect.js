import mongoose from 'mongoose';

async function connect() {
    const dbUser = '2509roblox';
    const dbPass = 'messenger';
    const dbName = 'messenger';

    const uri = `mongodb+srv://2509roblox:${dbPass}@cluster0.5eau0lf.mongodb.net/`;
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

export default connect;