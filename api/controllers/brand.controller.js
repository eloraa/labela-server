const { omit, pick, each } = require("lodash");
const { brandCollection, productCollection } = require("../../config/mongodb");
const httpStatus = require("http-status");
const { brands } = require("../../config/vars");

exports.get = async (req, res, next) => {
    try {
        const scheme = {};
        each(brands, (brand) => {
            switch (brand) {
                case "Nike":
                    scheme[brand.toLowerCase()] = [
                        {
                            image: "/01.jpg",
                            theme: "#ffc17e",
                            heading: ["Just do", "it"],
                        },
                        {
                            image: "/02.jpg",
                            theme: "#7edaff",
                            heading: ["Believe in", "your desire"],
                        },
                        {
                            image: "/03.jpg",
                            theme: "#fff",
                            heading: ["Make it", "true"],
                        },
                    ];
                    break;

                case "Adidas":
                    scheme[brand.toLowerCase()] = [
                        {
                            image: "/01.jpg",
                            theme: "#fff",
                            heading: ["Impossible Is", "Nothing"],
                        },
                        {
                            image: "/02.jpg",
                            theme: "#cae7be",
                            heading: ["Live", "Forever"],
                        },
                        {
                            image: "/03.jpg",
                            theme: "#ffcb99",
                            heading: ["All things", "nice"],
                        },
                    ];
                    break;
                case "Gucci":
                    scheme[brand.toLowerCase()] = [
                        {
                            image: "/01.jpg",
                            theme: "#f4c6c6",
                            heading: ["House of", "Gucci"],
                        },
                        {
                            image: "/02.jpg",
                            theme: "#ffc17e",
                            heading: ["Hot summer", "deal"],
                        },
                        {
                            image: "/03.jpg",
                            theme: "#e8f6a7",
                            heading: ["Luxury is", "a choice"],
                        },
                    ];
                    break;
                case "Zara":
                    scheme[brand.toLowerCase()] = [
                        {
                            image: "/01.jpg",
                            theme: "#eeeeee",
                            heading: ["Love Your", "Curves"],
                        },
                        {
                            image: "/02.jpg",
                            theme: "#b5b8c4",
                            heading: ["Sweet as", "Spring"],
                        },
                        {
                            image: "/03.jpg",
                            theme: "#ffe6cc",
                            heading: ["Eastern Elegance", "Unveiled"],
                        },
                    ];
                    break;
                case "H&M":
                    scheme[brand.toLowerCase()] = [
                        {
                            image: "/01.jpg",
                            theme: "#f8f9b6",
                            heading: ["However you", "move"],
                        },
                        {
                            image: "/02.jpg",
                            theme: "#ffc17e",
                            heading: ["Style Redefined", "Here"],
                        },
                        {
                            image: "/03.jpg",
                            theme: "#ebe0ff",
                            heading: ["Blossom into", "Style"],
                        },
                    ];
                    break;
                case "Levi's":
                    scheme[brand.toLowerCase()] = [
                        {
                            image: "/01.jpg",
                            theme: "#ffc17e",
                            heading: ["Levi's: Forever", "Original"],
                        },
                        {
                            image: "/02.jpg",
                            theme: "#a6a299",
                            heading: ["Classic Comfort", "Unleashed"],
                        },
                        {
                            image: "/03.jpg",
                            theme: "#ddd8f6",
                            heading: ["Denim Legacy", "Lives"],
                        },
                    ];
                    break;

                default:
                    break;
            }
        });
        const brandData = { brands, scheme };
        const brand = await brandCollection.findOne(brandData);
        if (brand) {
            res.status(httpStatus.OK);
            return res.json(omit(brand, "_id"));
        }

        const result = await brandCollection.insertOne(brandData);
        if (result.insertedId) {
            res.status(httpStatus.CREATED);
            return res.json(brandData);
        }
    } catch (error) {
        next(error);
    }
};

exports.list = async (req, res, next) => {
    try {
        const brand = pick(req.params, "brand");
        const products = await productCollection.find(brand).toArray();

        console.log(products);
        res.json(products);
    } catch (error) {
        next(error);
    }
};
