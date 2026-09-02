

// this is the custome error handler 


const errorhandler=async function(err,req,res,next){
const status=err.status ||500;
const message=err.message || "Internal Server Error";
res.status(status).json({message})

}

export default errorhandler;
