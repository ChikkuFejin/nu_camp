
const {DataTypes, Op} = require('sequelize');
const db = require('../util/database');

const Category = require("./category");

  // Define the `Product` model
  const Product = db.define('products', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    size: {
      type: DataTypes.STRING(191),
      allowNull: true,
      defaultValue: 'M'
    },
    condition: {
      type: DataTypes.ENUM('default', 'new', 'hot'),
      allowNull: false,
      defaultValue: 'default'
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      allowNull: false,
      defaultValue: 'inactive'
    },
    price: {
      type: DataTypes.DOUBLE(8,2),
      allowNull: false
    },
    discount: {
      type: DataTypes.DOUBLE(8,2),
      allowNull: false
    },
    is_featured: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    cat_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
    },
    child_cat_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
    },
    brand_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    tableName: 'products',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
  );

  Product.belongsTo(Category, { foreignKey: 'cat_id' });
  Category.hasMany(Product, { foreignKey: 'cat_id' });
//   Product.belongsTo(Category, { foreignKey: 'cat_id' });

Product.filterproductasync= (req) =>new Promise(async(resolve,reject)=>{

    try {
        const {min_price:priceFrom,max_price:priceTo,category_slug:category,is_featured}=req;
        // const { category, priceFrom, priceTo } = req.query;
        let where = {
            status:"active"
        };
        let include=[{
            model: Category,
        }]

        // Filter by category slug
        if (category) {
        const cat = await Category.findOne({ where: { slug: category } });
        if (cat) {
            where.cat_id = cat.id;
        }
        }

        // Filter by price range
        if (priceFrom && priceTo) {
        where.price = { [Op.between]: [priceFrom, priceTo] };
        } else if (priceFrom) {
        where.price = { [Op.gte]: priceFrom };
        } else if (priceTo) {
        where.price = { [Op.lte]: priceTo };
        }

        const products = await Product.findAll({ where ,include,order: [['created_at', 'DESC']]});
        return resolve(products)
     
    } catch (err) {
      console.error(err);
      return reject(err)
    //   return {
    //     status:false,
    //     data:[],
    //     error:err
    // }
    }

  
}) 


Product.filterBestSellerProducts=(limit)=> new Promise(async(resolve,reject)=>{
    try {
        const bestSellerProducts = await Product.findAll({
            attributes: {
              include: [
                [
                  db.literal('(SELECT  sum(quantity)  FROM `carts` WHERE `product_id` = `products`.`id` and order_id IS NOT NULL)'),
                  'order_count'
                ]
              ]
            },
            order: db.literal('order_count DESC'),
            limit,
            include: [
              { 
                model: Category, 
              //   where: { 
              //     slug: { [Op.eq]: categorySlug } 
              //   },
              //   required: false
              }
            ]
          });
        
          return resolve(bestSellerProducts);
    } catch (error) {
            return reject(error);
    }   
  
  })


  
  module.exports = Product;

 

//   exports.getProducts = async (req, res) => {

    
//     try {
//       const { price, category,limit=10,is_featured } = req.query;



  
//       // Build the options object for Sequelize query
//       const options = {};
//       if (price) {
//         const priceRange = price.split('-');
//         options.price = {
//           [Op.between]: [priceRange[0], priceRange[1]],
//         };
//       }
//       if (category) {
//         const categorySlug = category.split('-').join(' ');
//         const categoryRecord = await Category.findOne({
//           where: { slug: categorySlug },
//         });
//         if (categoryRecord) {
//           options.cat_id = categoryRecord.id;
//         }
//       }
  
//       // Get the products with the options object
//       const products = await Product.findAll({ where: options });
//       res.status(200).json(products);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   };


  