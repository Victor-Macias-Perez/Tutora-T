const { Router } = require('express');
const { ObjectId } = require('mongodb-legacy');

const router = Router();

var Chat = require('../models/chat');

router.get('/:uid_user', async (req, res) => {
    const { uid_user } = req.params;
    try {
        const query = {
            $or: [ { uid_user: uid_user }, { uid_userChat: uid_user } ]
        }
        let allChats = [];
        var chats = await Chat.find(query).sort({createdAt: -1}).lean();
        chats.map((doc) => {
            if(allChats.find(chat => chat.id_message === doc.id_message)) {
                const chatObj = allChats.find(chat => chat.id_message === doc.id_message);
                const position = allChats.indexOf(chatObj);
                        
                (chatObj.createdAt < doc.createdAt) && allChats.splice(allChats.indexOf(position), 1, { ...doc});
            } else allChats.push({ ...doc});
        });
        res.status(200).json(allChats);
    } catch(e) { res.status(500).send("Error: " + e) }
});

router.get('/:uid_user/:limit', async (req, res) => {
    try {
        const { uid_user, limit } = req.params;
        const query = {
            $or: [ { uid_user: uid_user }, { uid_userChat: uid_user } ]
        }
        let allChats = [];
        let counter = 0;

        var chats = await Chat.find(query).sort({createdAt: -1}).lean();
        chats.map((doc) => {
            if( counter < limit ) {
                if(allChats.find(chat => chat.id_message === doc.id_message)) {
                    const chatObj = allChats.find(chat => chat.id_message === doc.id_message);
                    const position = allChats.indexOf(chatObj);
                    
                    (chatObj.createdAt < doc.createdAt) && allChats.splice(allChats.indexOf(position), 1, { ...doc});
                } else allChats.push({ ...doc});
            }
            counter++;
        });
        res.status(200).json(allChats);
    } catch(e) { res.status(500).send(e) }
});

router.get('/:uid_user/to/:uid_userChat', async (req, res) => {
    try {
        const { uid_user, uid_userChat } = req.params;
        const query = {
            $or: [ { uid_user: uid_user, uid_userChat: uid_userChat }, 
                { uid_user: uid_userChat, uid_userChat: uid_user } ]
        }
        var chats = await Chat.find(query).sort({createdAt: 1}).lean();    
        res.status(200).json(chats);
    } catch(e) {res.status(500).send(e)}
});

router.post('/:uid_user/to/:uid_userChat', async (req, res) => {
    const { uid_user, uid_userChat } = req.params;
    const { message } = req.body;
    if(message != '') {
        if(uid_user && uid_userChat) {
            try {
                const createdAt = new Date();
                const seen = false;
                const query = {
                    $or: [ { uid_user, uid_userChat: uid_userChat }, 
                        { uid_user: uid_userChat, uid_userChat: uid_user } ]
                }                         
                let id_message;
                var querySnapshot = await Chat.findOne(query).sort({createdAt: -1}).lean();
                
                if(querySnapshot)
                    id_message = querySnapshot.id_message;
                if(!id_message)
                    (id_message = Math.floor(Math.random() * 100000) + 1);
                
                const newChat = new Chat({
                    _id: ObjectId().toString(),
                    id_message,
                    uid_userChat,
                    uid_user,
                    message,
                    seen,
                    createdAt
                });
                await newChat.save();
                res.status(200).send('message sent: ' + newChat);
            } catch(e) { return res.status(500).send("Error: " + e) }
        } else return res.status(500).send('There is a problem with Chat username and username');
    } else return res.status(500).send('You need to add a text to send the message');
});

router.patch('/:uid_user/to/:uid_userChat', async (req, res) => {
    try {
        const { uid_user, uid_userChat } = req.params;
        
        const filter = {
             uid_user, 
             uid_userChat,
             seen: false
        };

        let updateChat = await Chat.updateMany(filter, {$set: {seen: true}}, { new: true });
        res.status(200).json({message: "Message seen", updateChat});

    } catch(e) {res.status(500).send(e)}
});

module.exports = router;
