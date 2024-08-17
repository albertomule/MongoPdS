exports = function(payload, response) {
    const {m} = payload.query;
    const reqBody = payload.body;
  
   // console.log("Request body:", reqBody);

  var obj = JSON.parse(reqBody.text());
  console.log(obj);
  console.log(obj[4]);
  console.log(Object.values(obj[4]));
  var collection = context.services.get("mongodb-atlas").db("PortalePdS").collection("Piani");
  var collectionesami = context.services.get("mongodb-atlas").db("PortalePdS").collection("Esami");
  var t = collection.count({matricola: m})
  .then( (cnt) => { if ( cnt === 0 ) {
    var esami = Object.values(obj[4]);
    var approvato = true;
    for(esame of esami){
      var tmp = collectionesami.count({codice: esame.exam_code})
      .then( (count) => { if ( count === 0 ) {
        approvato = false;
      }});
      console.log(tmp)
    }
    var doc={"matricola": m, "primo": JSON.stringify(obj[0]), "secondo": JSON.stringify(obj[1]), "terzo": JSON.stringify(obj[2]), "comp": JSON.stringify(obj[3]), "esami": JSON.stringify(obj[4]), "approvato": approvato};
    collection.insertOne(doc);
    return doc;
    } else {
    return ("Gia’ presente");
    } } );
  return t;
};