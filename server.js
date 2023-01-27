
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const myItem = require('./models/item');

mongoose.set('strictQuery', false);

const app = express();

app.use(express.json());//that will allow us to accept that javascript object, notation data
//console.log(myFruit);
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//inside connectionstring define username, password, datbase name clusture.
let connectionstring = `mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@mongodbsetup.g4balam.mongodb.net/Inventory?retryWrites=true&w=majority`
console.log(process.env.MONGOUSERNAME);

mongoose.connect(connectionstring, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});

//To genearate random  dateover next 30 days
function randomDateAfterDate(start, days) {
    return new Date(start.getTime() + (Math.random() * days * 24 * 60 * 60 * 1000));
}
console.log(randomDateAfterDate(new Date(2023, 1, 21), +365));


app.post("/create_item", async (req, res) => {
    console.log(req.body);
    const { nameString: name, priceNumber: price, inventoryNumber: inventory, deliverydateDate: nextDelivery, deliveryamtNumber: deliveryAmt } = req.body;
    console.log("uploading to database...");
    let returnedValue = await myItem.create({
        name,
        price,
        inventory,
        nextDelivery,
        deliveryAmt
    });
    //myItem.create(req.body);
    console.log(returnedValue);
    if (returnedValue) {
        console.log("Upload Complete");
    }
    //res.status(400);
    res.send(returnedValue);
    res.send("good request")
})

app.get('/getFoodData', async (req, res) => {
    //GET DATA FROM MONGODB 
    let response = await myFruit.find({});
    console.log(response);
    //send it back to database
    res.json(response);

})


//To display Items
app.get('/items', async (req, res) => {
    //GET DATA FROM MONGODB 
    let response = await myItem.find({});
    console.log(response);
    //send it back to database
    res.json(response);

})

app.get('/search/:itemName', async (req, res) => {
    //GET DATA FROM MONGODB 
    findItem = req.params.itemName;
    console.log(findItem);
    //To check case insensitive data
    
    //var regexveggie = new RegExp(["^", findVeggie, "$"].join(""), "i");
    var regexitem = new RegExp(["^", findItem, "$"].join(""), "i");
    console.log(regexitem);
    //let response = await myVegie.find({ name: regexveggie});    
    let itemresponse = await myItem.find({ name:  regexitem});
    //console.log(response);
    //send it back to database
    if (itemresponse.length) {
        res.json(itemresponse);

    } else {
        res.send({ data: "No items in database " });
        //Item you are looking for is not available right now
    }
    console.log(itemresponse);

});
app.get('/getData', (req, res) => {
    //GET DATA FROM MONGODB
    //res.json(data)
    res.setHeader('Content-Type', 'application/json');
    console.log("request received at /getData");
    //console.log(process.env.MONGOPASSWORD);
    //res.json("Response received");//sends response to crome
    res.send({ data: "Response received" });
});

app.listen(5000, () => {
    console.log(`Server is Listening on 5000`)
})