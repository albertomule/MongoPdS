exports = function(payload, response) {
    const {m} = payload.query;
    const reqBody = payload.body;
  
   // console.log("Request body:", reqBody);

  var obj = JSON.parse(reqBody.text());
 // console.log(obj);
 // console.log(obj[4]);
  //console.log(obj[4].examList);
  //console.log(obj[4].examList[0].exam_code);
  var collection = context.services.get("mongodb-atlas").db("PortalePdS").collection("Piani");
  var collectionesami = context.services.get("mongodb-atlas").db("PortalePdS").collection("Esami");
  var t = collection.count({matricola: m})
  .then( (cnt) => { if ( cnt === 0 ) {
    var esami = obj[4];
    let approvato = true;
    let i=0;
    let l=esami.examList.length;
    console.log("inizio while i: " + i);
    console.log("inizio while l: " + l);
    console.log("inizio while approvato: " + approvato);
    while(approvato===true && i<l){
      let tmp = collectionesami.count({codice: esami.examList[i].exam_code})
      .then( (count) => { if ( count === 0 ) {
        console.log("COUNT: " + count);
        //console.log("THISAPPROVATO1: " + this.approvato);
        console.log("APPROVATO1: " + approvato);
        approvato = false;
        //console.log("THISAPPROVATO2: " + this.approvato);
        console.log("APPROVATO2: " + approvato);
      } else {
        i++;
        console.log("i: " + i);
      }});
      console.log("TMP: " + tmp);
    }
    /*for(var i=0, l=esami.examList.length; i<l; i++){
      var tmp = collectionesami.count({codice: esami.examList[i].exam_code})
      .then( (count) => { if ( count === 0 ) {
        console.log(count);
        console.log(this.approvato);
        console.log(approvato);
        this.approvato = false;
        console.log(this.approvato);
        console.log(approvato);
      }});
      console.log(tmp);
    }*/
    var doc={"matricola": m, "primo": JSON.stringify(obj[0]), "secondo": JSON.stringify(obj[1]), "terzo": JSON.stringify(obj[2]), "comp": JSON.stringify(obj[3]), "esami": JSON.stringify(obj[4]), "approvato": approvato};
    collection.insertOne(doc);
    return doc;
    } else {
    return ("Gia’ presente");
    } } );
  return t;
};