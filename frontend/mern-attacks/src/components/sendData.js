import axios from 'axios';

function getInput(element_id) {
  return document.getElementById(element_id).value;
}

export default function sendData(url, fieldsNames, callback) {
  let sendData = {};
  fieldsNames.forEach((name) => (sendData[name] = getInput(name)));

  axios
    .post(url, sendData)
    .then((res) => {
      alert(res.data.token);
      console.log(res.data.token);
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
