const { Router } = require('express');

const multer = require('multer');
const { ObjectId } = require('mongodb-legacy');
const {StreamUpload, destroyImage} = require('../helpers/utils');

var Post = require('../models/post');
var Comment = require('../models/comment');
var Like = require('../models/like');
var Course = require('../models/course');

const router = Router();

const Multer = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 15 * 1024 * 1024
    }
});

const upload = Multer.single('imgPost');

router.get('/', async (req, res) => {
        try { 
            var posts = await  Post.find().sort({createdAt: -1}).lean()        
            res.status(200).json(posts);        
        } catch (e) { 
            return res.status(500).json("error:" + e);
        }

});

router.get('/:id_undefined', async (req, res) => {
    const { id_undefined } = req.params;
    if(id_undefined){
        try{
            const query = {
                $or: [ {uid_user: id_undefined}, { _id: id_undefined }, { id_Course: id_undefined } ]
            }
            var posts = await Post.find(query).sort({createdAt: -1}).lean();
            if (posts){
                res.status(200).json(posts);
            }else{
                return res.status(500).json("Posts Not Found");
            }
        }catch(err){            
            return res.status(500).json("Error: " + err);
        }
    }else
        return res.status(500).json("Null ID");
});

router.get('/:id_undefined/:limit', async (req, res) => {
    const { id_undefined, limit } = req.params;
    if(id_undefined){
        try{
            const query = {
                $or: [ {uid_user: id_undefined}, { _id: id_undefined }, { id_Course: id_undefined } ]
            }
            var posts = await Post.find(query).limit(limit).sort({createdAt: -1}).lean();
            if (posts){
                res.status(200).json(posts);
            }else{
                return res.status(500).json("Posts Not Found");
            }
        }catch(err){            
            return res.status(500).json("Error: " + err);
        }
    }else
        return res.status(500).json("Null ID");
});

router.post('/:uid_user', upload, async (req, res) => {
    const { uid_user } = req.params;
    const { title, description, career, id_Course = null } = req.body;
    if (title && description && career) {
        try {
            const createdAt = new Date();

            const id_Post = Math.floor(Math.random() * 100000) + 1;
            let post = {};

            try {
                if(req.file){
                    //Cloudinary Storage
                    const date = Date.now();
                    post.imgName = id_Post + date + '.' + req.file.originalname.split('.').pop();
                    const url = await StreamUpload(req.file, post.imgName, "", "posts");
                    post.imgUrl = url.url;
                }
                post._id = ObjectId().toString();
                post.title = title;
                post.description = description;
                post.uid_user = uid_user;
                post.id_Course = id_Course;
                post.createdAt = createdAt;
                post.id_Post = id_Post;
                post.career = career;

                if(id_Course) {
                    var course = await Course.find({ _id: id_Course }).lean();
                    post.visible = course.visible;
                }                
                const newPost = new Post(post);
                const newLike = new Like({ _id: ObjectId().toString(), id_post: post._id, id_Course });
                
                await newPost.save();
                await newLike.save();
                res.status(200).json({ message: 'Post created: ', newPost });
            } catch (e) { res.status(500).send(e); }
        } catch (e) { res.status(500).send(e); }
    } else res.status(500).send('You need to add a text to create a post');
});

router.put('/:uid_user/:id_Post', upload, async (req, res) => {
    const { id_Post, uid_user } = req.params;
    try {
        const { title, description } = req.body;
        const filter = { _id: id_Post, uid_user };
        const createdAt = new Date();

        let update_Post = {};        
        update_Post.createdAt = createdAt;

        if (title) update_Post.title = title;
        if (description) update_Post.description = description;

        if (req.file) {
            try {
            //Cloudinary Storage
                const date = Date.now();
                var oldPost = await Post.findOne(filter).lean();                

                update_Post.imgName = oldPost.id_Post + date + '.' + req.file.originalname.split('.').pop();            
                const url =  await StreamUpload(req.file, update_Post.imgName, oldPost.imgName, "posts")                
                update_Post.imgUrl = url.url;                
            } catch (error) { console.log(error); }
        }
        const updatedPost = await Post.findByIdAndUpdate(filter, { $set: update_Post }, {
            new: true
        });        
        res.status(200).json({ message: 'Update of the post', result: updatedPost });
    } catch (error) { res.status(500).json({ "error": err}) }
});

router.delete('/:uid_user/:id_Post', async (req, res) => {
    const { id_Post } = req.params;
    try {
        var post = await Post.findById({_id: id_Post}).lean();                
        if(post){
            if(post.imgName)
                await destroyImage(post.imgName,"posts");            
 
         await Post.deleteOne({_id: id_Post})    
 
         await Comment.deleteMany({id_Post: id_Post})                 
 
         await Like.deleteMany({ id_post: id_Post})
 
         res.status(200).send('post delete');
        }else{
            res.status(500).send('Post not Found');
        }   
    } catch (error) { res.status(500).send('exist a problem with the post') }
});

module.exports = router;
