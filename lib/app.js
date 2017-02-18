/**
 * app.js
 *
 * The backbone of the App. Contains all controlls and events about app.
 */

var remote = require('remote'),
    app = remote.require('app'),
    BrowserWindow = remote.require('browser-window'),
    currentWindow = remote.getCurrentWindow(),
    connection = require('./lib/connection.js'),
    settings = require('./lib/settings.js'),
    commands = require('./lib/commands.js'),
    $ = require('jquery'),
    connectionStatus = false;

/* 
 * Header button positions for OS X and Linux users (Basicly non Windows users)
 */
$(document).ready(function() {
    if (process.platform != 'win32') {
        $('#header .buttons').addClass('left');
    }

    currentWindow.show();
});

/* 
 * Connect or disconnect from twitch irc channel 
 */
function connect () {
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

/* 
 * Close current window 
 */
function close () {
    currentWindow.close();
}

/* 
 * Minimize current window 
 */
function minimize () {
    currentWindow.minimize();
}

/* 
 * Open settings page 
 */
function settingsPage () {
    var settingsPage = new BrowserWindow({
        width: 500,
        height: 500,
        frame: false,
        show: false
    });

    settingsPage.loadUrl('file://' + __dirname + '/settings.html');
    //settingsPage.show();
}

/* 
 * Open command list page 
 */
function commandList () {
    var commandListPage = new BrowserWindow({
        width: 950,
        height: 500,
        frame: false,
        show: false
    });

    commandListPage.loadUrl('file://' + __dirname + '/commands.html');
    //commandListPage.show();
}

/* 
 * Open add command page 
 */
function addCommand () {
    var addCommandPage = new BrowserWindow({
        width: 500,
        height: 550,
        frame: false,
        show: false
    });

    addCommandPage.loadUrl('file://' + __dirname + '/add-command.html');
    //addCommandPage.show();
}

/* 
 * Open points page 
 */
function pointsPage () {
    var pointsPage = new BrowserWindow({
        width: 500,
        height: 450,
        frame: false,
        show: false
    });

    pointsPage.loadUrl('file://' + __dirname + '/points.html');
    //pointsPage.show();
}


/*
 * Submit new settings
 */
function submitSettings () {
    var newUsername = $('input#username').val(),
        newToken = $('input#token').val(),
        newChannel = $('input#channel').val();

    settings.changeUserData(newUsername, newToken, newChannel);
    return false;
}

/*
 * Submit a new command 
 */
function submitCommand () {
    var command = $('input#command').val(),
        description = $('input#description').val(),
        output = $('input#output').val(),
        interval = parseInt($('input#interval').val()),
        limit = parseInt($('input#limit').val()),
        argc = parseInt($('input#argc').val()),
        script = $('input#script').val();

    commands.addCommand(command, description, output, interval, limit, argc, script);
    alert('New command added successfully.');
    return false;
}

/* 
 * Get current settings 
 */
function getSettings () {
    var user = settings.getSettings();

    $('input#username').val(user.username);
    $('input#token').val(user.token);
    $('input#channel').val(user.channel);
}

/* 
 * Get all commands as a list and print it 
 */
function getCommandList () {
    var commandList = commands.getAllCommands();

    var output = '';
    for(currentCommand in commandList) {
        output += '<li> \
                        <div class="left"> \
                            <div class="name">Command: ' + currentCommand + '</div> \
                            <div class="description">Description: ' + commandList[currentCommand]['description'] + '</div> \
                            <div class="output">Output: ' + commandList[currentCommand]['output'] + '</div> \
                            <div class="interval">Interval: ' + commandList[currentCommand]['interval'] + '</div> \
                        </div> \
                        <div class="left"> \
                            <div class="limit">Limit: ' + commandList[currentCommand]['limit'] + '</div> \
                            <div class="argc">Argument Count: ' + commandList[currentCommand]['argc'] + '</div> \
                            <div class="scripts">Script: ' + commandList[currentCommand]['scripts'] + '</div> \
                            <div class="change"><a href="javascript:openEditPage(\'' + currentCommand + '\')" class="editBtn"></a><a href="javascript:deleteCommand(\'' + currentCommand + '\')" class="deleteBtn"></a></div> \
                        </div> \
                    </li>';
    }

    $('ul#commandList').html(output);
}

/* 
 * Opens page for command editing
 */
function openEditPage (commandName) {
    var editCommandPage = new BrowserWindow({
        width: 500,
        height: 550,
        frame: false,
        show: false
    });

    settings.addEditPreference(commandName);

    editCommandPage.loadUrl('file://' + __dirname + '/add-command.html');
    //editCommandPage.show();
}

/* 
 * Delete Command
 */
function deleteCommand (commandName) {
    commands.deleteCommand(commandName);
    currentWindow.reload();
}

function isEdit () {
    var commandName = settings.getEditPreference();

    if(commandName != false) {
        currentCommand = commands.getCommand(commandName);

        $('input#command').val(commandName);
        $('input#description').val(currentCommand['description']);
        $('input#output').val(currentCommand['output']);
        $('input#interval').val(currentCommand['interval']);
        $('input#limit').val(currentCommand['limit']);
        $('input#argc').val(currentCommand['argc']);
        $('input#script').val(currentCommand['scripts']);
    }
}

