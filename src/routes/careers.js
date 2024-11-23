const { Router } = require('express');
const _ = require('underscore');
const careers = require('../json/careers.json');

const router = Router();

router.get('/careers', (req, res) => {
    res.json(careers);
});

router.get('/careers/:id_undefined', (req, res) => {
    const { id_undefined } = req.params;
    
    _.each(careers, (career, index) => {
        if(career.id == id_undefined || career.clave == id_undefined) {
            res.status(200).json(career);
        };
    });
});

module.exports = router;