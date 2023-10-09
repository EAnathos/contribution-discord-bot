const { Events } = require('discord.js');

const dbObjects = require("../dbInit.js");
const Contribution = dbObjects.Contribution;

const Variables = require("../index.js");
const contribution = Variables.contribution;

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		const storedContribution = await Contribution.findAll();
		await storedContribution.forEach(b => contribution.set(b.user_id, b));

		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};