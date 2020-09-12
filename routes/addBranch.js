const branchSchema = require('../schemas/branchSchema')
const dbBranch = require('../models/branch')

function generateBranchId () {
    return 'ACT' + Math.random().toString(36).substring(2,5)     
}

module.exports = async (req, res, next) => {
    try{
        const result = branchSchema.validate(req.body, dbBranch)
        if(result.error){
            return res.status(400).json({
                "success": false,
                "status": 400,
                "message": result.error.details[0].message
            })
        }
        if(!req.body.branchName || !req.body.income || !req.body.city || !req.body.branchAddress || !req.body.long  || !req.body.lat){
            return res.status(400).json({
            "success": false,
            "status": 400,
            "message": "Please provide all the details"})
        }else{
            const branchData = await new dbBranch({
                branchId: await generateBranchId(),
                branchName: req.body.branchName,
                income: req.body.income,
                city: req.body.city,
                branchAddress: req.body.branchAddress,
                branchLocation: {
                    coordinates: [req.body.long, req.body.lat]
                }
            }).save()

            return res.status(200).json({
                success:true,
                status:200,
                message:"Branch added successfully"
            })
        }

    }catch(err){
        next(err)
    }
}
