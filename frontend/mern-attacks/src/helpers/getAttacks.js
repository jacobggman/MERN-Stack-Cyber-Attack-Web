import axios from 'axios';
import getInput from './getInput';

export default async function getAttacks(skip, textInputs) {
  let sendData = {};
  textInputs.forEach((name) => (sendData[name] = getInput(name)));
  sendData['skip'] = skip;

  const config = { headers: { 'Content-Type': 'application/json' } };
  config.headers['x-auth-token'] = localStorage.getItem('token');
  const response = await axios.post(
    'http://localhost:2802/attacks',
    { sendData },
    {
      headers: config.headers,
    }
  );
  return response.data;
}
