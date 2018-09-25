import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type:String,
    unique: true
  },
  password: String,
  facebook:{
    id: String,
    token:String,
    email:String,
    name:String
  },
  lastLoggedIn: String
})

export default mongoose.model('User', UserSchema);
