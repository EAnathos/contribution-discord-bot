const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const { remPoint, getLang } = require("../utils/contribFunctions.js");

const i18n = require('i18n')

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
    // We do change the language of the bot to the language of the user:
    i18n.setLocale(getLang(interaction.user.id))

    const memberID = interaction.options.getUser("membre").id;
    const amount = interaction.options.getInteger("montant");

    const resultEmbed = new EmbedBuilder()
      .setTitle(i18n.__("removeContribPoint.embed.title"))
      .setDescription(
          i18n.__("removeContribPoint.embed.description",
              interaction.user.id, i18n.__n("global.points", amount), memberID
          )

      )
      .setColor("#ff0000")
      .setTimestamp();

    await remPoint(memberID, amount);

    await interaction.reply({ embeds: [resultEmbed] });
  },
};
