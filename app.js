const AWS = require("aws-sdk");
require("dotenv").config();

/* O id e chave do usuário podem ser obtidos no momento da criação, é importante ressaltar 
que o mesmo deve estar dentro do grupo refente às políticas de SNS no console da AWS*/
let AccessKeyId = process.env.AWS_ACCES_KEY_ID;
let SecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const loginCredentials = {
  id: AccessKeyId,
  key: SecretAccessKey,
};

// Objeto para seleção de região e credenciais.
AWS.config.update({
  region: "us-east-1",
  accessKeyId: loginCredentials.id,
  secretAccessKey: loginCredentials.key,
});

// Criação dos parâmetros resposáveis pelas publicações

let paramsMessage = {
  Message:
    "Essa é uma mensagem de teste, enviada pela API." /* aqui entra a mensagem que será enviada, respeitando a qtd máxima de 160 caractéres */,
  PhoneNumber: "+ codigo do país + ddd + número do telefone",
};

// Cria um objeto pela promise, através do construtor SNS

function sendSMS(params) {
  let publishTextPromise = new AWS.SNS().publish(params).promise();
  // Verifica o estado da promise para enviar ou rejeitar de acordo com o resultado.
  publishTextPromise
    .then(function (data) {
      console.log("MessageID is " + data.MessageId);
    })
    .catch(function (err) {
      console.error(err, err.stack);
    });
}

sendSMS(paramsMessage);
