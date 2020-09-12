const dbBranch = require('../models/branch')

module.exports = async(req, res, next) => {
    try{
        const maxIncome = await dbBranch.aggregate([
            {$group: {
                    _id: "$city",
                    maxIncome: {$max: "$income"}
                }
            },
            {$sort: {'maxIncome': -1}}
        ])
        
        if(!maxIncome){
            return res.status(400).json({
                success:false,
                status: 400,
                message: "No data found"
            })
        }

        return res.status(200).json({
            success:true,
            status: 200,
            message:"Maximum income citywise",
            data: maxIncome
        })

    }catch(err){
        next(err)
    }   
}