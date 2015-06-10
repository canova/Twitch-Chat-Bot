var remote = require('remote'),
    app = remote.require('app'),
    BrowserWindow = remote.require('browser-window'),
    currentWindow = remote.getCurrentWindow(),
    connection = require('./lib/connection.js'),
    settings = require('./lib/settings.js'),
    $ = require('jquery'),
    connectionStatus = false;

$(document).ready(function() {
    if (process.platform == 'darwin') {
        $('#header .buttons').addClass('left');
    }

});

function close() {
    currentWindow.close();
}

function minimize() {
    currentWindow.minimize();
}

function connect() {

    if (connectionStatus == false) {
        connection.connect();
    } else {
        connection.disconnect();
    }

    connectionStatus = !connectionStatus;
    $('ul#centerLinks li.connect').toggleClass('active');

}

function settingsPage() {
    var settingsPage = new BrowserWindow({
        width: 500,
        height: 500,
        frame: false
    });
    settingsPage.loadUrl('file://' + __dirname + '/settings.html');
    settingsPage.show();
}

function commandList() {
    //currentWindow.loadUrl('file://' + __dirname + '/commands.html');
}


function submitSettings(e) {
    var newUsername = $('input#username').val(),
        newToken = $('input#token').val(),
        newChannel = $('input#channel').val();

    settings.changeUserData(newUsername, newToken, newChannel);
    return false;
}

function getSettings() {
    var user = settings.getSettings();

    $('input#username').val(user.username);
    $('input#token').val(user.token);
    $('input#channel').val(user.channel);
}
