const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BioSchema = require('./schemas/BioSchema');
const SemesterSchema = require('./schemas/SemesterSchema');
const PostRegistrationSchema = require('./schemas/PostRegistrationSchema');

const UserSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: { type: String, required: true },
  bio: { type: BioSchema, default: {} },
  favorite_subjects: [String],
  favorite_teachers: [String],
  grades: [SemesterSchema],
  postRegistrationInfo: { type: PostRegistrationSchema, default: {} }
});

module.exports = mongoose.model('User', UserSchema);
