const { productCollection, cartCollection } = require("../../config/mongodb");
const httpStatus = require("http-status");
const { ObjectId } = require("mongodb");


exports.list = async (req, res, next) => {
    try {
        const query = { uid: req.params.uid }
        const carts = await cartCollection.find(query).toArray();
        return res.json(carts);
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
        const result = await cartCollection.updateOne(query, { $set: { quantity: parseInt(req.body.quantity) } })

        console.log(result,query);

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

