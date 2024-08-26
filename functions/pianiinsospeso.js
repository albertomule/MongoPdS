exports = function(payload, response) {
    var collection = context.services.get("mongodb-atlas").db("PortalePdS").collection("Piani");
    return collection.find({approvato: false})
    .sort({ matricola: 1 })
    .toArray()
    .then(items => {
      console.log(`Successfully found ${items.length} documents.`)
      items.forEach(console.log)
      return items
    })
    .catch(err => console.error(`Failed to find documents: ${err}`))
};