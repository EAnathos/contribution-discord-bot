const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const { getPoint } = require("../utils/contribFunctions.js");

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
    const memberID = interaction.options.getUser("membre").id;
    const amount = getPoint(memberID);

    const resultEmbed = new EmbedBuilder()
    .setTitle("Affichage")
      .setDescription(`<@${memberID}> a ${amount} point(s) de contribution.`)
      .setColor("#0000ff")
      .setTimestamp();

    interaction.reply({ embeds: [resultEmbed] });
  },
};