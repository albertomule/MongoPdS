exports = (payload, response) => {
    var collection = context.services.get("mongodb-atlas").db("PortalePdS").collection("Regolamenti");
    var t = collection.find();
    return t;
};
