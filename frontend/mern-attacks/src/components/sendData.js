function getInput(element_id) {
  return document.getElementById(element_id).value;
}

export default function sendData(fieldsNames) {
  const input = {};
  for (var fieldName in fieldsNames) {
    input[fieldName] = getInput(fieldName);
  }
  console.log(input);
  alert(input);
}
