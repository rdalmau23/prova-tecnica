const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  id: { type: String, required: true, unique: true }
});
const User = mongoose.model('User', userSchema);

const mongoUrl = process.env.MONGO_URL || 'mongodb://mongo:27017/usersdb';

mongoose.connect(mongoUrl)
  .then(async () => {
    console.log('Connectat a MongoDB');

    const usersPath = path.join(__dirname, 'users.json');
    const usersData = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));

    await User.deleteMany({});
    await User.insertMany(usersData);

    console.log('Usuaris importats correctament!');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error:', err);
    mongoose.disconnect();
  });