const { Router } = require('express');

var Like = require('../models/like');


const router = Router();

router.get('/:id_post', async (req, res) => {
    const { id_post } = req.params;
    if (id_post) {
        try {            
            var likes = await Like.findOne({id_post}).lean();            
            let participants = [].concat(likes.uid_users);
            const totalLikes = (participants.length);                   
            res.status(200).json(totalLikes);
        } catch (error) {
            res.send('exist a problem with the like ' + error);
        }
    } else res.status(500).send('post does not exist');
});

router.get('/:uid_user/:id_post', async (req, res) => {
    const { uid_user, id_post } = req.params;
    if (id_post) {
        try {            
            const filter = { id_post };
            var  result = await Like.findOne(filter).lean();
            let participants = [].concat(result.uid_users);
            const arrayExist = participants.includes(uid_user);            
            res.status(200).json(arrayExist);                          
        } catch (error) {
            res.status(500).send('exist a problem with the like ' + error);            
        }
    } else res.status(500).send('post does not exist');
});

router.patch('/:uid_user/:id_post', async (req, res) => {
    const { id_post, uid_user } = req.params;
    if (id_post) {
        try {
            var allLikes = await Like.findOne({ id_post }).lean();
            let likes = [].concat(allLikes.uid_users);
            let newLikes = [];
            if(likes != ""){
                if(!likes.includes(uid_user)){                
                    newLikes = likes;
                    newLikes.push(uid_user);
                }else{
                    newLikes = likes.filter(it => it !== uid_user);                    
                }                    
            }else{            
                newLikes.push(uid_user);
            }
            const star = newLikes.includes(uid_user);
            await Like.findOneAndUpdate({ id_post }, { $set: { uid_users: newLikes }},{ new: true })
            res.status(200).json(star);
        } catch (error) { res.send('exist a problem with the like ' + error); }
    } else res.status(500).send('post does not exist');
});

module.exports = router;