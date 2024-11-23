const { Router } = require('express');
const _ = require('underscore');

const multer = require('multer');
const { ObjectId } = require('mongodb-legacy');
const {StreamUpload, destroyImage} = require('../helpers/utils');

const division = require('../json/division.json');

const router = Router();

var Post = require('../models/post');
var Comment = require('../models/comment');
var Like = require('../models/like');
var Course = require('../models/course');


const Multer = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 15 * 1024 * 1024
    }
});

const upload = Multer.single('image');

router.get('/', async (req, res) => {
    try {
        var courses = await Course.find().sort({createdAt: -1}).lean();
        res.status(200).json(courses);
    } catch (e) { res.status(500).send("Error: " + e) }
});

router.get('/:id_undefined', async (req, res) => {
    const { id_undefined } = req.params;
    if (id_undefined) {
        try {
            const query = {
                $or: [ {uid_user: id_undefined}, { _id: id_undefined } ]
            }
            var courses = await Course.find(query).sort({createdAt: -1}).lean();
            res.status(200).json(courses);
        } catch (e) { res.status(500).send(e) }
    } else res.status(500).send('courses is not exist');
});

router.get('/:id_undefined/:limit', async (req, res) => {
    const { id_undefined, limit } = req.params;

    if (id_undefined) {
        try {
            const query = {
                $or: [ {uid_user: id_undefined}, { _id: id_undefined } ]
            }
            var courses = await Course.find(query).sort({createdAt: -1}).limit(limit).lean();
            res.status(200).json(courses);
        } catch (e) { res.status(500).send(e) }
    } else res.status(500).send('courses is not exist');
});

router.get('/:id_Course/registration/:uid_user', async (req, res) => {
    const { id_Course, uid_user } = req.params;
    try {
        var course = await Course.findById(id_Course).lean();
        const data = [].concat(course.participants);
        const userExist = data.includes(uid_user);
        res.status(200).json(userExist);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/:uid_user', upload, async (req, res) => {
    const { uid_user } = req.params;
    const { title, description, career, dates, hours, site } = req.body;        
    if (title && description && career && dates && hours && site) {
        try {
            const createdAt = new Date();

            const id_Course = Math.floor(Math.random() * 100000) + 1;
            let course = {};
            course._id = ObjectId().toString();
            const [ CareerDivision ] = division.filter( (division) => {
                const { career: careerDivision } = division;
                if(careerDivision) {
                    if(careerDivision.includes(career))
                        return division;
                }
            } );
            try {
                if(req.file){   
                    //Cloudinary Storage    
                    const date = Date.now();             
                    course.imgName = course._id + date + '.' + req.file.originalname.split('.').pop();
                    
                    const url = await StreamUpload(req.file, course.imgName, "", "courses");
                    course.imgUrl = url.url;
                }
                course.title = title;
                course.description = description;
                course.uid_user = uid_user;
                course.createdAt = createdAt;
                course.career = career;
                course.dates = dates;
                course.hours = hours;
                course.site = site;
                course.visible = true;
                course.id_Course = id_Course;
                course.division = CareerDivision.division;
    
                const newCourse = new Course(course);
                await newCourse.save();                
                res.status(200).json({ message: 'course created: ', newCourse });
            } catch (error) { res.status(500).send(error); }
        } catch (error) {
            res.status(500).send(error);
        }
    } else res.status(500).json({error: 'You need to add a text to create a course'},{title: title}, {description: description});
});

router.put('/:uid_user/:id_Course', upload, async (req, res) => {
    const { id_Course, uid_user } = req.params;
    try {
        const { title, description, career, dates, hours, site, visible } = req.body;
        const filter = { _id: id_Course, uid_user };
        
        const createdAt = new Date();

        let update_Course = {};
        let updateVisible = visible === 'true' ? true : false;

        update_Course.createdAt = createdAt;

        if (title) update_Course.title = title;
        if (description) update_Course.description = description;
        if (career) {
            const [ CareerDivision ] = division.filter( (division) => {
                const { career: careerDivision } = division;
                if(careerDivision) {
                    if(careerDivision.includes(career))
                        return division;
                }
            } );
            update_Course.career = career;
            update_Course.division = CareerDivision.division;
        }
        if (dates) update_Course.dates = dates;
        if (hours) update_Course.hours = hours;
        if (site) update_Course.site = site;
        update_Course.visible = updateVisible;

        var posts = await Post.find({ id_Course }).lean();
        _.each(posts, async (onePost, index) => {
            await onePost.findByIdAndUpdate({ _id: onePost._id }, { $set: { visible: updateVisible }})            
        });
        if (req.file) {
            try {
                //Cloudinary Storage
                const date = Date.now();
                var oldCourse = await Course.findOne(filter).lean();                
                
                update_Course.imgName = id_Course + date + '.' + req.file.originalname.split('.').pop();
                const url = await StreamUpload(req.file, update_Course.imgName, oldCourse.imgName, "courses" );
                update_Course.imgUrl = url.url;
            } catch (error) { console.log(error); }
        }
        const updateCourse = await Course.findByIdAndUpdate(filter, { $set: update_Course }, { new: true });        //checar new: true en este y otros update
        res.status(200).json({ message: 'Update of the course', result: updateCourse });
    } catch (error) { res.status(500).send(error) }
});

router.patch('/:id_Course/registration/:uid_user', async (req, res) => {
    const { id_Course, uid_user } = req.params;
    try {
        var course = await Course.findById(id_Course).lean();
        let participants = [].concat(course.participants);
        let newParticipants = [];
        if(participants != ""){
            if(!participants.includes(uid_user)){
                newParticipants = participants;
                newParticipants.push(uid_user);
            }else{
                newParticipants = participants.filter(it => it !== uid_user);
            }                
        }else{
            newParticipants.push(uid_user);
        }    
        const star = newParticipants.includes(uid_user);
        await Course.findOneAndUpdate({ _id: id_Course }, { $set: { participants: newParticipants }}, { new: true });        //checar new: true en este y otros update
        res.status(200).json(star);
    } catch (err) {
        res.status(500).send("Error " + err);
    }
});

router.delete('/:uid_user/:id_Course', async (req, res) => {
    const { id_Course } = req.params;
    try {
        const query = { _id: id_Course };
        var course = await Course.findById(query).lean();                
        if(course){
            if(course.imgName)
                await destroyImage(course.imgName,"courses");
            await Course.deleteOne(query);
            var post = await Post.find({ id_Course }).lean();
            post.map(async (onePost) => {
                if(onePost.imgName)
                    await destroyImage(onePost.imgName,"posts");            
            })
            await Post.deleteMany({ id_Course });
            await Comment.deleteMany({ id_Course });
            await Like.deleteMany({ id_Course });
            res.status(200).send('Course delete');
        }else{
            res.status(500).send('Course not Found');
        }
    } catch (error) { res.send('exist a problem with the course') }
});

module.exports = router;