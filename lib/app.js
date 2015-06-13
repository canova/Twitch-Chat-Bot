var remote = require('remote'),
    app = remote.require('app'),
    BrowserWindow = remote.require('browser-window'),
    currentWindow = remote.getCurrentWindow(),
    connection = require('./lib/connection.js'),
    settings = require('./lib/settings.js'),
    commands = require('./lib/commands.js'),
    $ = require('jquery'),
    connectionStatus = false;


$(document).ready(function() {
    
    if (process.platform == 'darwin') {
        $('#header .buttons').addClass('left');
    }

});

function connect() {

    if (connectionStatus == false) {
        var result = connection.connect();

        if (result) {
            connectionStatus = true;
            $('ul#centerLinks li.connect').addClass('active');
            $('ul#centerLinks li.connect span').text('Disconnect');
        }
    } else {
        connection.disconnect();

        connectionStatus = false;
        $('ul#centerLinks li.connect').removeClass('active');
        $('ul#centerLinks li.connect span').text('Connect & Start');
    }

}

function close() {
    currentWindow.close();
}

function minimize() {
    currentWindow.minimize();
}

function settingsPage() {
    var settingsPage = new BrowserWindow({
        width: 500,
        height: 500,
        frame: false,
        show: false
    });

    settingsPage.loadUrl('file://' + __dirname + '/settings.html');
    settingsPage.show();
}

function commandList() {
    /*var commandsPage = new BrowserWindow({
        width: 950,
        height: 500,
        frame: false,
        show: false
    });

    commandsPage.loadUrl('file://' + __dirname + '/commands.html');
    commandsPage.show();*/
}

function addCommand() {
    var addCommandPage = new BrowserWindow({
        width: 500,
        height: 550,
        frame: false,
        show: false
    });

    addCommandPage.loadUrl('file://' + __dirname + '/add-command.html');
    addCommandPage.show();
}

function pointsPage() {
    var pointsPage = new BrowserWindow({
        width: 500,
        height: 450,
        frame: false,
        show: false
    });

    pointsPage.loadUrl('file://' + __dirname + '/points.html');
    pointsPage.show();
}


function submitSettings() {
    var newUsername = $('input#username').val(),
        newToken = $('input#token').val(),
        newChannel = $('input#channel').val();

    settings.changeUserData(newUsername, newToken, newChannel);
    return false;
}

function submitCommand() {
    var command = $('input#command').val(),
        description = $('input#description').val(),
        output = $('input#output').val(),
        interval = $('input#interval').val(),
        limit = $('input#limit').val(),
        argc = $('input#argc').val(),
        script = $('input#script').val();

    commands.addCommand(command, description, output, interval, limit, argc, script);
    return false;
}

function getSettings() {
    var user = settings.getSettings();

    $('input#username').val(user.username);
    $('input#token').val(user.token);
    $('input#channel').val(user.channel);
}
