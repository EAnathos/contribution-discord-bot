const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const { remPoint } = require("../utils/contribFunctions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("removecontribpoint")
    .setDescription("Removes contribution points to a user.")
    .addUserOption((option) =>
      option
        .setName("membre")
        .setDescription(
          "La personne dont vous retirer des points de contribution."
        )
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("montant")
        .setDescription(
          "Le nombre de points de contribution à retirer à l'utilisateur."
        )
        .setRequired(true)
    ),
  async execute(interaction) {
    const memberID = interaction.options.getUser("membre").id;
    const amount = interaction.options.getInteger("montant");

    const resultEmbed = new EmbedBuilder()
      .setTitle("Retrait")
      .setDescription(
        `${interaction.user} a retiré ${amount} point(s) de contribution à <@${memberID}>.`
      )
      .setColor("#ff0000")
      .setTimestamp();

    await remPoint(memberID, amount);

    await interaction.reply({ embeds: [resultEmbed] });
  },
};
