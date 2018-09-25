import mongoose from 'mongoose';
import config from '../config.json';
const NotesSchema = new mongoose.Schema({
  user:{ type: mongoose.Schema.ObjectId, ref: 'User' },
  noteType:{
    type:String,
    enum:config.noteType
  },
  plainText: String,
  richText: String,
  tags:[],
  access: []
})

export default mongoose.model('Note', NotesSchema);
