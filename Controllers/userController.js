

const users =require("../modal/userSchema")

//import jwt  library
const jwt=require('jsonwebtoken')

//logic for user registration
exports.register=async(req,res)=>{
       console.log(req.body);
       const {username,email,password} = req.body

 try{   const existinguser=await users.findOne({mailId:email})

      if(existinguser){
            res.status(404).json('User already found ')
      }else{
            const newUser= new users({
                  username,
                  mailId:email,
                  password,
                  profile:"",
                  github:"",
                  linkedin:""
            })

            //store the particular data in mongodb

            await newUser.save()
            res.status(200).json(newUser)
      }
}catch(err){
      res.status(401).json('Registration process failed due to',err)
}
       
}

// logic to login
exports.login =async(req,res)=>{
      
console.log('inside login function');
      const {email,password}=req.body

try{  const existinguser = await users.findOne({mailId:email,password})

 if(existinguser){

      // token generate - sign('data','secretekey')
 const token=jwt.sign({userId:existinguser._id},"superkey")

      res.status(200).json({existinguser,token})
  }else{
      res.status(401).json('Incorrect emailid or password')
  }
}catch(err){
      res.status(401).json('Login request failed due to',err)
}
}

// logic to profile update
exports.profileUpdate=async(req,res)=>{
      const userId=req.payload
      const {username,mailId,password,github,linkedin,profile}=req.body

      const uploadeImage=req.file?req.file.filename:profile

      try {

            const userProfile=await users.findByIdAndUpdate({_id:userId},{
                  username,
                  mailId,
                  password,
                  profile:uploadeImage,
                  github,
                  linkedin   
            },{new:true})

            await userProfile.save()
            res.status(200).json(userProfile)

            
      } catch (error) {
            res.status(401).json('upload request failed due to',err)

      }
}
