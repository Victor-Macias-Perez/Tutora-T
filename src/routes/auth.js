const { Router } = require('express');

const router = Router();

var User = require('../models/user');

router.post('/LogIn', async (req, res) => {    
  try {    
      const { email, password } = req.body;                     
      var result = await User.findOne({ email, password }).lean();
      if(result != "")
          return res.status(200).json(result);
      return res.status(500).json({error: "email or password incorrect"});
  } catch (error) {
      return res.status(500).json("error" + error);
  }
});

router.put("/password-reset", async (req, res) => {
    const { email, password } = req.body;  
    console.log(email);
    console.log(password);
    try{         
        var oldUser = await User.findOne({
            email
        }).lean();
        if(oldUser){
            let update_user = {};
            update_user.password = password;
            const { _id } = oldUser;
            const filter = { _id };
            const updatedUser = await User.findOneAndUpdate(filter, update_user, {
                new: true
            });
            res.status(200).json(updatedUser);
        }else{            
            res.status(500).json("User not Found");
        }        
    }catch(err){
        res.status(500).json(err);
    }    
});

router.put("/verify-email", async (req, res) => {
    
    try{
        const { uid_user, verification } = req.body;   
        var oldUser = await User.findById((uid_user)).lean()

        if(oldUser){
            let update_user = {};
            update_user.verify = verification;
            const { _id } = oldUser;
            const filter = { _id };
            const updatedUser = await User.findOneAndUpdate(filter, update_user, {
                new: true
            });
            res.status(200).json(updatedUser);
        }else{            
            res.status(500).json("User not Found");
        }        
    }catch(err){
        res.status(500).json({ "error": err});
    }    
});

// // @desc    Auth with Google
// // @route   GET /auth/google
// router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// // @desc    Google auth callback
// // @route   GET /auth/google/callback
// router.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: "/" }),
//   (req, res) => {
    
//     //mandar datos via JSON
    
//   }
// );

// // @desc    Logout user
// // @route   GET /auth/logout
// router.get("/logout", (req, res) => {
//   req.logout(function(err) {
//     if (!err) { 
//       res.redirect('/');      
//     }else{
//       return console.log(err); 
//     }    
//   });
// });

module.exports = router;

