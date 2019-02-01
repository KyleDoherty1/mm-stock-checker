const request = require('request');
const cheerio = require('cheerio');
var nodemailer = require('nodemailer');
var readlineSync = require('readline-sync');

var productURL = readlineSync.question('Enter the product url: ');
var productSize = readlineSync.question('Enter the size of the shoe: ');

var email = readlineSync.question('Enter your gmail address: ');
var password = readlineSync.question('Enter your password: ');

// Call to start the application
runTimer();

// ************************************************************************

//Calls checkStock() every minute to see if item is in stock
function runTimer(){
  var minutes = 1, the_interval = minutes * 60 * 1000;
  console.log("Running check every 1 minute ...")
  checkStock();
  setInterval(function() {
    console.log("1 minute check");
    checkStock();
  }, the_interval);
}

//Get the HTML of the products webpage and determines if the item is in stock
function checkStock(){

  //Get the HTML
  request({
      method: 'GET',
      url: productURL
  }, (err, res, body) => {
    
    if (err) return console.error(err);
    
    //Let $ be the html body so cheerio can filter the data jquery style
    let $ = cheerio.load(body);
    
    //Pull the data from the html that we need
    var productNumber = $('#description > div.st-product-details.clearfix > div:nth-child(1) > div.st-product-description > div > strong').html();
    var lastFive = productNumber.substr(productNumber.length - 6); //Last 5 digits of the product number as this whats needed

    //By selecting the html attribute with the data-sku thats equal to the last five digits
    //of the product number we can determine if the products in stock by its calss name
    var inStock = $('*[data-sku="' + lastFive + '/' + productSize +'"]').attr('class'); 

    if(inStock.trim() == 'sizeSelectItem')
    {
        sendEmail();
        console.log("Item In Stock");
    }

    else
      console.log("Item out of Stock");
       
     });
}

function sendEmail(){
  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: email,
        pass: password
      }
    });
    
    var mailOptions = {
      from: email,
      to: email,
      subject: 'Stock Update from M&M Direct',
      text: 'Product back in stock >>> ' + productURL
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
}
