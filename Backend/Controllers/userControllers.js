import { User } from "../Models/userModel.js";
import bcrypt from 'bcrypt';
import TryCatch from "../utils/TryCatch.js";
import genrateToken from "../utils/generateToken.js";

export const registerUser = async(req, res) => {
    try{
        //  res.send("Register Api");
        const { name, email, password } = req.body;

         let user = await User.findOne({email});
         

        if(user){
            return res.status(400).json({
                 message: "Already have an account with this email",
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        user = await User.create({
            name,
            email,
            password: hashPassword,
          });

          genrateToken(user._id, res);

        res.status(201).json({
            user,
            message: "user registerd",
       })

    }catch(error){
        res.status(500).json({
            message: error.message,
        })
    }
};


export const loginUser = TryCatch (async(req, res) => {
   
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(404).json({
                message: "fill all the requirment fields"
            })
        }

        const user = await User.findOne({email});
         

        if(!user){
            return res.status(400).json({
                 message: "user not exist please go for registration",
            })
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if(!comparePassword){
            return res.status(400).json({
                 message: "wrong password",
            })
        }

        genrateToken(user._id, res);

        res.json({
          user,
          message: "Logged in",
        });
});

export const myProfile = TryCatch(async (req, res) => {
    const user = await User.findById(req.user._id);
    res.json(user);
  });

export const userProfile = TryCatch(async(req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    res.json(user);
});


export const followAndUnfollowUser = TryCatch(async (req, res) => {
    const user = await User.findById(req.params.id);
    const loggedInUser = await User.findById(req.user._id);
  
    if (!user)
      return res.status(400).json({
        message: "No user with this id",
      });
  
    if (user._id.toString() === loggedInUser._id.toString())
      return res.status(400).json({
        message: "you can't follow yourself",
      });
  
    if (user.followers.includes(loggedInUser._id)) {
      const indexFollowing = loggedInUser.following.indexOf(user._id);
      const indexFollowers = user.followers.indexOf(loggedInUser._id);
  
      loggedInUser.following.splice(indexFollowing, 1);
      user.followers.splice(indexFollowers, 1);
  
      await loggedInUser.save();
      await user.save();
  
      res.json({
        message: "User Unfollowed",
      });
    } else {
      loggedInUser.following.push(user._id);
      user.followers.push(loggedInUser._id);
  
      await loggedInUser.save();
      await user.save();
  
      res.json({
        message: "User followed",
      });
    }
  });


  export const logOutUser = TryCatch(async (req, res) => {
    // res.cookie("token", "", { maxAge: 0 });
    res.cookie("token", "", {  maxAge: 9000, httpOnly: true });
  
    res.json({
      message: "Logged Out Successfully",
    });
  });

  
