import axios from 'axios';
import getInput from './getInput';

export default function sendData(url, fieldsNames, callback) {
  let sendData = {};
  fieldsNames.forEach((name) => (sendData[name] = getInput(name)));

  axios
    .post(url, sendData)
    .then((res) => {
      return callback(res.data.token);
    })
    .catch((err) => {
      if (err.response !== undefined) {
        console.log(err.response.data);
        alert(err.response.data);
      } else {
        alert(err);
      }
    });
}
