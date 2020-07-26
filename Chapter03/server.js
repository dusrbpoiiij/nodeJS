// 만약 3rd party 패키지 다운 다 받고 다른 운영 서버로 배포할 때는 
// package.json 을 꼭 가지고 가야하고, npm install  을 때리면 패키지 다 다운 받는다. 


const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {      // 서버에 localhosts:3000으로 응답받으면 실행 됨 

    // lodash 
    const num = _.random(0,20);
    console.log(num);

    const greet = _.once(() => {   // 요청 1번에 1번만 실행 시키기 
        console.log('hello');
    })

    greet();
    greet();
    // set header content type 
    res.setHeader('Content-Type', 'text/html');

    // 유저가 요청한 path 구하기 
    // -> views가 많으면 상당히 messy 해짐.  3rd party를 통해 해결 가능 (express)
    let path = './views/';
    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-blah':
            res.statusCode = 301;
            res.setHeader('Location','/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    // send an html file
    fs.readFile(path, (err, data) => {
        if(err) {
            console.log(err);
            res.end();
        } else {
            //res.write(data);
            res.end(data);
        }
    })
});

server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');   // localhost:3000 으로 응답 받음 
})
