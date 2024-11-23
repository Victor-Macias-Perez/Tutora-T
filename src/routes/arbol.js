const { Router } = require('express');

var Arbol = require('../models/arbol');

const router = Router();

router.get('/:uid_user/like', async (req, res) => {
    const { uid_user } = req.params;

    if (uid_user) {
        try {
            const filter = { uid_user };
            var arbol = await Arbol.findOne(filter).lean();
            let likes = [].concat(arbol.likes);
            res.status(200).json(likes);
        } catch (error) {
            res.status(500).json({ message: 'exist a problem with the interaction ', error });
        }
    }else res.status(500).send('interaction does not exist');
});

router.patch('/:uid_user/like', async (req, res) => {
    const { uid_user } = req.params;
    const { career } = req.body;
    if (uid_user) {
        try {
            var arbol = await Arbol.findOne({ uid_user }).lean();            
            var likes = [].concat(arbol.likes);
            var filterLikes = [];
            var newLikes = [];
            if(likes != ""){                                
                filterLikes = likes.filter( like => like.career === career);
                newLikes = likes.filter(like => like.career !== career);                
                if(filterLikes != ""){            
                    newLikes.push({total: filterLikes[0].total+1, career});
                }else{                    
                    newLikes.push({total: 1, career});
                }            
            }else{                
                newLikes.push({total: 1, career});
            }
            const updateArbol = await Arbol.findOneAndUpdate({ uid_user }, { $set: { likes: newLikes } },{ new: true });
            res.status(200).json({ message: 'Update in the arbol',updateArbol});
        } catch (error) {
            res.status(500).send("Error: " + error);
        }
    }
    else res.status(500).send('interaction does not exist');
});

router.get('/:uid_user/post', async (req, res) => {
    const { uid_user } = req.params;
    if (uid_user) {
        const filter = { uid_user };
        var arbol = await Arbol.findOne(filter).lean();
        let data = [].concat(arbol.posts);
        res.status(200).json(data);
        try {
        } catch (error) {
            res.status(500).json({ message: 'exist a problem with the interaction ', error });
        }
    }
    else res.status(500).send('interaction does not exist');
});

router.patch('/:uid_user/post', async (req, res) => {
    const { uid_user } = req.params;
    const { career } = req.body;
    if (uid_user) {
        try {
            var arbol = await Arbol.findOne({ uid_user }).lean();            
            var posts = [].concat(arbol.posts);
            var filterPosts = [];
            var newPosts = [];
            if(posts != ""){                                
                filterPosts = posts.filter( post => post.career === career);
                newPosts = posts.filter(post => post.career !== career);                
                if(filterPosts != ""){            
                    newPosts.push({total: filterPosts[0].total+1, career});
                }else{                    
                    newPosts.push({total: 1, career});
                }            
            }else{                
                newPosts.push({total: 1, career});
            }
            const updateArbol = await Arbol.findOneAndUpdate({ uid_user }, { $set: { posts: newPosts } },{ new: true });
            res.status(200).json({ message: 'Update in the arbol',updateArbol});
        } catch (error) {
            res.status(500).json({ message: 'exist a problem with the interaction ', error });
        }
    }
    else res.status(500).send('interaction does not exist');
});

router.get('/:uid_user/follow', async (req, res) => {
    const { uid_user } = req.params;
    if (uid_user) {
        try {
            const filter = { uid_user };
            var arbol = await Arbol.findOne(filter).lean();
            let followers = [].concat(arbol.followers);
            res.status(200).json(followers);            
        } catch (error) {
            res.status(500).json({ message: 'exist a problem with the interaction ', error });
        }
    }
    else res.status(500).send('interaction does not exist');
});

router.patch('/:uid_user/follow', async (req, res) => {
    const { uid_user } = req.params;
    const { career } = req.body;

    if (uid_user) {
        try {
            var arbol = await Arbol.findOne({ uid_user }).lean();            
            var followers = [].concat(arbol.followers);
            var filterFollowers = [];
            var newFollowers = [];
            if(followers != ""){                                
                filterFollowers = followers.filter( follower => follower.career === career);
                newFollowers = followers.filter(follower => follower.career !== career);                
                if(filterFollowers != ""){            
                    newFollowers.push({total: filterFollowers[0].total+1, career});
                }else{                    
                    newFollowers.push({total: 1, career});
                }            
            }else{                
                newFollowers.push({total: 1, career});
            }
            const updateArbol = await Arbol.findOneAndUpdate({ uid_user }, { $set: { followers: newFollowers } },{ new: true });
            res.status(200).json({ message: 'Update in the arbol',updateArbol});
        } catch (error) {
            res.status(500).json({ message: 'exist a problem with the interaction ', error });
        }
    }
    else res.status(500).send('interaction does not exist');
});

router.get('/:uid_user/course', async (req, res) => {
    const { uid_user } = req.params;

    if (uid_user) {
        try {
            const filter = { uid_user };
            var arbol = await Arbol.findOne(filter).lean();
            let courses = [].concat(arbol.courses);
            res.status(200).json(courses);        
        } catch (error) {
            res.status(500).json({ message: 'exist a problem with the interaction ', error });
        }
    }
    else res.status(500).send('interaction does not exist');
});

