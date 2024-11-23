const { Router } = require('express');
const { ObjectId } = require('mongodb-legacy');

var Course = require('../models/course');
var Notification = require("../models/notification")

const router = Router();

router.get('/:uid_user', async (req, res) => { 
    try {
        const { uid_user } = req.params;
        const query = {
            uid_creator: uid_user
        }
        var notifications = await Notification.find(query).sort({createdAt: -1}).lean();
        let allNotifications = [];

        notifications.map((doc) => {
            if(allNotifications.find(notification => notification.id_notification === doc.id_notification)) {
                const notificationObj = allNotifications.find(notification => notification.id_notification === doc.id_notification);
                const position = allNotifications.indexOf(notificationObj);
                
                (notificationObj.createdAt < doc.createdAt) && allNotifications.splice(allNotifications.indexOf(position), 1, { ...doc});
            } else allNotifications.push({ ...doc});
        });
        res.status(200).send(allNotifications);
    } catch(e) { res.status(500).send(e) }
});

router.get('/:uid_user/all', async (req, res) => {
    try {
        const { uid_user } = req.params;
        const query = {
            uid_creator: uid_user
        }
        var result = await Notification.find(query).sort({createdAt: -1}).lean();

        res.status(200).json(result);
    } catch(e) { res.status(500).send(e) }
});

router.get('/:uid_user/:limit', async (req, res) => {
    try {

        const { uid_user, limit } = req.params;
        const query = {
            uid_creator: uid_user
        }
        let allNotifications = [];
        let counter = 0;
 
        var result = await Notification.find(query).sort({createdAt: -1}).limit(limit).lean();

        result.map((doc) => {
            if(counter < limit) {
                if(allNotifications.find(notification => notification.id_notification === doc.id_notification)) {
                    const notificationObj = allNotifications.find(notification => notification.id_notification === doc.id_notification);
                    const position = allNotifications.indexOf(notificationObj);
                    
                    (notificationObj.createdAt < doc.createdAt) && allNotifications.splice(allNotifications.indexOf(position), 1, { ...doc});
                } else allNotifications.push({ ...doc});
            }
            counter++;
        });
        res.status(200).json(allNotifications);

    } catch(e) { res.status(500).send("Error: " + e) }
});

router.post('/:uid_user', async (req, res) => {
    const { uid_user } = req.params;
    const { uid_creator, id_action = '', action, type } = req.body;
    if(type) {
        if(uid_user) {
            try {

                const createdAt = new Date();
                const query = {
                    uid_user,
                    id_action,
                    type
                } 
                
                let id_notification;
                let uid = '';

                if( !uid_creator && type === 'course' ) {
                    var course = await Course.find({ _id: id_action }).lean();
                    uid = course.uid_user;
                }
                var querySnapshot = await Notification.find(query).sort({createdAt: -1}).lean();

                if(querySnapshot)
                    querySnapshot.map((doc) => { id_notification = doc.id_notification; });
                
                if(!id_notification) {
                    
                    type === 'like' && (id_notification = Math.floor(Math.random() * 100000) + 1);
                    type === 'comment' && (id_notification = Math.floor(Math.random() * 100000) + 1);
                    type === 'post' && (id_notification = Math.floor(Math.random() * 100000) + 1);
                    type === 'course' && (id_notification = Math.floor(Math.random() * 100000) + 1);
                    type === 'inscription' && (id_notification = Math.floor(Math.random() * 100000) + 1);
                    type === 'follower' && (id_notification = Math.floor(Math.random() * 100000) + 1);
                }
                const newNotification = new Notification({
                    _id: ObjectId().toString(),
                    id_notification,
                    uid_creator: uid_creator ? uid_creator : uid,
                    id_action,
                    uid_user,
                    action,
                    type,
                    createdAt
                })
                await newNotification.save();
                res.status(200).json({ message: 'new notification sent', newNotification});
            } catch(e) { return res.status(500).send(e) }
        } else return res.status(500).send('There is a problem with user');
    } else return res.status(500).send('You need to add action for send notification');
});

module.exports = router;