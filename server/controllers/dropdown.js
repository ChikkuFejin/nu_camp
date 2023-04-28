const Category = require("../models/category");

exports.category=(async(req, res, next)=>{
    try {

        let data=await Category.findAll({
            where:{status:"active"},
            attributes:['slug',"title"]
        })
        return res.status(200).json({
            data,
            message:""
        })

    } catch (error) {
        return res.status(500).json({ message: 'Server Error',error:error.message });
    }
}
)