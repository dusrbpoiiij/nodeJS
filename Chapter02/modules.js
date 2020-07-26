const { people, ages } = require('./people');   // people.js  importing 

//console.log(xyz);  // module.export 로 값 받음 
// console.log(people);   // not defined    
console.log(people, ages);

const os = require('os');  // OS 기본 정보 module import

console.log(os.platform(), os.homedir());