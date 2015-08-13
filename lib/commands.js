var fs = require('fs'),
    commands = require("./commands.json").commands;


exports.addCommand = function(command, desc, output, interval, limit, argc, script) {
	var newCommand = {
		'description': desc,
		'output': output,
		'interval': interval,
		'limit': limit,
		'argc': argc,
		'script': script
	};

	commands[command] = newCommand

	var data = JSON.stringify(commands, null, '\t');

	writeFile('./lib/commands.json', data);
}

exports.deleteCommand = function(command) {
	delete commands[command];

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

exports.getAllCommands = function() {
	return commands;
}