router.patch('/:uid_user/course', async (req, res) => {
    const { uid_user } = req.params;
    const { career } = req.body;
    if (uid_user) {
        try {
            var arbol = await Arbol.findOne({ uid_user }).lean();            
            var courses = [].concat(arbol.courses);
            var filterCourses = [];
            var newCourses = [];
            if(courses != ""){                                
                filterCourses = courses.filter( course => course.career === career);
                newCourses = courses.filter(course => course.career !== career);                
                if(filterCourses != ""){            
                    newCourses.push({total: filterCourses[0].total+1, career});
                }else{                    
                    newCourses.push({total: 1, career});
                }            
            }else{                
                newCourses.push({total: 1, career});
            }
            const updateArbol = await Arbol.findOneAndUpdate({ uid_user }, { $set: { courses: newCourses } },{ new: true });
            res.status(200).json({ message: 'Update in the arbol',updateArbol});
        } catch (error) {
            res.status(500).json({ message: 'exist a problem with the interaction ', error });
        }
    }
    else res.status(500).send('interaction does not exist');
});

router.get('/:uid_user/course/inscripto', async (req, res) => {
    const { uid_user } = req.params;
    if (uid_user) {
        try {
            
            const filter = { uid_user };
            var arbol = await Arbol.findOne(filter).lean();
            let inscriptos = [].concat(arbol.inscriptos);
            res.status(200).json(inscriptos);            
        } catch (error) {
            res.status(500).json({ message: 'exist a problem with the interaction ', error });
        }
    }
    else res.status(500).send('interaction does not exist');
});

router.patch('/:uid_user/course/inscripto', async (req, res) => {
    const { uid_user } = req.params;
    const { career } = req.body;

    if (uid_user) {
        try {
            var arbol = await Arbol.findOne({ uid_user }).lean();            
            var inscriptos = [].concat(arbol.inscriptos);
            var filterInscriptos = [];
            var newInscriptos = [];
            if(inscriptos != ""){                                
                filterInscriptos = inscriptos.filter( inscripto => inscripto.career === career);
                newInscriptos = inscriptos.filter(inscripto => inscripto.career !== career);                
                if(filterInscriptos != ""){            
                    newInscriptos.push({total: filterInscriptos[0].total+1, career});
                }else{                    
                    newInscriptos.push({total: 1, career});
                }            
            }else{                
                newInscriptos.push({total: 1, career});
            }
            const updateArbol = await Arbol.findOneAndUpdate({ uid_user }, { $set: { inscriptos: newInscriptos } },{ new: true });
            res.status(200).json({ message: 'Update in the arbol',updateArbol});
        } catch (error) {
            res.status(500).json({ message: 'exist a problem with the interaction ', error });
        }
    }
    else res.status(500).send('interaction does not exist');
});

router.get('/:uid_user/save', async (req, res) => {
    const { uid_user } = req.params;

    if (uid_user) {
        try {            
            const filter = { uid_user };
            var arbol = await Arbol.findOne(filter).lean()
            let save_posts = [].concat(arbol.save_posts);
            res.status(200).json(save_posts);            
        } catch (error) {
            res.status(500).json({ message: 'exist a problem with the interaction ', error });
        }
    }
    else res.status(500).send('interaction does not exist');
});

router.patch('/:uid_user/save', async (req, res) => {
    const { uid_user } = req.params;
    const { career } = req.body;

    if (uid_user) {
        try {
            var arbol = await Arbol.findOne({ uid_user }).lean();            
            var save_posts = [].concat(arbol.save_posts);
            var filterSave_posts = [];
            var newSave_posts = [];
            if(save_posts != ""){                                
                filterSave_posts = save_posts.filter( save_post => save_post.career === career);
                newSave_posts = save_posts.filter(save_post => save_post.career !== career);                                
                if(filterSave_posts != ""){            
                    newSave_posts.push({total: filterSave_posts[0].total+1, career});
                }else{                    
                    newSave_posts.push({total: 1, career});
                }            
            }else{                
                newSave_posts.push({total: 1, career});
            }
            const updateArbol = await Arbol.findOneAndUpdate({ uid_user }, { $set: { save_posts: newSave_posts } },{ new: true });
            res.status(200).json({ message: 'Update in the arbol',updateArbol});
        } catch (error) {
            res.status(500).json({ message: 'exist a problem with the interaction ', error });
        }
    }
    else res.status(500).send('interaction does not exist');
});

router.get('/:uid_user/comment', async (req, res) => {
    const { uid_user } = req.params;

    if (uid_user) {
        try {            
            const filter = { uid_user };
            var arbol = await Arbol.findOne(filter).lean();
            let comments = [].concat(arbol.comments);
            res.status(200).json(comments);
        } catch (error) {
            res.status(500).json({ message: 'exist a problem with the interaction ' });
        }
    }
    else res.status(500).send('interaction does not exist');
});

router.patch('/:uid_user/comment', async (req, res) => {
    const { uid_user } = req.params;
    const { career } = req.body;
    if (uid_user) {
        try {
            var arbol = await Arbol.findOne({ uid_user }).lean();            
            var comments = [].concat(arbol.comments);
            var filterComments = [];
            var newComments = [];
            if(comments != ""){                                
                filterComments = comments.filter( comment => comment.career === career);
                newComments = comments.filter(comment => comment.career !== career);                
                if(filterComments != ""){            
                    newComments.push({total: filterComments[0].total+1, career});
                }else{                    
                    newComments.push({total: 1, career});
                }            
            }else{                
                newComments.push({total: 1, career});
            }
            const updateArbol = await Arbol.findOneAndUpdate({ uid_user }, { $set: { comments: newComments } },{ new: true });
            res.status(200).json({ message: 'Update in the arbol',updateArbol});
        } catch (error) {
            res.status(500).json({ message: 'exist a problem with the interaction ', error });
        }
    }
    else res.status(500).send('interaction does not exist');
});

module.exports = router;