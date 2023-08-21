// setInterval( ()=> {
//     console.log('in the global...');
// }, 100)

// console.log(__dirname);
// console.log(__filename);

// let people = ["John", "Ganesh", "RaoSabh", "Sebastian"];
// console.log(people);

// module.exports = people;

// let employees = {
//     "John": "Ui/Ux Designer Engineer",
//     "Ganesh": "Software Engineer",
//     "RaoSabh": "Designer Engineer",
//     "Sebastian": "Developer Engineer"
// }

// module.exports = {employees, people};

//FILE SYSTEM...//
// const fs = require('fs');

//file reading...
// fs.readFile('./docs/blog1.txt', (err, data) => { //async
//     if(err) {
//         console.log(err);
//     }
//     console.log(data.toString());
// })

// console.log("I'm First...");

//write file...
// fs.writeFile('./docs/blog.txt' , 'NAMASKARAM VATS 🕉️🌿' , ()=>{
//     console.log("File Written...");
// })
// fs.writeFile('./docs/blog1.txt' , 'NAMASKARAM VATS 🕉️🌿' , ()=>{
//     console.log("File Written...");
// })
// fs.writeFile('./docs/blog1.html' , '<p>Hello world</p>' , ()=>{
//     console.log("File Written...");
// })

//directory

// fs.deletedir("./blobs", (err)=> {
//     if (err) {
//         console.log(err)
//     }
//     console.log('directory created...')
// })

// if repeated again it will throw an error as the file/directory already exist.

// if(!fs.existsSync('./blobs')) {
//     fs.mkdir("./blobs", (err)=> {
//             if (err) {
//                 console.log(err)
//             }
//             console.log('directory created...')
//         })
// }else {
//     fs.rmdir('./blobs', (err)=> {
//         if (err) {
//             console.log(err)
//         }
//         console.log('directory deleted...')
//     })
// }

//deleting files

// if(fs.existsSync) {
//     fs.unlink('./docs/blog1.txt', (err)=> {
//         if (err) {
//             console.log(err)
//         }
//         console.log('file deleted...')
//     })
// }

//STRINGS AND BUFFERS...//

//read stream
// const fs = require('fs');
// const readStream = fs.createReadStream('./docs/blog.txt', {encoding: 'utf8'});
// readStream.on('data', (chunk) => {
//     console.log('/////--------NEW CHUNK---------/////');
//     console.log(chunk);
// });

//write stream
// const fs = require('fs');
// const readStream = fs.createReadStream('./docs/blog.txt', {encoding: 'utf8'});
// const writeStream = fs.createWriteStream('./docs/blog1.txt')
// readStream.on('data', (chunk) => {
//     writeStream.write('\nNEW CHUNK\n');
//     writeStream.write(chunk);
// });

//piping
// readStream.pipe(writeStream); //will do the same task which was done by the readStream.on function.

const fs = require("fs");
const http = require("http");
const _ = require('lodash');

const server = http.createServer((req, res) => {
  // console.log(req.url, req.method);
  //lodash
  const num = _.random(0, 20);
  console.log(num);

  const greet = _.once(()=> {
    console.log("Happy Independence Day mere Dost...🕉️")
  })

  greet()
  greet()
  greet()
  greet()


  //set header content type.
  res.setHeader("Content-Type", "text/html");

  let path = "./views/";

  switch (req.url) {
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/about-me":
      res.setHeader("Location", "/about");
      res.statusCode = 301;
      res.end();
      break;
    case "/":
      path += "just.html";
      res.statusCode = 200;
      break;
    default:
      path += "err.html";
      res.statusCode = 404;
      break;
  }

  //send an html file.
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("server started...");
});

// 127.0.0.1 points directly to one's own pc
