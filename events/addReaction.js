const { Events } = require('discord.js');

const { addPoint } = require("../utils/contribFunctions.js");

const { infoChannelID, modChannelID } = require("../config.json");

module.exports = {
    name: Events.MessageReactionAdd,
    async execute(messageReaction, user) {

        // vérifie que c'est dans le salon info ou que c'est dans un thread du salon mod
        if ((messageReaction.message.channel.id !== infoChannelID) && (messageReaction.message.channel.parentId !== modChannelID)) return;
        
        const message = messageReaction.message;

        const userReactions = message.reactions.cache.filter(messageReaction => messageReaction.users.cache.has(user.id));

        if (userReactions.size < 2) addPoint(user.id, 1);
    },
};
