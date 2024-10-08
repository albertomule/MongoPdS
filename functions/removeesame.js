exports = async function(payload, response) {
  const {n} = payload.query;
  var collection = context.services.get("mongodb-atlas").db("PortalePdS").collection("Esami");
  var query = {"nome": n}
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

  /*var t = collection.count({codice: c})
  .then( (cnt) => { if ( cnt !== 0 ) {
  var doc={"codice": c};
  collection.deleteOne(doc);
  return doc;
  } else {
  return ("Gia’ presente");
  } } );
  return t;*/