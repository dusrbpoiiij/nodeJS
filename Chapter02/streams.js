// 동영상 스트리밍 처럼 한번에 대용량 파일 전송하는 것이 아니라 버퍼로 끊어서 전달해주는 것을 구현함 

const fs = require('fs');

const readStream = fs.createReadStream('./docs/blog3.txt', { encoding: 'utf8'});
const writeStream = fs.createWriteStream('./docs/blog4.txt');

readStream.on('data', (chunk) => {    // 리스너 data event   chunk는 버퍼 단위 인듯 
    console.log('-------- NEW CHUNK ---------')
    console.log(chunk);
    writeStream.write('\nNEW CHUNK\n');
    writeStream.write(chunk);
});


// PIPING 
readStream.pipe(writeStream);   // 읽은거 그대로 write 