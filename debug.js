require('node-watch')('./logs.txt', { recursive: true }, (evt, name) => {
    const fs = require('fs');
    let contents = fs.readFileSync('./logs.txt').toString().split('\n');
    contents.pop();
    contents.reverse();
    console.log(contents);
    let data = [];
    contents.forEach(el => {
        data.push([el.split(':')[0], el.split(':')[1].split('$')[0], el.split('$ ')[1]]);
    });
    console.log(data);
});