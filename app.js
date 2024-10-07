const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const seedDB = require('./seed');

const ejsMate = require('ejs-mate');
const methodOverride = require('method-override')

const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/review');


mongoose.connect('mongodb://127.0.0.1:27017/shopapp')
.then(()=>{
    console.log("DB Connected Successfully");
})
.catch((err)=>{
    console.log("DB Error");
    console.log(err);
})


app.engine('ejs', ejsMate);
app.set('view engine' ,'ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));//public folder
app.use(express.urlencoded({extended:true}));//fetch data from the form
app.use(methodOverride('_method'));

app.use(productRoutes);
app.use(reviewRoutes);


// seedDB();//addind initial data

app.listen(8080,()=>{
    console.log("Server connected at port 8080");

})
