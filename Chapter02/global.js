// Global Object 
// console.log(global);

global.setTimeout(() => {    // setTimeout 만 사용해도 됨   , 3초 후 한번 실행 
    console.log('int the timeout ');
    clearInterval(int);      // setInterval stop 
},3000)

const int = setInterval(() => {   // 1초마다 한번 실행 
    console.log(`in the interval `);
}, 1000)

console.log(__dirname);   // C:\Users\dusrb\Desktop\nodeJS\Chapter02
console.log(__filename);  // C:\Users\dusrb\Desktop\nodeJS\Chapter02\global.js


console.log(document.querySelector);  // document is not defined