import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  facebook:{
    id: String,
    token:String,
    email:String,
    name:String
  },
  lastLoggedIn: String
})

export default mongoose.model('User', UserSchema);
