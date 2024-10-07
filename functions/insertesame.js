/*exports = async function(arg){
  // This default function will get a value and find a document in MongoDB
  // To see plenty more examples of what you can do with functions see: 
  // https://www.mongodb.com/docs/atlas/app-services/functions/

  // Find the name of the MongoDB service you want to use (see "Linked Data Sources" tab)
  var serviceName = "mongodb-atlas";

  // Update these to reflect your db/collection
  var dbName = "db_name";
  var collName = "coll_name";

  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);

  var findResult;
  try {
    // Get a value from the context (see "Values" tab)
    // Update this to reflect your value's name.
    var valueName = "value_name";
    var value = context.values.get(valueName);

    // Execute a FindOne in MongoDB 
    findResult = await collection.findOne(
      { owner_id: context.user.id, "fieldName": value, "argField": arg},
    );

  } catch(err) {
    console.log("Error occurred while executing findOne:", err.message);

    return { error: err.message };
  }

  // To call other named functions:
  // var result = context.functions.execute("function_name", arg1, arg2);

  return { result: findResult };
};*/

// This function is the endpoint's request handler.
/*exports = function({ query, headers, body}, response) {
    // Data can be extracted from the request as follows:

    // Query params, e.g. '?arg1=hello&arg2=world' => {arg1: "hello", arg2: "world"}
    const {arg1, arg2} = query;

    // Headers, e.g. {"Content-Type": ["application/json"]}
    const contentTypes = headers["Content-Type"];

    // Raw request body (if the client sent one).
    // This is a binary object that can be accessed as a string using .text()
    const reqBody = body;
    var collection = context.services.get("mongodb-atlas").db("PortalePdS").collection("Esami");
    var t = collection.count({nome: n})
    .then( (cnt) => { if ( cnt === 0 ) {
    var doc={"nome": n, "cognome": c, "isOnline": o === 'true', "color": co, "id": parseInt(id)};
    collection.insertOne(doc);
    return doc;
    } else {
    return ("Gia’ presente");
    } } );
return t;
    return  "Hello World!";
};*/

exports = function(payload, response) {
  const {n} = payload.query;
  const {c} = payload.query;
  const {cfu} = payload.query;
  var collection = context.services.get("mongodb-atlas").db("PortalePdS").collection("Esami");
  var t = collection.count({nome: n, codice: c})
  .then( (cnt) => { if ( cnt === 0 ) {
  var doc={"nome": n, "codice": c, "cfu": parseInt(cfu)};
  collection.insertOne(doc);
  return doc;
  } else {
  return ("Gia’ presente");
  } } );
  return t;
};