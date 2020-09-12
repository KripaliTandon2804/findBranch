const registerSchema = require('../schemas/registerSchema');

const dbRegister = require('../models/register')

module.exports = async(req, res, next) => {
    try{
        const result = registerSchema.validate(req.body, dbRegister);
        
        if(result.error){
            return res.status(400).json({
                "success": false,
                "status" : 400,
                "message":result.error.details[0].message
            })
        }else if (!req.body.userName || !req.body.email || !req.body.password){
            return res.status(400).json({
                success: false,
                status: 400,
                message: "Please provide all the details"})
        }else{
            let existingUser = await dbRegister.findOne({ $or: [{ email: req.body.email }, { userName: req.body.userName }] });
            if(!existingUser || existingUser == null){
                let savedData = await new dbRegister({
                    userName: req.body.userName,
                    email: req.body.email,
                    password:req.body.password
                }).save()
                return res.status(200).json({
                    success:true,
                    status:200,
                    message: "User registered successfully" })
            }
            
            return res.status(400).json({
                    success:false,
                    status: 400,
                    message: "User already exists."
            })
        }
    }catch(err){
        next(err)
    }
}
