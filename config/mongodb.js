const logger = require("./logger");
const { mongo } = require("./vars");
const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(mongo.uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});



/**
 * Connect to mongo db
 */
exports.connect = () => {
    client
        .connect()
        .then(() =>client.db("admin").command({ ping: 1 }))
        .then(() => console.log("mongoDB connected..."))

    return client;
};

/**
* returns client
*/
exports.client =  client;
exports.db =  client.db('labela');
