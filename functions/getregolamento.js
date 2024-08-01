exports = function(payload, response) {
    const {a} = payload.query;
    console.log("a=", a);
    var collection = 
      context.services.get("mongodb-atlas").db("PortalePdS").collection("Regolamenti");
    /*var t = collection.findOne({anno: a}).then(
      doc => doc.temperatura.toString() 
    );
    return t;*/
  return collection.findOne({anno: a})
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