const { Events } = require("discord.js");

const dbObjects = require("../dbInit.js");
const Contribution = dbObjects.Contribution;

const Variables = require("../index.js");
const contribution = Variables.contribution;

const { infoChannelID, modChannelID } = require("../config.json");

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    const storedContribution = await Contribution.findAll();
    await storedContribution.forEach((b) => contribution.set(b.user_id, b));

    const infoChannel = client.channels.cache.get(infoChannelID);
    await infoChannel.messages.fetch({ limit: 30 });

    const modChannel = client.channels.cache.get(modChannelID);

    modChannel.threads.cache.forEach(async (thread) => { 
      await thread.messages.fetch({ limit: 16, after: thread.id });
    });

    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
