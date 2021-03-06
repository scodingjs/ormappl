// Import MySQL connection.
var connection = require("../config/connection.js");

function printQuestionMarks(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}

function objToSql(ob) {
        var arr = [];

        for (var key in ob) {
          var value = ob[key];

          if (Object.hasOwnProperty.call(ob, key)) {

            if (typeof value === "string" && value.indexOf(" ") >= 0) {
              value = "'" + value + "'";

            }
            else if (typeof value === "string")
            {
              value = "'"+value+"'" ;
            }
            arr.push(key + "=" + value);
            console.log(' The value is : ',value );
          }
        }
  return arr.toString();
}
// Object for all our SQL statement functions.
var orm = {
  all: function(tableInput, cb) {
    console.log('Executing from Orm -all tablename',tableInput);
    var queryString = "SELECT * FROM " + tableInput + " ;";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      console.log('The query string',queryString);
      console.log('The query resutl',result,err);
      cb(result);
    });
  },
  create: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;
    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";
    console.log('Insert statement:',queryString,'Array of input',vals);
    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }
      console.log('connection - insert',result);
      cb(result);
    });
  },
  // An example of objColVals would be {name: panther, sleepy: true}
  update: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;
    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;
    console.log('From Update -ORM',queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      console.log('connection - update',result);
      cb(result);
    });
  },
  delete: function(table, condition, cb) {
    var queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;
    console.log('Delete from ORM',queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      console.log('connection - delete',result);
      cb(result);
    });
  }
};
// Export the orm object for the model (planner_con.js).
module.exports = orm;
