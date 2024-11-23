const { Router } = require('express');

const division = require('../json/division.json');

const router = Router();

router.get('/divisions', (req, res) => {
    res.json(division);
});
 
module.exports = router;