/**
 * settings.js
 *
 * Model part for the settings.
 * 
 */

var fs = require('fs'),
    pref = require("./preferences.json");

exports.changeUserData = function (newUsername, newToken, newChannel) {

    newToken = 'oauth:' + newToken.replace(/^oauth:+/i, '');
    newChannel = newChannel.replace(/^#+/i, '');
    newChannel = '#' + newChannel.toLowerCase();

    var data = {
        "username": newUsername,
        "token": newToken,
        "channel": newChannel
    };

    data = JSON.stringify(data, null, '\t');

    fs.writeFile('./lib/preferences.json', data, function(err) {
        if (err) {
            console.log(err);
        }
    });
}

exports.getSettings = function () {
    return pref;
}

exports.addEditPreference = function (commandName) {
    pref.tmpCommand = commandName;

    fs.writeFile('./lib/preferences.json', JSON.stringify(pref, null, '\t'), function(err) {
        if (err) {
            console.log(err);
        }
    });
}

exports.getEditPreference = function () {
    var tmp = pref.tmpCommand;

    if (tmp === undefined) {
        return false;
    } else {
        delete pref.tmpCommand;

        fs.writeFile('./lib/preferences.json', JSON.stringify(pref, null, '\t'), function(err) {
            if (err) {
                console.log(err);
            }
        });
        return tmp;
    }
}