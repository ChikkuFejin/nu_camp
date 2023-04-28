const Category = require("../models/category");





exports.fetchALl=(async(req, res, next)=>{
    try {

        let data=await Category.getCategoryTree()
        return res.status(200).json({
            data,
            message:""
        })

    } catch (error) {
        return res.status(500).json({ message: 'Server Error',error:error.message });
    }
}
)


exports.fetchOne=(async(req, res, next)=>{
    try {
        let id=req.params.id
        let data=await Category.findOne({where:{slug:id}})
        return res.status(200).json({
            data,
            message:""
        })

    } catch (error) {
        return res.status(500).json({ message: 'Server Error',error:error.message });
    }
}
)
exports.create=(async(req, res, next)=>{
    try {

   


    } catch (error) {
        return res.status(500).json({ message: 'Server Error',error:error.message });
    }
})
exports.update=(async(req, res, next)=>{
    try {



    } catch (error) {
        return res.status(500).json({ message: 'Server Error',error:error.message });
    }
}
)
exports.delete=(async(req, res, next)=>{
    try {



    } catch (error) {
        return res.status(500).json({ message: 'Server Error',error:error.message });
    }
}
)