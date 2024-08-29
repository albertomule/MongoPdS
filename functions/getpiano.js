exports = function(payload, response) {
    const {m} = payload.query;
    console.log("m=", m);
    var collection = context.services.get("mongodb-atlas").db("PortalePdS").collection("Piani");
  return collection.findOne({matricola: m})
  .then(result => {
    if(result) {
      console.log(`Successfully found document: ${result}.`);
    } else {
      console.log("No document matches the provided query.");
    }
    return result;
  })
  .catch(err => console.error(`Failed to find document: ${err}`));
};