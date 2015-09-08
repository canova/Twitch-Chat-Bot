var remote = require('remote'),
    app = remote.require('app'),
    BrowserWindow = remote.require('browser-window'),
    currentWindow = remote.getCurrentWindow(),
    connection = require('./lib/connection.js'),
    settings = require('./lib/settings.js'),
    commands = require('./lib/commands.js'),
    $ = require('jquery'),
    connectionStatus = false;


/* Header button positions for OS X users */
$(document).ready(function() {
    
    if (process.platform == 'darwin') {
        $('#header .buttons').addClass('left');
    }

});

/* Connect or disconnect from twitch irc channel */
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

/* Close current window */
function close() {
    currentWindow.close();
}

/* Minimize current window */
function minimize() {
    currentWindow.minimize();
}

/* Open settings page */
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

/* Open command list page */
function commandList() {
    var commandListPage = new BrowserWindow({
        width: 950,
        height: 500,
        frame: false,
        show: false
    });

    commandListPage.loadUrl('file://' + __dirname + '/commands.html');
    commandListPage.show();
}

/* Open add command page */
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

/* Open points page */
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


/* Submit new settings */
function submitSettings() {
    var newUsername = $('input#username').val(),
        newToken = $('input#token').val(),
        newChannel = $('input#channel').val();

    settings.changeUserData(newUsername, newToken, newChannel);
    return false;
}

/* Submit a new command */
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

/* Get current settings */
function getSettings() {
    var user = settings.getSettings();

    $('input#username').val(user.username);
    $('input#token').val(user.token);
    $('input#channel').val(user.channel);
}

/* Get all commands as a list and print it */
function getCommandList () {
    var commandList = commands.getAllCommands();

    var output = '';
    for(currentCommand in commandList){
        output += '<li> \
                        <div class="name">Command: '+ currentCommand +'</div> \
                        <div class="description">Description: '+ currentCommand['description'] +'</div> \
                        <div class="output">Output: '+ currentCommand['output'] +'</div> \
                        <div class="interval">Interval: '+ currentCommand['interval'] +'</div> \
                        <div class="limit">Limit: '+ currentCommand['limit'] +'</div> \
                        <div class="argc">Argument Count: '+ currentCommand['argc'] +'</div> \
                        <div class="scripts">Scripts: '+ currentCommand['scripts'] +'</div> \
                    </li>';
    }
}
