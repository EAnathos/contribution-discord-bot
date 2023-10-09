const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const { resetPoint } = require("../utils/contribFunctions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resetcontribpoint")
    .setDescription("Reset contribution points of a user")
    .addUserOption((option) =>
      option
        .setName("membre")
        .setDescription(
          "La personne dont vous voulez réinitialiser les points de contribution."
        )
    ),
  async execute(interaction) {
    const memberID = interaction.options.getUser("membre").id;

    const resultEmbed = new EmbedBuilder()
      .setTitle("Réinitialisation")
      .setDescription(`<@${interaction.user.id}> a réinitialisé les points de contribution de <@${memberID}>.`)
      .setColor("#ff0000")
      .setTimestamp();

    await resetPoint(memberID);

    await interaction.reply({ embeds: [resultEmbed] });
  },
};
