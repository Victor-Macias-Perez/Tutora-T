const dialogflow = require('@google-cloud/dialogflow');
const { CREDENTIALS } = require('./decodeServices');

const PROJECTID = CREDENTIALS.project_id;

const CONFIGURATION = {
    credentials: {
        private_key: CREDENTIALS['private_key'],
        client_email: CREDENTIALS['client_email']
    }
}

const sessionClient = new dialogflow.SessionsClient(CONFIGURATION);

module.exports = {
    PROJECTID,
    sessionClient,
}