const express = require( 'express' );
const { createTask, getAllTasksByUser } = require('../controllers/taskControllers');
const router = express.Router();
const auth = require('../middleware/auth')


// Post request

router.post('/task',auth,createTask);

// Get request ---- for getting user task

router.get("/task/:userId",auth,getAllTasksByUser);


module.exports = router;
