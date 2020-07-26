const express = require('express');
const { allowedNodeEnvironmentFlags } = require('process');

//express app 
const app = express();

// listen for requests 
app.listen(3000);

app.get('/', (req, res) => {
    // res.send('<p>안녕하세요 홈페이지 입니다.</p>');
    res.sendFile('./views/index.html', { root: __dirname});   // 절대경로 만들어주기 위함 
});

app.get('/about', (req, res) => {
    res.sendFile('./views/about.html', { root: __dirname});   // 절대경로 만들어주기 위함 
});

// redirects 
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

// 404 page 
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname});
})