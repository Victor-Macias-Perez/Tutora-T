const { Router } = require('express');

var Interaction = require('../models/interaction');



const router = Router();

router.get('/save/:uid_user', async (req, res) => {
    const { uid_user } = req.params;
    if (uid_user) {
        try {
            const filter = { uid_user };
            var interaction = await Interaction.findOne(filter).lean();
            let data = [].concat(interaction.save_posts);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).send('exist a problem with the interaction ' + error);
        }
    } else res.status(500).send('interaction does not exist');
});

router.get('/hide/:uid_user', async (req, res) => {
    const { uid_user } = req.params;
    if (uid_user) {
        try {
            const filter = { uid_user };
            var interaction = await Interaction.findOne(filter).lean();
            let data = [].concat(interaction.hide_posts);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).send('exist a problem with the interaction ' + error);
        }
    } else res.status(500).send('interaction does not exist');
});

router.get('/follow/:uid_user', async (req, res) => {
    const { uid_user } = req.params;
    if (uid_user) {
        try {
            const filter = { uid_user };
            var interaction = await Interaction.findOne(filter).lean();
            let data = [].concat(interaction.followers);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).send('exist a problem with the interaction ' + error);
        }
    } else res.status(500).send('interaction does not exist');
});

router.patch('/:uid_user/save/:id_Post', async (req, res) => {
    const { id_Post, uid_user } = req.params;

    if (id_Post) {
        try {
            const filter = { uid_user };
            var interaction = await Interaction.find(filter).lean();
            let posts = [].concat(interaction[0].save_posts);
            let newPosts = [];
            if(posts != ""){
                if(!posts.includes(id_Post)){
                    newPosts = posts;
                    newPosts.push(id_Post);
                }else{
                    newPosts = posts.filter(it => it !== id_Post);
                }
            }else{
                newPosts.push(id_Post);
            }
            const star = newPosts.includes(id_Post);
            await Interaction.findOneAndUpdate({ uid_user }, { $set: { save_posts: newPosts } });
            res.status(200).json(star);
        } catch (error) { res.status(500).send('exist a problem with saved the post ' + error); }
    } else res.status(500).send('post does not exist');
});

router.patch('/:uid_user/hide/:id_Post', async (req, res) => {
    const { id_Post, uid_user } = req.params;

    if (id_Post) {
        try {
            const filter = { uid_user };
            var interaction = await Interaction.find(filter).lean();
            let posts = [].concat(interaction[0].hide_posts);
            let newPosts= [];
            if(posts != ""){
                if(!posts.includes(id_Post)){
                    newPosts = posts;
                    newPosts.push(id_Post);
                }else{
                    newPosts = posts.filter(it => it !== id_Post);
                }
            }else{
                newPosts.push(id_Post);
            }
            const star = newPosts.includes(id_Post);
            await Interaction.findOneAndUpdate({ uid_user }, { $set: { hide_posts: newPosts } });
            res.status(200).json(star);
        } catch (error) { res.status(500).send('exist a problem with hided the post ' + error); }
    } else res.status(500).send('post does not exist');
});

router.patch('/:uid_user/follow/:uid_follower', async (req, res) => {
    const { uid_follower, uid_user } = req.params;

    if (uid_follower) {
        try {
            const filter = { uid_user };
            var interaction = await Interaction.find(filter).lean();
            let followers = [].concat(interaction[0].followers);
            let newFollowers= [];
            if(followers != ""){
                if(!followers.includes(uid_follower)){
                    newFollowers = followers;
                    newFollowers.push(uid_follower);
                }else{
                    newFollowers = followers.filter(it => it !== uid_follower);                
                }                
            }else{
                newFollowers.push(uid_follower);
            }           
            const star = newFollowers.includes(uid_follower);
            await Interaction.findOneAndUpdate({ uid_user }, { $set: { followers: newFollowers } });
            res.status(200).json(star);
        } catch (error) { res.status(500).send('exist a problem with the follower ' + error); }
    } else res.status(500).send('post does not exist');
});

module.exports = router;