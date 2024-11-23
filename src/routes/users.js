const { Router } = require('express');

const multer = require('multer');
const { ObjectId } = require('mongodb-legacy');
const {StreamUpload, destroyImage} = require('../helpers/utils');

const router = Router();

var User = require('../models/user');
var Interaction = require('../models/interaction');
var Arbol = require('../models/arbol');
var Post = require('../models/post');
var Comment = require('../models/comment');
var Like = require('../models/like');
var Course = require('../models/course');

const Multer = multer({
    storage: multer.memoryStorage(),
    limits: 1024 * 1024
});

const upload = Multer.fields([{ name: 'imgName' }, { name: 'imgPortadaName' }]);

router.get('/', async (req, res) => {
    try {
        var users = await User.find().lean();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json("error:" + error);
    }
});


router.get('/:username', async (req, res) => {
    try {
        const uName = req.params.username;            
        var result = await User.findOne({
            username : uName
        }).lean();
        if(result)
            return res.status(200).json(result);
        return res.status(500).json("Not Found");
    } catch (error) {
        return res.status(500).json("error" + error);
    }
});

router.get('/userId/:uid_user', async (req, res) => {    
    try {
        const { uid_user } = req.params;              
        var result = await User.findById((uid_user)).lean()
        if(result)
            return res.status(200).json(result);
        return res.status(500).json("Not Found");
    } catch (error) {
        return res.status(500).json("error" + error);
    }
});

router.post('/', async (req, res) => {
    try{
        const { username, email, career, password, name, phone } = req.body;        
        if (email && career && username && password && name && phone) {

            let phoneChange = '';
            if (!phone.includes('+52')) {
                phoneChange = '+52' + phone;
            }else {
                phoneChange = phone;
            }

            var valUsername = await User.findOne({username : req.body.username}).lean();
            if(valUsername)
                return res.status(500).json({ code: 'username-already-exists', message: 'The user with the provided username already exists.' });
            var valEmail = await User.findOne({email : req.body.email}).lean();
            if(valEmail)
                return res.status(500).json({ code: 'email-already-exists', message: 'The user with the provided email already exists.' });
            var valPhone = await User.findOne({phone : phoneChange}).lean();
            if(valPhone)
                return res.status(500).json({ code: 'phone-already-exists', message: 'The user with the provided phone number already exists.' });
    
            const newUser = new User({_id: ObjectId().toString(),phone : phoneChange,...req.body});            

            const newInteraction = new Interaction({ _id: ObjectId().toString(), uid_user: newUser._id
                , hide_posts: [], save_posts: [], followers: [] });

            const newArbol = new Arbol({ _id: ObjectId().toString(), uid_user: newUser._id
                , likes: [], posts: [], followers: [], courses: []
                , inscriptos: [], save_posts: [], comments: []});                                                
            await newUser.save();

            await newInteraction.save();
  
            await newArbol.save();

            return res.status(200).json({newUser});

        }else{
            res.status(500).json({ error: 'Faltan campos de llenar' });
        }
    }catch(err){                
        res.status(500).json({ "error: ": err});
    }    
});

router.put('/:uid_user', upload, async (req, res) => {
    const { uid_user } = req.params;   
    
    try{
        const { carrera, username, password, nombre, telefono } = req.body;
        const { imgName, imgPortadaName } = req.files;        

        var oldUser = await User.findById((uid_user)).lean()
        if(oldUser){
            let update_user = {};
            update_user.uid_user = uid_user;
            if(username){
                var valUsername = await User.findOne({username : req.body.username});
                if(valUsername) 
                    return res.status(500).json({ code: 'username-already-exists', message: 'The user with the provided username already exists.'});
                else update_user.username = username;
            }else{
                update_user.username = oldUser.username;
            }
            if(telefono){
                let telefonoChange = '';
                if (!telefono.includes('+52')) {
                    telefonoChange = '+52' + telefono;
                }
                else {
                    telefonoChange = telefono;
                }
                var valPhone = await User.findOne({phone : telefonoChange});
                if(valPhone) return res.status(500).json({ code: 'phone-already-exists', message: 'The user with the provided phone number already exists.' });
                else update_user.phone = telefonoChange;
            }
                     
            if (carrera) update_user.career = carrera;
            if (password) update_user.password = password;
            if (nombre) update_user.name = nombre;   
            if (imgName) {
                //Cloudinary Storage
                const date = Date.now();
                const [image] = imgName;
                update_user.imgName = uid_user + date + '.' + image.originalname.split('.').pop();
                const url = await StreamUpload(image, update_user.imgName, oldUser.imgName, "users/perfil");                
                update_user.imgUrl = url.url;
            }
            if (imgPortadaName) {
                //Cloudinary Storage
                const date = Date.now();
                const [image] = imgPortadaName;
                update_user.imgPortadaName = uid_user + date + '.' + image.originalname.split('.').pop();
                const url = await StreamUpload(image, update_user.imgPortadaName, oldUser.imgPortadaName, "users/portada");
                update_user.imgPortadaUrl = url.url;
            }
            const filter = {_id: uid_user};            
            const updatedUser = await User.findOneAndUpdate(filter, update_user, {
                new: true
            });
            res.status(200).json(updatedUser);
        }else{            
            res.status(500).json("User not Found");
        }        
    }catch(err){
        res.status(500).json({err});
    }    
});

router.delete("/:uid_user", async (req, res) => {
    const { uid_user } = req.params;
    try {
        var userDelete = await User.findById({_id : uid_user}).lean();
        if(userDelete){
            if(userDelete.imgName)      
                await destroyImage(userDelete.imgName, "users/perfil");                                  
            if(userDelete.imgPortadaName)         
                await destroyImage(userDelete.imgPortadaName, "users/portada");                                                  
            
            var courseArray = await Course.find({ uid_user: uid_user }).lean()
            var postArray = await Post.find({id_user: uid_user}).lean();

            if (courseArray) {
                courseArray.map(async (course) => {
                    if(course.imgName)
                        await destroyImage(course.imgName,"courses"); ;
                    
                    await Comment.deleteMany({ id_Course: course._id })
                    
                    await Like.deleteMany({ id_Course: course._id })

                    await Post.deleteMany({ id_Course: course._id })
        
                    await Course.deleteOne({ _id: course._id })                
                })
            }else{
                console.log("This user doesnt have courses")
            }            

            if(postArray){                    
                postArray.map(async (post) => {
                    if(post.imgName)
                        await destroyImage(post.imgName,"posts");  

                    await Comment.deleteMany({ id_Post: post._id})
                    
                    await Like.deleteMany({ id_post: post._id})

                    await Post.findByIdAndDelete({ _id: post._id})
                });
            }else{
                console.log("this user doesnt have posts")
            }

            await Arbol.deleteOne({uid_user});
            await Interaction.deleteOne({uid_user});
            await User.deleteOne({ _id: uid_user });
                return res.status(200).json("User Deleted");
        }else{
            return res.status(500).json("User Not Found");
        }
    } catch (error) {
        return res.status(500).json("Error: " + error);
    }
});

module.exports = router;