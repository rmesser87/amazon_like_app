var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('easy-table')


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "!Ney87chu19",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    readProducts();
});

function readProducts() {
    connection.query("select * from products", function (err, res) {
        if (err) throw err;
        console.log(Table.print(res));
        initialAction();
        //   connection.end();
    });
};

function initialAction() {
    var questions = [{
        name: "chooseProduct",
        type: "input",
        message: "What is the ID (user_id) of the product you would like to buy?",
        validate: function(value) {
            if (isNaN(value) === false && value % 1 == 0) {
              return true;
            }
            return false;
            console.log("Please enter a valid ID and quantity")
            throw err;
            
          }
    }, {
        name: "quanity",
        type: "input",
        message: "How many units would you like to buy?",
        validate: function(value) {
            if (isNaN(value) === false && value % 1 == 0) {
              return true;
            }
            return false;
            console.log("Please enter a valid ID and quantity")
            throw err;
          }
    }];
    inquirer
        .prompt(questions)
        .then(function (answer) {
            // (Number.isInteger(answer.chooseProduct.value)
            console.log("------Searching Inventory------");
        });
}