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
                    scheme[brand] = [
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
                    scheme[brand] = [
                        {
                            image: "/01.jpg",
                            theme: "#ffc17e",
                            heading: ["Just do", "it"],
                        },
                        {
                            image: "/02.jpg",
                            theme: "#ffc17e",
                            heading: ["Just do", "it"],
                        },
                        {
                            image: "/03.jpg",
                            theme: "#ffc17e",
                            heading: ["Just do", "it"],
                        },
                    ];
                    break;
                case "Gucci":
                    scheme[brand] = [
                        {
                            image: "/01.jpg",
                            theme: "#ffc17e",
                            heading: ["Just do", "it"],
                        },
                        {
                            image: "/02.jpg",
                            theme: "#ffc17e",
                            heading: ["Just do", "it"],
                        },
                        {
                            image: "/03.jpg",
                            theme: "#ffc17e",
                            heading: ["Just do", "it"],
                        },
                    ];
                    break;
                case "Zara":
                    scheme[brand] = [
                        {
                            image: "/01.jpg",
                            theme: "#ffc17e",
                            heading: ["Just do", "it"],
                        },
                        {
                            image: "/02.jpg",
                            theme: "#ffc17e",
                            heading: ["Just do", "it"],
                        },
                        {
                            image: "/03.jpg",
                            theme: "#ffc17e",
                            heading: ["Just do", "it"],
                        },
                    ];
                    break;
                case "H&M":
                    scheme[brand] = [
                        {
                            image: "/01.jpg",
                            theme: "#ffc17e",
                            heading: ["Just do", "it"],
                        },
                        {
                            image: "/02.jpg",
                            theme: "#ffc17e",
                            heading: ["Just do", "it"],
                        },
                        {
                            image: "/03.jpg",
                            theme: "#ffc17e",
                            heading: ["Just do", "it"],
                        },
                    ];
                    break;
                case "Levi's":
                    scheme[brand] = [
                        {
                            image: "/01.jpg",
                            theme: "#ffc17e",
                            heading: ["Just do", "it"],
                        },
                        {
                            image: "/02.jpg",
                            theme: "#ffc17e",
                            heading: ["Just do", "it"],
                        },
                        {
                            image: "/03.jpg",
                            theme: "#ffc17e",
                            heading: ["Just do", "it"],
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
