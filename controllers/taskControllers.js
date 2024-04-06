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







module.exports = {
    createTask,
    getAllTasksByUser
};
