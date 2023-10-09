const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const { resetAllPoint } = require("../utils/contribFunctions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resetallcontribpoint")
    .setDescription("Reset contribution point for all users"),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle("Réinitialisation")
      .setDescription(
        `<@${interaction.user.id}> a réinitialisé les points de contribution de tous les membres.`
      )
      .setColor("#ff0000")
      .setTimestamp();

    resetAllPoint();

    await interaction.reply({ embeds: [embed] });
  },
};
