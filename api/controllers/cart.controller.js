const { productCollection, cartCollection } = require("../../config/mongodb");
const httpStatus = require("http-status");
const { map, zip } = require("lodash");
const { ObjectId } = require("mongodb");


exports.list = async (req, res, next) => {
    try {
        const carts = await cartCollection.find({ uid: req.params.uid }).toArray();
        const filter = map(carts, 'productId')
        const query = { _id: { $in: filter } };
        const products = await productCollection.find(query).toArray()
        return res.json(zip(products, carts));
      } catch (error) {
        return next(error);
      }
};
exports.add = async (req, res, next) => {
    try {
        const query = {
            productId: new ObjectId(req.body.productId),
            uid: req.params.uid
        }
        let result;
        if(req.body.method === 'inc') {
            result = await cartCollection.updateOne(query, { $inc: { quantity: parseInt(req.body.quantity) } })
        }
        else {
            result = await cartCollection.updateOne(query, { $set: { quantity: parseInt(req.body.quantity) } })
        }


        if(result.matchedCount) {
            res.status(httpStatus.CREATED);
            return res.json({
              success: true
            });
        } else {
            const product = await productCollection.findOne({ _id: new ObjectId(req.body.productId) });
            if(product) {
                const cartData = {
                    uid: req.params.uid,
                    productId: product._id,
                    name: product.name,
                    price: product.price,
                    quantity: req.body.quantity
                }
                const result = await cartCollection.insertOne(cartData)
                if (result.insertedId) {
                    res.status(httpStatus.CREATED);
                    return res.json({
                      success: true
                    });
                }
            } else {
                res.status(httpStatus.BAD_REQUEST);
                return res.json({
                    success: false
                });
            }

        }

      } catch (error) {
        return next(error);
      }
}

