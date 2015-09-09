var irc = require('irc'),
    user = require("./preferences.json"),
    commands = require("./commands.json").commands,
    client;

exports.connect = function() {

    if(checkUserData()) {
        client = new irc.Client('irc.twitch.tv', user.username, {
            password: user.token,
            channels: [user.channel]
        });

        client.addListener('error', function(message) {
            console.log('error: ', message);
        });

        client.addListener('message', function(from, to, message) {
            console.log('income text');

            //If it is a command then execute it.
            if (message[0] == '!') {
                console.log('command detected');
                var output = commandExecute(message.substring(1), from);
                client.say(user.channel, output);
            }
        });

        return true;
    } else {
        return false;
    }

}

exports.disconnect = function() {
    client.disconnect();
}

function checkUserData() {
    if (user.username == '' || user.token == '' || user.channel == '') {
        alert('Please fill user information in settings page');
        return false;
    } else {
        return true;
    }
}

/*
 * Get a command and execute it depends on what command it is. 
 */
function commandExecute(command, from) {

    command = command.trim();
    command = command.split(' ');
    var currentCommand = commands[command[0]];

    if (currentCommand == undefined) {
        return null;
    }

    var output = currentCommand['output'];

    var parameterCount = command.length - 1;
    var outputParamCount = currentCommand['argc'];



    if (outputParamCount > 0) {
        // If there is output parameter.
        if (parameterCount > 0) {
            // If there is a parameter in command.

            for (var i = 0; i < outputParamCount; i++) {

                var currentScript = currentCommand['scripts'][i];

                for (var j = 0; j < parameterCount; j++) {
                    currentScript = currentScript.replace('{' + j + '}', command[j + 1]);
                }

                var value = eval(currentScript);
                output = output.replace('{' + i + '}', value);

            }

        } else {
            // If there is no parameter in command.

            for (var i = 0; i < outputParamCount; i++) {

                var value = eval(currentCommand['scripts'][i]);
                output = output.replace('{' + i + '}', value);

            }
        }
    }

    if (output.indexOf('{name}')) {
        output = output.replace('{name}', from);
    }

    return output;
}

