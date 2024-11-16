exports = function(payload, response) {
  const {m} = payload.query;
  const {a} = payload.query;
  const {n} = payload.query;
  const {c} = payload.query;
  const {e} = payload.query;
  const {f} = payload.query;
  const {d} = payload.query;
  const reqBody = payload.body;

  var obj = JSON.parse(reqBody.text());
  var collection = context.services.get("mongodb-atlas").db("PortalePdS").collection("Piani");
  var collectionesami = context.services.get("mongodb-atlas").db("PortalePdS").collection("Esami");

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
  
  var t = collection.count({matricola: m})
  .then( (cnt) => { if ( cnt === 0 ) {
    test().then(finalResult => {
      console.log(finalResult);
      var doc={"matricola": m, "anno": a, "primo": JSON.stringify(obj[0]), "secondo": JSON.stringify(obj[1]), "terzo": JSON.stringify(obj[2]), "comp": JSON.stringify(obj[3]), "esami": JSON.stringify(obj[4]), 
       "approvato": finalResult && f==='true', "nome": n, "cognome": c, "email": e, "fresh": f==='true', "datainvio": d, "dataapprovazione": (finalResult && f==='true') ? d : null};
      collection.insertOne(doc);
      return doc;
    }).catch(err => {
        console.log(err);
    })
    } else {
      test().then(finalResult => {
        console.log(finalResult);
        const query = {matricola: m};
        const options = { "returnNewDocument": false };
        var doc={"matricola": m, "anno": a, "primo": JSON.stringify(obj[0]), "secondo": JSON.stringify(obj[1]), "terzo": JSON.stringify(obj[2]), "comp": JSON.stringify(obj[3]), "esami": JSON.stringify(obj[4]), 
         "approvato": finalResult && f==='true', "nome": n, "cognome": c, "email": e, "fresh": f==='true', "datainvio": d, "dataapprovazione": (finalResult && f==='true') ? d : null};
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
      
      }).catch(err => {
          console.log(err);
      })
    } 
  }).catch(err => console.error("Failed to count documents: ", err));
  return t;
};