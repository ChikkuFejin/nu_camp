const { Op } = require("sequelize");
const Cart = require("../models/cart");
const Product = require("../models/product");
const Category = require("../models/category");

const Validation=require('../Utlity/Validations/cart.validation.js')


exports.fetchALlByUser=(async(req, res, next)=>{
    try {
        let userId=req.user.id

        let data=await Cart.findAll({
            where:{user_id:userId,
                    order_id:{[Op.eq]:null}
            },
            include:[
                {
                    model:Product,
                    include:{
                        model:Category
                    }
                }
            ]
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
exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    //validation
    const { error, value } = Validation.add.validate(req.body, { abortEarly: false });

    if (error) {
      // If there are validation errors, return a 400 Bad Request response with the validation errors
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map((error) => error.message)
      });
    }
  
    try {
      // Find the product in the database
      const product = await Product.findOne({
        where: { id: productId },
      });

     
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found',message: 'Product not found' });
      }
       //check already haveProductIn cart
       const checkCart=await Cart.findOne({
        where:{
            product_id:product.id,
            user_id:req.user.id,
            order_id:null
        },
        include:{
            model:Product
        }
      })

      let cartItem ;
      if(checkCart){
        cartItem=checkCart;
        cartItem.quantity=parseInt(cartItem?.quantity||0)+ parseInt(quantity||0);
        cartItem.amount = product.price * cartItem.quantity;
        cartItem.save();

      }else{
         cartItem = await Cart.create({
            product_id: productId,
            user_id: req.user.id, // assuming you have implemented authentication middleware to set req.user
            price: product.price,
            quantity,
            amount: product.price * quantity,
          });
      }

      // Create a new cart item and associate it with the current user
    
  
      return res.json({ message: `Product ${checkCart?"update":"added"} to cart successfully`, data:cartItem });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  

  exports.updateCart = async (req, res) => {
    const { cartItemId } = req.params;
    const { quantity } = req.body;
  
    try {
      // Find the cart item in the database
      const cartItem = await Cart.findOne({
        where: { id: cartItemId, user_id: req.user.id }, // assuming you have implemented authentication middleware to set req.user
        include: { model: Product, as: 'product' },
      });
  
      if (!cartItem) {
        return res.status(404).json({ error: 'Cart item not found' });
      }
  
      // Update the cart item with the new quantity
      cartItem.quantity = quantity;
      cartItem.amount = cartItem.product.price * quantity;
      await cartItem.save();
  
      return res.json({ message: 'Cart item updated successfully', data:cartItem });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  exports.removeFromCart = async (req, res) => {
    const { cartItemId } = req.params;
  
    try {
      // Find the cart item in the database
      const cartItem = await Cart.findOne({
        where: { id: cartItemId, user_id: req.user.id }, // assuming you have implemented authentication middleware to set req.user
        include: { model: Product, as: 'product' },
      });
  
      if (!cartItem) {
        return res.status(404).json({ error: 'Cart item not found' });
      }
  
      // Delete the cart item
      await cartItem.destroy();
  
      return res.json({ message: 'Cart item removed successfully', data:cartItem });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  

