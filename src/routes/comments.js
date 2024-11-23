const { Router } = require('express');
const { ObjectId } = require('mongodb-legacy');

var Comment = require('../models/comment');

const router = Router();

router.get('/:id_Post', async (req, res) => {
    const { id_Post } = req.params;
    if(id_Post) {
        try {
            var comments = await Comment.find({ id_Post }).lean();
            res.status(200).json({total_comments: comments.length, comments});
        } catch (error) {res.status(500).send("error: " + error);}
    }else res.status(500).send('comments no exist');
});

router.get('/total_comments/:id_Post', async ( req, res ) => {
    const { id_Post } = req.params;
    if(id_Post) {
        try {
            var comments = await Comment.find({ id_Post }).lean();
            const total_comments = (comments.length);                   
            res.status(200).json(total_comments);
        } catch (error) {
            
        };
    };
});

router.get('/comments/:id_Post', async ( req, res ) => {
    const { id_Post } = req.params;
    if(id_Post) {
        try {
            var comments = await Comment.find({ id_Post }).lean();
            res.status(200).json(comments);         
        } catch (error) {
            
        };
    };
});

router.get('/:id_Post/:limit', async (req, res) => {
    const { id_Post, limit } = req.params;
    if(id_Post) {
        try {
            var comments = await Comment.find({ id_Post }).limit(limit).lean();
            res.status(200).json(comments);
        } catch (error) {res.status(500).send("error: "+error);}
    }else res.status(500).send('comments no exist');
});

router.post('/:uid_user/:id_Post', async (req, res) => {
    const { uid_user, id_Post } = req.params;
    const { comment, id_Course = null } = req.body;
    if(comment) {
        try {
            const createdAt = new Date();
            const newComment = new Comment({
                _id: ObjectId().toString(),
                id_Post,
                uid_user,
                id_Course,
                comment,
                createdAt
            });
            await newComment.save();
            res.status(200).send('new comment created ' + newComment);
        } catch(error) { res.status(500).send(e + 'exist a problem about this new comment'); }
    } else res.status(200).send('No exist a new comment');
});

router.patch('/:uid_user/:id_Post/of/:id_comment', async (req, res) => {
    const { uid_user, id_comment } = req.params;
    const { comment } = req.body;
    const filter = { _id: id_comment, uid_user };
    if(uid_user) {
        if(comment) {
            try {
                const updateComment = await Comment.findOneAndUpdate(filter, { $set: { comment } },{ new: true });
                res.status(200).send('Comment edited with success '+ updateComment);
            } catch(error) { res.status(500).send('Exist a problem about this comment'); }
        } else res.status(200).send('No exist a update about this comment');
    }
});

router.delete('/:uid_user/:id_Post/of/:id_comment', async (req, res) => {
    const { id_comment, uid_user, id_Post } = req.params;
    const query = {_id : id_comment, uid_user, id_Post};
    try {
        const deleteComment = await Comment.findOneAndDelete(query);
        res.status(200).send('Comment deleted with success: ' + deleteComment); 
    } catch(error) { res.status(500).send('There is a problem with this comment'); }
});

module.exports = router;