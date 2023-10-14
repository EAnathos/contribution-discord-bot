const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const { addPoint } = require("../utils/contribFunctions.js");

const i18n = require('i18n')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addcontribpoint")
    .setDescription("Adds contribution points to a user.")
    .addUserOption((option) =>
      option
        .setName("membre")
        .setDescription("La personne dont vous voulez ajouter des points de contribution.")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("montant")
        .setDescription("Le nombre de points de contribution à ajouter à l'utilisateur.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const memberID = interaction.options.getUser("membre").id;
    const amount = interaction.options.getInteger("montant");

    const resultEmbed = new EmbedBuilder()
        .setTitle(i18n.__("addContribPoint.embed.title"))
        .setDescription(
            i18n.__("addContribPoint.embed.description",
                interaction.user.id, i18n.__n("global.points", amount), memberID
            )
        )
        .setColor("#00ff00")
        .setTimestamp();

	  await addPoint(memberID, amount);
    
    await interaction.reply({ embeds: [resultEmbed] });
  },
};