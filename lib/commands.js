var fs = require('fs'),
    commands = require("./commands.json");


exports.addCommand = function(command, desc, output, interval, limit, argc, script) {
	var newCommand = {
		'description': desc,
		'output': output,
		'interval': interval,
		'limit': limit,
		'argc': argc,
		'script': script
	};

	commands[command] = newCommand;

	var data = JSON.stringify(commands, null, '\t');

	writeFile('./lib/commands.json', data);
}

exports.deleteCommand = function(commandName) {
	delete commands[commandName];

	var data = JSON.stringify(commands, null, '\t');

	writeFile('./lib/commands.json', data);
}

function writeFile(fileName, data) {
	fs.writeFile(fileName, data, function(err) {
        if (err) {
            console.log(err);
        }
    });
}

exports.getCommand = function(commandName) {
	return commands[commandName];
}

exports.getAllCommands = function() {
	return commands;
}
