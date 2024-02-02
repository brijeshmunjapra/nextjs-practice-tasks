import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'User nam e is required.'],
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
  },
});

const User = models.User || model('User', UserSchema);

export default User;