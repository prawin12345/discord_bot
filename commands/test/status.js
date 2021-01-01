const { Command } = require('discord.js-commando');

module.exports = class StatusCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'status',
			aliases: ['ok?'],
			group: 'test',
			memberName: 'status',
			description: 'Test if the Bot works and is online.',
		});
    }
    
    run(message) {
		return message.say('status ok');
	}
};