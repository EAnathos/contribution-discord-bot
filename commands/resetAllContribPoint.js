const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const { resetAllPoint, getLang } = require("../utils/contribFunctions.js");

const i18n = require('i18n')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resetallcontribpoint")
    .setDescription("Reset contribution point for all users"),
  async execute(interaction) {
    // We do change the language of the bot to the language of the user:
    i18n.setLocale(getLang(interaction.user.id))

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
