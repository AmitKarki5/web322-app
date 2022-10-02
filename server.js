/*********************************************************************************
*  WEB322 – Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: AMIT SINGH KARKI Student ID: 154716203 Date: 2022-09-1
*
*  Online (Cyclic) Link: ________________________________________________________
*
********************************************************************************/



const express = require("express");
const fs = require('fs');
const productsService = require('./product-service');


fs.readFile('./data/products.json', (err, data) => {
    if (err) throw err;
    products = JSON.parse(data);
});

fs.readFile('./data/categories.json', (err, data) => {
    if (err) throw err;
    categories = JSON.parse(data);
});

const app = express();


app.use(express.static(__dirname + '/views'));


app.get('/', function (req, res) {
    res.render('index.html');
});

app.get('/products', function (req, res) {
    let publishedProducts = products.filter(ele => {
        return ele.published;
    })
    res.status(200).send(publishedProducts);
});

app.get('/demos', function (req, res) {
    res.status(200).json(products);
});

app.get('/categories', function (req, res) {
    res.status(200).json(categories);
})

app.get('*', function (req, res) {
    res.status(404).send("Page Not Found");
});

app.listen(process.env.PORT || 8080, function () {

    console.log("Express http server listening on 8080");
});