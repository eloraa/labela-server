const { pick, omit } = require("lodash");
const { db } = require("../../config/mongodb");
const httpStatus = require("http-status");
const APIError = require("../errors/api-error");

const brandCollection = db.collection("brands");
exports.get = async (req, res, next) => {
    try {
        const brandsArray = { brands: ["Nike", "Adidas", "Gucci", "Zara", "H&M", "Levi's"] };

        const brands = await brandCollection.findOne(brandsArray);
        if (brands) {
            res.status(httpStatus.OK);
            return res.json(omit(brands, '_id'));
        }


        const result = await brandCollection.insertOne(brandsArray)
        if (result.insertedId) {
            res.status(httpStatus.CREATED);
            return res.json({
                brands: brandsArray.brands
            });
        }
    } catch (error) {
        next(error);
    }
};
