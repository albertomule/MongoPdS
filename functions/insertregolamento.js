exports = function(payload, response) {
    const {a} = payload.query;

    // Raw request body (if the client sent one).
    // This is a binary object that can be accessed as a string using .text()
    const reqBody = payload.body;
  
   // console.log("Request body:", reqBody);

    // You can use 'context' to interact with other application features.
    // Accessing a value:
    // var x = context.values.get("value_name");

    // Querying a mongodb service:
    // const doc = context.services.get("mongodb-atlas").db("dbname").collection("coll_name").findOne();

    // Calling a function:
    // const result = context.functions.execute("function_name", arg1, arg2);

    // The return value of the function is sent as the response back to the client
    // when the "Respond with Result" setting is set.
  var obj = JSON.parse(reqBody.text())
  var collection = context.services.get("mongodb-atlas").db("PortalePdS").collection("Regolamenti");
  var t = collection.count({anno: a})
  .then( (cnt) => { if ( cnt === 0 ) {
    var doc={"anno": a, "esami": reqBody.text(), "primo": JSON.stringify(obj[0]), "secondo": JSON.stringify(obj[1]), "terzo": JSON.stringify(obj[2]), "comp": JSON.stringify(obj[3])};
    collection.insertOne(doc);
    return doc;
    } else {
    return ("Gia’ presente");
    } } );
  return t;
};
