const express = require('express');
const { allowedNodeEnvironmentFlags } = require('process');

//express app 
const app = express();

// register view engine 
app.set('view engine', 'ejs');

// listen for requests 
app.listen(3000);

app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'In computer programming, the async/await pattern is a '},
        {title: 'Mario finds stars', snippet: 'In computer programming, the async/await pattern is a '},
        {title: 'How to defeat bowser', snippet: 'In computer programming, the async/await pattern is a '}
    ]
    res.render('index', { title: 'Home', blogs: blogs });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req,res) => {
    res.render('create', { title: 'Create a new Blog' });
})

// 404 page 
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})