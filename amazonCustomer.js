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
    setTimeout(function () {
        initialAction()
    }, 2000);
});

function readProducts() {
    connection.query("select * from products", function (err, res) {
        if (err) throw err;
        console.log(Table.print(res));
        //   connection.end();
    });
};

function initialAction() {
    var questions = [{
        name: "chooseProduct",
        type: "input",
        message: "What is the ID (user_id) of the product you would like to buy?",
        validate: function (value) {
            if (isNaN(value) === false && value % 1 == 0) {
                return true;
            }
            return false;
            throw err;

        }
    }, {
        name: "quantity",
        type: "input",
        message: "How many units would you like to buy?",
        validate: function (value) {
            if (isNaN(value) === false && value % 1 == 0) {
                return true;
            }
            return false;

            throw err;
        }
    }];
    inquirer
        .prompt(questions)
        .then(function (answer) {
            var cart = parseInt(answer.chooseProduct);
            var quant = parseInt(answer.quantity);
            purchase(cart, quant);
            console.log("------Searching Inventory------");
        });
}

function purchase(purchaseItem, purchaseQuantity) {
    connection.query(`select * from products where item_id = ${purchaseItem}`, function (err, res) {
        if (err) throw err;
        var inventory = parseInt(res[0].stock_quantity);
        // var total = parseInt(res[0].price * purchaseQuantity);
        var newQuantity = parseInt(inventory - purchaseQuantity);
        // console.log(res)
        checkQuantity(inventory, purchaseQuantity);
        updateInventory(purchaseItem, newQuantity);
        //   connection.end();
    });
    // console.log(`Your total is $ ${total}.`);
};

function checkQuantity(nstock, pQuantity) {
    if (nstock >= pQuantity) {
        console.log("Purchase succussful!")
        // updateInventory(purchaseitem, newQuantity)
    } else {
        console.log("That quantity is not in stock, please try again");
        initialAction();
    }
}

function updateInventory(purchaseItem, nq) {
    connection.query(
        "UPDATE products SET ? WHERE ?", [{
                stock_quantity: nq
            },
            {
                item_id: purchaseItem
            }
        ],
        function (err, res) {
            if (error) throw err;
        }

    );
};
