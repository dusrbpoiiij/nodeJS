const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog')
//const { allowedNodeEnvironmentFlags } = require('process');

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

// log 
app.use(morgan('dev'));

// mongoose and mongo sandbox routes 
app.get('/add-blog', (req, res) => {   // /add-blog 로 접속하면 database에 data 보내짐 
    const blog = new Blog({
        title: 'new blog',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });

    blog.save()
        .then((result) => {
            res.send(result);   // db로 data 보내기 
        })
        .catch((err) => {
            console.log(err);
        })
});

app.get('/all-blogs', (req,res) => {     // db에서 data 가져오기 
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
});

app.get('/single-blog', (req,res) => {
    Blog.findById('5f1edc2b20eda41a80b788b0')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
})


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


// blog routes 
app.get('/blogs', (req,res) => {
    Blog.find().sort({ createdAt: -1 }) // 시간대별 내림차순 
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result});
        })
        .catch((err) => {
            console.log(err);
        })
});


app.get('/blogs/create', (req,res) => {
    res.render('create', { title: 'Create a new Blog' });
});

// 404 page 
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})