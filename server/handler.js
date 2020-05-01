exports.logger = (req, res) => {
    let p = req.params;
    let log = p.timeStamp + "::" + p.serviceName + "$ " + p.serviceDescription + "\n";
    fileWriter(log);
    return res.json({
        op: true
    });
}

function fileWriter(data) {
    const fs = require('fs');
    try {
        fs.appendFileSync('logs.txt', data);
    } catch (err) {
        console.error(err);
    }
}
