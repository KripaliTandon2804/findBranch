const dbBranch = require('../models/branch');
const branch = require('../schemas/branchSchema');

module.exports = async (req, res, next) => {
    try{
        if(!req.params.distance || !req.body.long || !req.body.lat){
            res.status(400).json({
                success:false,
                status: 400,
                message: "Please provide all the details"
            })
        }else{
            let limit = 2;
            let skip = 2;

            const nearest = await dbBranch.aggregate([
                {
                    $geoNear: {
                        near: {
                            type: "Point",
                            coordinates: [parseFloat(req.body.long), parseFloat(req.body.lat)]
                        },
                        distanceField: 'dist.calculated',
                        spherical: true,
                    }
                },{$sort: {'dist.calculated': 1}},
                {$skip: skip}, {$limit: limit}              
            ])

            if(!nearest){
                return res.status(400).json({
                    success:false,
                    status:400,
                    message: "No data found"
                })
            }
            
            return res.status(200).json({
                success:true,
                message: "Nearest locations",
                data: nearest
            })
        }
    }catch(err){
        next(err)
    }
    
}