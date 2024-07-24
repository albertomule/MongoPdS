exports = (payload, response) => {
    var collection = context.services.get("mongodb-atlas").db("PortalePdS").collection("Esami");
    var t = collection.find();
    return t;
};