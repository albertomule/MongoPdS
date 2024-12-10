exports = async function(payload, response) {
  const {m} = payload.query;
  var collection = context.services.get("mongodb-atlas").db("PortalePdS").collection("Piani");
  var query = {"matricola": m}
  return collection.findOneAndDelete(query)
  .then(deletedDocument => {
    if(deletedDocument) {
      console.log(`Successfully deleted document that had the form: ${deletedDocument}.`)
    } else {
      console.log("No document matches the provided query.")
    }
    return deletedDocument
  })
  .catch(err => console.error(`Failed to find and delete document: ${err}`))
};