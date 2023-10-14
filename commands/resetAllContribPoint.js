const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const { resetAllPoint } = require("../utils/contribFunctions.js");

const i18n = require('i18n')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resetallcontribpoint")
    .setDescription("Reset contribution point for all users"),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle(i18n.__("resetAllContribPoint.embed.title"))
      .setDescription(
        i18n.__("resetAllContribPoint.embed.description",
            interaction.user.id
            )
      )
      .setColor("#ff0000")
      .setTimestamp();

    resetAllPoint();

    await interaction.reply({ embeds: [embed] });
  },
};
