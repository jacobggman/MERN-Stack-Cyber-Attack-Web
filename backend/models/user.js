const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const illegalNameMsg =
  'Please fill only english characters and upper case on the first character';
function validateName(name) {
  var nameRegex = /^[A-Z]\w{2,20}$/;
  return nameRegex.test(name); // Assuming email has a text attribute
}

const illegalEmailMsg = 'Please fill read email address';
function validateEmail(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
}

const illegalPasswordMsg =
  'Please fill strong password that at least: 8 length, one lower case, one upper case, one digit and one special character';
function validatePassword(password) {
  var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  return re.test(password);
}

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 20,
      validate: [validateName, illegalNameMsg],
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 20,
      validate: [validateName, illegalNameMsg],
    },
    password: {
      type: String,
      required: true,
      validate: [validatePassword, illegalPasswordMsg],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validateEmail, illegalEmailMsg],
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
