// importing File system
const fs = require('fs');

// reading files 
fs.readFile('./docs/blog1.txt', (err, data) => {   // last callback reading 
    if (err) {
        console.log(err);
    }
    console.log(data.toString());
});

console.log('last line');   // first reading 

// // writing files 
fs.writeFile('./docs/blog1.txt', 'hello, again', () => {   // 경로에 파일이 없다면 생성해버림 
    console.log('file was written');
});


  // 내가 구현한 append 
fs.readFile('./docs/blog1.txt', (err,data) => {
    if(err) {
        console.log(err);
    }
    
    fs.writeFile('./docs/blog1.txt', data.toString()+"append something", () => {
        console.log('cool');
    })
})



// // direcotries 
if (!fs.existsSync('./assets')) {   // 존재하는지 확인 
    fs.mkdir('./assets', (err) => {
        if(err) {
            console.log(err);
        }
    
        console.log('folder created');
    })
} else {
    fs.rmdir('./assets', (err) => {
        if(err) {
            console.log(err);
        }
        console.log('folder deleted');
    });
}



// // deleting files 
if(fs.existsSync('./docs/deleteme.txt')) {
    fs.unlink('./docs/deleteme.txt', (err) => {
        if(err) {
            console.log(err);
        }
        console.log('file deleted');
    })
} else {
    fs.writeFile('./docs/deleteme.txt', 'hello nodeJS', () => {
        console.log('file written');
    })
}
