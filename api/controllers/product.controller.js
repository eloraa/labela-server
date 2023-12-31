const { pick } = require("lodash");
const { productCollection } = require("../../config/mongodb");
const httpStatus = require("http-status");
const { ObjectId } = require("mongodb");
const APIError = require("../errors/api-error");
const { json } = require("body-parser");

exports.list = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const producsPerPage = 12;

        const total = await productCollection.countDocuments();
        const totalPages = Math.ceil(total / producsPerPage);

        const products = await productCollection.find().skip((page - 1) * producsPerPage).limit(producsPerPage).toArray();
        res.json({ products, totalPages, currentPage: page, total });
    } catch (error) {
        next(error);
    }
};

exports.get = async (req, res, next) => {
    try {
        const query = {
            _id: new ObjectId(req.params.id)
        }
        const product = await productCollection.findOne(query);
        if (product) {
          return res.json(product);
        } else {
            return res,json({})
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
        } else {
          return res.json({
            success: false
          });
        }
      } catch (error) {
        return next(error);
      }
};
exports.update = async (req, res, next) => {
    try {
        const query = {
            _id: new ObjectId(req.params.id)
        }
        const productData = pick(req.body, 'name', 'brandName', 'image', 'price', 'type', 'rating', 'description');
        const result = await productCollection.updateOne(query, { $set: productData });
        if (result.modifiedCount) {
          return res.json({
            success: true
          });
        }
        else {
            const error = new APIError({
                message: "Nothing to update",
                status: httpStatus.BAD_REQUEST,
                isPublic: true,
            });
            return next(error)
        }
      } catch (error) {
        return next(error);
      }
};

exports.latest = async (req, res, next) => {
    try {
        const products = await productCollection.find().sort({ _id: -1 }).limit(8).toArray();
        res.json(products);
    } catch (error) {
        next(error);
    }
};
