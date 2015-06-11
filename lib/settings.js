var fs = require('fs'),
    user = require("./user.json");

exports.changeUserData = function(newUsername, newToken, newChannel) {
    console.log("change user");

    newToken = 'oauth:' + newToken.replace(/^oauth:+/i, '');
    newChannel = newChannel.replace(/^#+/i, '');
    newChannel = '#' + newChannel.toLowerCase();

    var data = {
        "username": newUsername,
        "token": newToken,
        "channel": newChannel
    };

    data = JSON.stringify(data, null, '\t');

    fs.writeFile('./lib/user.json', data, function(err) {
        if (err) {
            console.log(err);
        }
    });
}

exports.getSettings = function() {
    return user;
}
