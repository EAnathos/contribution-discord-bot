const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const { getPoint, getLang } = require("../utils/contribFunctions.js");

const i18n = require('i18n')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("getcontribpoint")
    .setDescription("Gets contribution points of a user")
    .addUserOption((option) =>
      option
        .setName("membre")
        .setDescription("La personne dont vous voulez voir les points de contribution.")
        .setRequired(true)
    ),
  async execute(interaction) {
    // We do change the language of the bot here to the language of the user
    i18n.setLocale(getLang(interaction.user.id))

    const memberID = interaction.options.getUser("membre").id;
    const amount = getPoint(memberID);

    const resultEmbed = new EmbedBuilder()
    .setTitle(i18n.__("getContribPoint.embed.title"))
      .setDescription(i18n.__("getContribPoint.embed.description",
          memberID, i18n.__n("global.points", amount)))
      .setColor("#0000ff")
      .setTimestamp();

    interaction.reply({ embeds: [resultEmbed] });
  },
};