const app = require('express')();
app.use(require('cors')());

app.get('/:timeStamp/:serviceName/:serviceDescription', 
        require('./handler').logger);

// app.listen(6000);
// console.log("Listening on 6k");

exports.app = app;