
const servicesFirebaseAdmin = {
    type: process.env.SERVICEACCOUNT_TYPE,
    project_id: process.env.SERVICEACCOUNT_PROJECT_ID,
    private_key_id: process.env.SERVICEACCOUNT_PRIVATE_KEY_ID,
    private_key: process.env.SERVICEACCOUNT_PRIVATE_KEY,
    client_email: process.env.SERVICEACCOUNT_CLIENT_EMAIL,
    client_id: process.env.SERVICEACCOUNT_CLIENT_ID,
    auth_uri: process.env.SERVICEACCOUNT_AUTH_URI,
    token_uri: process.env.SERVICEACCOUNT_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.SERVICEACCOUNT_AUTH_PROVIDER,
    client_x509_cert_url: process.env.SERVICEACCOUNT_CLIENT  
}

const databaseURL = process.env.DATABASE;
const storageBucket = process.env.STORAGE;

const CREDENTIALS = {
    type: process.env.DIALOGFLOW_TYPE,
    project_id: process.env.DIALOGFLOW_PROJECT_ID,
    private_key_id: process.env.DIALOGFLOW_PRIVATE_KEY_ID,
    private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
    client_email: process.env.DIALOGFLOW_CLIENT_EMAIL,
    client_id: process.env.DIALOGFLOW_CLIENT_ID,
    auth_uri: process.env.DIALOGFLOW_AUTH_URI,
    token_uri: process.env.DIALOGFLOW_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.DIALOGFLOW_AUTH_PROVIDER,
    client_x509_cert_url: process.env.DIALOGFLOW_CLIENT 
}

module.exports = {
    servicesFirebaseAdmin,     
    databaseURL,
    storageBucket,
    CREDENTIALS
    }