const express = require( 'express' );
const { createTask, getAllTasksByUser, singleTask, deleteTask, updateTask } = require('../controllers/taskControllers');
const router = express.Router();
const auth = require('../middleware/auth')


// Post request

router.post('/task',auth,createTask);

// Get request ---- for getting user task

router.get("/task/:userId",auth,getAllTasksByUser);

// params for single task

router.get("/singletask/:taskId",auth,singleTask)

 // delete request, D -- 

 router.delete('/deletetask/:taskId',auth,deleteTask)

 // update FontFace, U -- for  Update in CRUD operation

 router.patch('/updatetask/:taskId',auth,updateTask)

module.exports = router;
