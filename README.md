## M&M Stock Checker
This is a personal project that checks the stock of an item on mandmdirect.com and sends an email if it comes back into stock.
<b>CURRENTLY ONLY WORKING FOR SHOES ON THE WEBSITE. I HOPE TO ADDITIONAL TYPES OF CLOTHING SOON</b>
## Motivation
After using mandmdirect a lot for online shopping, I found it frustrating that while an item can be a good price, the size your looking for is not always available. I figured that when a size goes out of stock that usually when returns are sent back they add it to the website. Usually if your standard sizes like me, them sizes dont last long when their put back up. So I decided to make this script that will notify you when your desired item comes back into stock.

### Prerequisites
Have nodeJS installed. Im running this on my raspberry pi at home. You can as easily run it on windows.
For RaspberryPi install node by:
```
curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
sudo apt-get install -y nodejs
```
For Windows download it from:
```
https://nodejs.org/en/download/
```

### Installing

Download a zip of the folder or clone it. Open the folder and install the node modules

```
npm install
```

## Running the program

Run the index.js file

```
node index.js
```

It will ask you for the url of the product. Enter the url of the products webpage.

```
Enter product URL: https://www.mandmdirect.ie/01/details/NB1553/New-Balance-410-Trainers-Burgundy
```
It will then ask you for the products size that you want to be notified on when it comes into stock

```
Enter size: 10
```
The program will query mandmdirect.com every minute. If it finds that your size is available it will send you an email.

## Current State and TO-DO

For now the program only works on shoes on the site. 

<b>TO-DO</b>
- Ability to add different types of clothing
- Email multiple people if item comes into stock
- Let user set the timer in minutes
