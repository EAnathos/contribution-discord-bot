const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const { resetPoint, getLang } = require("../utils/contribFunctions.js");

const i18n = require('i18n')

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
    // We do change the language of the bot to the language of the user
    i18n.setLocale(getLang(interaction.user.id))

    const memberID = interaction.options.getUser("membre").id;

    const resultEmbed = new EmbedBuilder()
      .setTitle(i18n.__("resetContribPoint.embed.title"))
      .setDescription(
        i18n.__("resetContribPoint.embed.description",
            memberID, interaction.user.id))
      .setColor("#ff0000")
      .setTimestamp();

    await resetPoint(memberID);

    await interaction.reply({ embeds: [resultEmbed] });
  },
};
