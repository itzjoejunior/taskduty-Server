const TASKS = require("../model/taskMode");

// post ftn, C -- for create CRUD Operations

const createTask = async (req, res) => {
  const { title, description, tags } = req.body;
 req.body.createdBy = req.user.userId; 

  if (!title || !description || !tags) {
    res.status(400).json({ success: false, message: "Please fill all field" });
    return;
  }

  try {
    await TASKS.create(req.body);
    res
      .status(201)
      .json({ success: true, message: "Task created Successfully!" });
  } catch (error) {
    res.status(500).json(error);
  }
};

// get ftn, R -- for read in CRUD Operations

const getAllTasksByUser = async(req,res)=>{
   const {userId} = req.user
   try{
    const  tasks=await TASKS.find({createdBy : userId}).
    populate("createdBy");
    res.status(200).json({success :true, message: "users task", tasks})

     } catch (error){
     res.status(500).json(error)
    }

   }


   // Params ftn for getting a single task created by a user


   const singleTask = async (req,res)=> {
    const {taskId} = req.params;
    const {userId} = req.user;

    try {
      const task = await TASKS.findOne({
        _id: taskId,
        createdBy: userId
      }).populate("createdBy");
      res.status(200).json({ success: true, task});
    } catch (error) {
      res.status(500).json(error)
      
    }

   }


   // delete ftn, D -- for delete in CRUD Operation


   const deleteTask = async (req,res)=>{
    const {taskId}=req.params;
    const {userId}=req.user;

    try {
     await TASKS.findOneAndDelete({_id:taskId, 
      createdBy: userId});
      res.status(200).json({success:true, massage: "Deleted Successfully!"})
    } catch (error) {
      res.status(500).json(error)
    }
   }

   // update FontFace, U -- for  Update in CRUD operation

   const updateTask = async(req,res)=>{
    const {taskId}=req.params;
    const {userId}=req.user;

    try {
      const task = await TASKS.findOneAndUpdate
      ({_id:taskId , createdBy:userId}, req.body,{new:true,
        runValidators:true}).populate('createdBy');
        res.status(200).json({success:true, task,
        message:"Updated successfully"})
    } catch (error) {
      res.status(500).json(error)
    }

   }



module.exports = {
    createTask,
    getAllTasksByUser,
    singleTask,
    deleteTask,
    updateTask
}
