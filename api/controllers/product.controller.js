const { pick } = require("lodash");
const { productCollection } = require("../../config/mongodb");
const httpStatus = require("http-status");
const { ObjectId } = require("mongodb");

exports.get = async (req, res, next) => {
    try {
        const query = {
            _id: new ObjectId(req.params.id)
        }
        const product = await productCollection.findOne(query);
        if (product) {
          return res.json(product);
        }
      } catch (error) {
        return next(error);
      }
};
exports.add = async (req, res, next) => {
    try {
        const productData = pick(req.body, 'name', 'brandName', 'image', 'price', 'type', 'rating', 'description');
        const result = await productCollection.insertOne(productData);
        if (result.insertedId) {
          res.status(httpStatus.CREATED);
          return res.json({
            success: true
          });
        }
      } catch (error) {
        return next(error);
      }
};
