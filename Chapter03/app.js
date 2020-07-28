const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

//express app 
const app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://netninja:test1234@nodetuts.xmsmu.mongodb.net/node-tuts?retryWrites=true&w=majority';
// const dbURI = 'mongodb://192.168.0.39:27017/test';   // local mongodb
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})  // mongodb 연동
.then((result) => app.listen(3000))  // listen for requests  DB 연결 성공 후 3000 포트로 listen 시작 
.catch((err) => console.log(err));
// register view engine 
app.set('view engine', 'ejs');

// middleware & static files 
app.use(express.static('public'));   // css, js, 이미지 등등 를 public 폴더에 넣으면 접근 가능 
app.use(express.urlencoded({ extended: true}));  // POST로 들어온 DATA를 Encoding 해주는 것 같은..

// log 
app.use(morgan('dev'));

// routes 
app.get('/', (req, res) => {
    // const blogs = [
    //     {title: 'Yoshi finds eggs', snippet: 'In computer programming, the async/await pattern is a '},
    //     {title: 'Mario finds stars', snippet: 'In computer programming, the async/await pattern is a '},
    //     {title: 'How to defeat bowser', snippet: 'In computer programming, the async/await pattern is a '}
    // ]
    // res.render('index', { title: 'Home', blogs: blogs });

    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});


// blog route 
app.use('/blogs', blogRoutes);

// 404 page 
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})