

const ROOMCATEGORIES=require('../models/roomCategories')

const roomCategoriesController = {

async getAllByPage(req,res,next){

    try {
        const page = parseInt(req.query.page) || 1; // extract the page number from the request query, default to 1 if not provided
          const limit = parseInt(req.query.limit) || 10; // extract the page size from the request query, default to 10 if not provided
          const offset = (page - 1) * limit; // calculate the offset based on the page number and page size
          const { count, rows } = await ROOMCATEGORIES.findAndCountAll({ offset, limit }); // find and count all data based on the pagination parameters
    
          const totalPages = Math.ceil(count / limit); // calculate the total number of pages based on the total count and page size
          const nextPage = page < totalPages ? page + 1 : null; // calculate the next page number, null if it exceeds the total number of pages
          const prevPage = page > 1 ? page - 1 : null; // calculate the previous page number, null if it's the first page
    
          res.status(200).json({
            count,
            totalPages,
            nextPage,
            prevPage,
            data: rows, // send the data as a JSON response
          });
    
        } catch (error) {
            return res.status(500).json({ message: 'Server Error',error:error.message });
        }
    
},


async getAll(req, res, next) {
    // Your getAll code here
    try {
        // Add readAll logic here
        const data = await ROOMCATEGORIES.findAll();
        res.status(200).json({ message: 'Read all successfully', data: data });
      } catch (error) {
        console.error(error);
        next(error); // pass any errors to the error handling middleware
        // res.status(500).json({ message: 'Error reading all', error: error });
      }
  },

  async getById(req, res, next) {
    // Your getById code here
    try {
        // Add readById logic here
        const data = await ROOMCATEGORIES.findByPk(req.params.id);
        if (!data) {
          res.status(404).json({ message: 'Data not found' });
        } else {
          res.status(200).json({ message: 'Read by ID successfully', data: data });
        }
      } catch (error) {
        console.error(error);
        next(error); // pass any errors to the error handling middleware
        // res.status(500).json({ message: 'Error reading by ID', error: error });
      }
  },

  async create(req, res, next) {
    // Your create code here
    try {
        // Add create logic here
        const data = await ROOMCATEGORIES.create(req.body);
        res.status(201).json({ message: 'Created successfully', data: data });
      } catch (error) {
        console.error(error);
        next(error); // pass any errors to the error handling middleware
        // res.status(500).json({ message: 'Error creating', error: error });
      }
  },

  async update(req, res, next) {
    // Your update code here
    try {
        // Add update logic here
        const data = await ROOMCATEGORIES.update(req.body, { where: { id: req.params.id } });
        if (data[0] === 0) {
          res.status(404).json({ message: 'Data not found' });
        } else {
          res.status(200).json({ message: 'Updated successfully' });
        }
      } catch (error) {
        console.error(error);
        next(error); // pass any errors to the error handling middleware
        // res.status(500).json({ message: 'Error updating', error: error });
      }
  },

  async delete(req, res, next) {
    // Your delete code here
    try {
        // Add delete logic here
        const data = await ROOMCATEGORIES.destroy({ where: { id: req.params.id } });
        if (data === 0) {
          res.status(404).json({ message: 'Data not found' });
        } else {
          res.status(200).json({ message: 'Deleted successfully' });
        }
      } catch (error) {
        console.error(error);
        next(error); // pass any errors to the error handling middleware
        // res.status(500).json({ message: 'Error deleting', error: error });
      }
  },
};

module.exports = roomCategoriesController;
  