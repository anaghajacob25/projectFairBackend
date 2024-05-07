// import multer
const multer=require('multer')

// create storage space 
const storage=multer.diskStorage({
    destination: (req,file,callback)=>{
         callback(null,'./uploads') //the location where the upload file should be locally stored
    },
    filename:(req,file,callback)=>{
        //Date.now() - return file in milliseconds
     filename=`image -${Date.now()}-${file.originalname}`
     callback(null,filename)
    }
})

// filefilter

const fileFilter=(req,file,callback)=>{
    if(file.mimetype==='image/png'||file.mimetype==='image/jpeg'||file.mimetype==='image/jpg'){
        callback(null,true)
    }else{
        callback(null,false)
        return callback(new Error('Only png,jpeg,jpg are allowed'))
    }
   
}

// create multer configuration

const multerConfig=multer({
    storage,
    fileFilter
})

module.exports=multerConfig
