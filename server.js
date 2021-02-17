const { request, response } = require('express');
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const fs = require('fs');

var app = express();

hbs.registerPartials(path.join(__dirname + '/views/partials'));
app.set('view engine', 'hbs');


app.use((request,response,next) => {
    var now = new Date().toString();
    var log = `${now}: ${request.method} ${request.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n', (err) => {
        if(err){
            console.log("Unable to append to file");
        }
    })
    next();
})

// app.use((request,response,next) => {
//     response.render('maintainance.hbs',{
//         caution: "We'll be right back",
//         reason: "The site is currently being updataed"
//     })
// });

app.use(express.static(path.join(__dirname + '/public')));


hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/',(request, response) => {
    // response.send("Hello Express!");
    // response.send({
    //     name: 'Vishwanath',
    //     likes: ['Biking','Cycling','Music']
    // })
    response.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: "Hey Welcome! enjoy exploring the website"
        //currentYear: new Date().getFullYear()
    })
});

app.get('/about',(request,response) => {
    response.render('about.hbs',{
        pageTitle: 'About page'
        // currentYear: new Date().getFullYear()
    });
});

app.get('/bad',(request,response) => {
    response.send({
        errorMessage: "Unable to access the page"
    })
})
app.listen(8080);

