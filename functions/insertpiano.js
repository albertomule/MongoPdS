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
   // let approvato = true;
    const boolObj = {flag: true, valueOf() { return this.flag; }, setFalse() {this.flag = false;}};
    let i=0;
    let l=esami.examList.length;
    console.log("inizio while i: " + i);
    console.log("inizio while l: " + l);
    let xd=0;
    //console.log("inizio while approvato: " + approvato);
    function test(){
      if (boolObj.valueOf() === true && i<l) {
          return collectionesami.count({codice: esami.examList[i].exam_code}).then(count => {
              if (count === 0) {
                  boolObj.setFalse();
                  return boolObj.valueOf();
              } else {
                  // run the cycle again
                  return test();
              }
          });
      } else {
          return Promise.resolve(boolObj.valueOf());
      }
    }
    test().then(finalResult => {
        console.log(finalResult);
      var doc={"matricola": m, "primo": JSON.stringify(obj[0]), "secondo": JSON.stringify(obj[1]), "terzo": JSON.stringify(obj[2]), "comp": JSON.stringify(obj[3]), "esami": JSON.stringify(obj[4]), "approvato": finalResult};
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