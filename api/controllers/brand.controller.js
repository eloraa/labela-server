const { omit, pick } = require("lodash");
const { brandCollection, productCollection } = require("../../config/mongodb");
const httpStatus = require("http-status");
const { brands } = require("../../config/vars");
const { log } = require("winston");

exports.get = async (req, res, next) => {
    try {
        const brandData = { brands };
        const brand = await brandCollection.findOne(brandData);
        if (brand) {
            res.status(httpStatus.OK);
            return res.json(omit(brand, "_id"));
        }

        const result = await brandCollection.insertOne(brandData);
        if (result.insertedId) {
            res.status(httpStatus.CREATED);
            return res.json({
                brands: brandData.brands,
            });
        }
    } catch (error) {
        next(error);
    }
};

exports.list = async (req, res, next) => {
    try {
        const brand = pick(req.params, 'brand')
        const products = await productCollection.find(brand).toArray();

        console.log(products);
        res.json(products);
    } catch (error) {
        next(error);
    }
};
