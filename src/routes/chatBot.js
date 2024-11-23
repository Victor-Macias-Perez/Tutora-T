const { Router } = require('express');

const { PROJECTID, sessionClient } = require('../services/dialogflow');

const router = Router(); 

const detectIntent = async (languageCode, queryText, sessionId) => {
    let sessionPath = sessionClient.projectAgentSessionPath(PROJECTID, sessionId);

    let request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: queryText,
                languageCode: languageCode,
            }
        }
    }

    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;

    return {
        response: result.fulfillmentText
    }
}

router.post('/', async (req, res) => {
    let lenguageCode = 'en';
    let queryText = req.body.message;
    let sessionId = req.body.username;

    let responseData = await detectIntent(lenguageCode, queryText, sessionId);

    res.json({
        message: responseData.response,
        botImage: "URL" 
    });
});

module.exports = router;

