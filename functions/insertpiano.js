exports = function(payload, response) {
  const {m} = payload.query;
  const {a} = payload.query;
  const reqBody = payload.body;

  var obj = JSON.parse(reqBody.text());
  var collection = context.services.get("mongodb-atlas").db("PortalePdS").collection("Piani");
  var collectionesami = context.services.get("mongodb-atlas").db("PortalePdS").collection("Esami");
  var t = collection.count({matricola: m})
  .then( (cnt) => { if ( cnt === 0 ) {
    var esami = obj[4];
    const boolObj = {flag: true, valueOf() { return this.flag; }, setFalse() {this.flag = false;}};
    let i=0;
    let l=esami.examList.length;
    function test(){
      if (boolObj.valueOf() === true && i<l) {
          return collectionesami.count({codice: esami.examList[i].exam_code}).then(count => {
              if (count === 0) {
                  boolObj.setFalse();
                  return boolObj.valueOf();
              } else {
                  // run the cycle again
                  i++;
                  return test();
              }
          });
      } else {
          return Promise.resolve(boolObj.valueOf());
      }
    }
    test().then(finalResult => {
        console.log(finalResult);
      var doc={"matricola": m, "anno": a, "primo": JSON.stringify(obj[0]), "secondo": JSON.stringify(obj[1]), "terzo": JSON.stringify(obj[2]), "comp": JSON.stringify(obj[3]), "esami": JSON.stringify(obj[4]), "approvato": finalResult};
    collection.insertOne(doc);
    return doc;
    }).catch(err => {
        console.log(err);
    })
   /* do{
      let tmp = collectionesami.count({codice: esami.examList[i].exam_code})
      .then( (count) => { if ( count === 0 ) {
        xd++;
        console.log("XD: " + xd);
        console.log("COUNT: " + count);
        //console.log("THISAPPROVATO1: " + this.approvato);
        console.log("APPROVATO1: " + boolObj.valueOf());
        console.log("i1: " + i);
        //approvato = false;
        boolObj.setFalse();
        i=l;
        //console.log("THISAPPROVATO2: " + this.approvato);
        console.log("APPROVATO2: " + boolObj.valueOf());
        console.log("i2: " + i);
      } else {
        i++;
        console.log("i: " + i);
      }}).catch(err => console.error("Failed to count documents: ", err));
      console.log("TMP: " + tmp);
    }
    while(i<l);*/
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
    /*var doc={"matricola": m, "primo": JSON.stringify(obj[0]), "secondo": JSON.stringify(obj[1]), "terzo": JSON.stringify(obj[2]), "comp": JSON.stringify(obj[3]), "esami": JSON.stringify(obj[4]), "approvato": boolObj.valueOf()};
    collection.insertOne(doc);
    return doc;*/
    } else {
    return ("Gia’ presente");
    } } ).catch(err => console.error("Failed to count documents: ", err));
  return t;
};