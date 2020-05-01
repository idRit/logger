var blessed = require('blessed')
    , contrib = require('blessed-contrib')
    , screen = blessed.screen()

var table = contrib.table(
    {
        keys: true
        , vi: true
        , fg: 'white'
        , selectedFg: 'white'
        , selectedBg: 'blue'
        , interactive: true
        , label: 'Service Logs'
        , width: '100%'
        , height: '100%'
        , border: { type: "line", fg: "cyan" }
        , columnSpacing: 10
        , columnWidth: [16, 12, 32]
    })

table.focus()
screen.append(table)

require('node-watch')('../logs.txt', { recursive: true }, (evt, name) => {
    const fs = require('fs');
    let contents = fs.readFileSync('../logs.txt').toString().split('\n');
    contents.pop();
    contents.reverse();
    // console.log(contents);
    let data = [];
    contents.forEach(el => {
        data.push([el.split('::')[0], el.split('::')[1].split('$')[0], el.split('$ ')[1]]);
    });
    table.setData({
        headers: ['Time-Stamp', 'Service', 'Description'],
        data: data
    });
    screen.render()
});

// const fs = require('fs');
// let contents = fs.readFileSync('../logs.txt').toString().split('\n');
// contents.pop();
// contents.reverse();
// let data1 = [];
// contents.forEach(el => {
//     data1.push([el.split(':')[0], el.split(':')[1].split('$')[0], el.split('$ ')[1]]);
// });
// console.log([data1]);
// table.setData({
//     headers: ['Time-Stamp', 'Service', 'Description'],
//     data: [...data1]
// });

screen.key(['escape', 'q', 'C-c'], function (ch, key) {
    return process.exit(0);
});
