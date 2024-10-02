exports = function(payload, response) {
  const {m} = payload.query;
  const {d} = payload.query;
  console.log("m=", m);
  var collection = context.services.get("mongodb-atlas").db("PortalePdS").collection("Piani");
  const query = { "matricola": m };
  // Set some fields in that document
  const update = {
    "$set": {
      "approvato": true,
      "dataapprovazione": d
    }
  };
  // Return the updated document instead of the original document
  const options = { returnNewDocument: true };
  return collection.findOneAndUpdate(query, update, options)
    .then(updatedDocument => {
      if(updatedDocument) {
        console.log(`Successfully updated document: ${updatedDocument}.`)
      } else {
        console.log("No document matches the provided query.")
      }
      return updatedDocument
    })
    .catch(err => console.error(`Failed to find and update document: ${err}`))
};