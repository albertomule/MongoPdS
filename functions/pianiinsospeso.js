exports = function(payload, response) {
    var collection = context.services.get("mongodb-atlas").db("PortalePdS").collection("Piani");
    return itemsCollection.find({approvato: false})
    .sort({ matricola: 1 })
    .toArray()
    .then(items => {
      console.log(`Successfully found ${items.length} documents.`)
      items.forEach(console.log)
      return items
    })
    .catch(err => console.error(`Failed to find documents: ${err}`))

 /* return collection.findOne()
  .then(result => {
    if(result) {
      console.log(`Successfully found document: ${result}.`);
    } else {
      console.log("No document matches the provided query.");
    }
    return result;
  })
  .catch(err => console.error(`Failed to find document: ${err}`));*/
};