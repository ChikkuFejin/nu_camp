


const Config = require('../util/config:js');
const Product = require('../models/product');
const { Op } = require('sequelize');
const Category = require('../models/category');

exports.filterproduct = async(req, res, next) => {

        try {
            const {type="query",limit=10}=req.body;
            const query={
                is_features: ()=>Product.findAll({where:{is_featured:1},limit}),
                is_best_seller:()=>Product.filterBestSellerProducts(limit),
                query:()=>Product.filterproductasync(req?.body?.query||{})
            }


            const products = await query[type]()
            return res.status(200).json({
                data:products||[],
                message:"",
                total:products?.length||0
            })

         
        } catch (err) {
          console.error(err);
          return res.status(500).json({ message: 'Server Error',error:err.message });
        }

      
}

exports.getOneBySlug = async(req, res, next) => {

    try {
        const slgId=req.params.id
        const data = await Product.findOne({
            where:{slug:slgId},
            include: {
              model: Category,
              attributes: ['id', 'title','slug'],
              include: {
                model: Product,
                include:[{
                    model:Category
                }],
                // attributes: ['id', 'title'],
                limit:4
              }
            }
          });

          return res.status(200).json({
            data,
            message:""
        })
     
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server Error',error:err.message });
    }

  
}


  
  // Get all products
  exports.getProducts = async (req, res) => {

    
    try {
      const { price, category,limit=10,is_featured } = req.query;

      const query={
        is_features: ()=>Product.findAll({where:{is_featured:1},limit}),
        is_best_seller:()=>filterBestSellerProducts(limit)
    }

  
      // Build the options object for Sequelize query
      const options = {};
      if (price) {
        const priceRange = price.split('-');
        options.price = {
          [Op.between]: [priceRange[0], priceRange[1]],
        };
      }
      if (category) {
        const categorySlug = category.split('-').join(' ');
        const categoryRecord = await Category.findOne({
          where: { slug: categorySlug },
        });
        if (categoryRecord) {
          options.cat_id = categoryRecord.id;
        }
      }
  
      // Get the products with the options object
      const products = await Product.findAll({ where: options });
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Get best seller products


  
  
  


  