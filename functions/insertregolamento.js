exports = function(payload, response) {
  const {a} = payload.query;
  const {c} = payload.query;
  const reqBody = payload.body;
  
  var obj = JSON.parse(reqBody.text())
  var collection = context.services.get("mongodb-atlas").db("PortalePdS").collection("Regolamenti");
  var t = collection.count({anno: a})
  .then( (cnt) => { if ( cnt === 0 ) {
    var doc={"anno": a, "esami": reqBody.text(), "primo": JSON.stringify(obj[0]), "secondo": JSON.stringify(obj[1]), "terzo": JSON.stringify(obj[2]), "comp": JSON.stringify(obj[3]), "maxcfu": c};
    collection.insertOne(doc);
    return doc;
  } else {
    const query = {anno: a};
    const options = { "returnNewDocument": false };
    var doc={"anno": a, "esami": reqBody.text(), "primo": JSON.stringify(obj[0]), "secondo": JSON.stringify(obj[1]), "terzo": JSON.stringify(obj[2]), "comp": JSON.stringify(obj[3]), "maxcfu": c};
    return collection.findOneAndReplace(query, doc, options)
    .then(replacedDocument => {
      if(replacedDocument) {
        console.log(`Successfully replaced the following document: ${replacedDocument}.`)
      } else {
        console.log("No document matches the provided query.")
      }
      return updatedDocument
    })
    .catch(err => console.error(`Failed to find and replace document: ${err}`))
  } } );
  return t;
};
