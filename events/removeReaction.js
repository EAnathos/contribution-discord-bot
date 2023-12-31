const { Events } = require("discord.js");

const { remPoint } = require("../utils/contribFunctions.js");

const { infoChannelID, modChannelID } = require("../config.json");

module.exports = {
  name: Events.MessageReactionRemove,
  async execute(messageReaction, user) {
    if (
      messageReaction.message.channel.id !== infoChannelID &&
      messageReaction.message.channel.parentId !== modChannelID
    )
      return;

    const message = messageReaction.message;

    const userReactions = message.reactions.cache.filter((messageReaction) =>
      messageReaction.users.cache.has(user.id)
    );

    if (userReactions.size === 0) {
      remPoint(user.id, 1);
    }
  },
};
