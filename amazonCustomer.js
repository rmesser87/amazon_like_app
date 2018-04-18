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
    initialAction();
});

function readProducts() {
    connection.query("select * from products", function (err, res) {
        if (err) throw err;
        console.log(Table.print(res));;
        //   connection.end();
    });
};

function initialAction() {
    inquirer
        .prompt({
            name: "chooseProduct",
            type: "input",
            message: "What is the ID (user_id) of the product you would like to buy?"
        }, {
            name: "quanity",
            type: "input",
            message: "How many units would you like to buy?"
        })
        .then(function (answer) {
            if (answer.postOrBid.toUpperCase() === "POST") {
                postAuction();
            } else {
                bidAuction();
            }
        });
}