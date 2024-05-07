// 1)import express
const express = require('express')

// import usercontroller
const userController=require('../Controllers/userController')
//import projectcontroller
const projectController=require('../Controllers/ProjectController')
const jwtMiddleware = require('../middleware/jwtMiddleware')
// routing is created with the help of Routing() class present in express module

// import multer
const multer=require('../middleware/multerMiddleware')
const multerConfig = require('../middleware/multerMiddleware')
// 2)create an object for routing class
const router =new express.Router()

// 3)set the path
//path for register request
router.post('/user/register',userController.register)

//path to resolve login
router.post('/user/login',userController.login)

// path for resolve add project request
router.post('/add-project',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProject)

// path to get home project
router.get('/home-project',projectController.getHomeProject)

// path to get all project
router.get('/all-project',jwtMiddleware,projectController.getAllProject)

// path to get user project
router.get('/user/all-project',jwtMiddleware,projectController.getUserProject)

// path to delete project
router.delete('/user-project/delete/:id',jwtMiddleware,projectController.deleteUserProject)

// path to update the user project
router.put('/project/edit/:projectId',jwtMiddleware,multerConfig.single('projectImage'),projectController.editUserProject)

// path for profile update
router.put('/profile-update',jwtMiddleware,multerConfig.single('profile'),userController.profileUpdate)

//export router
module.exports=router


