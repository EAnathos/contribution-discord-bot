const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const { addPoint } = require("../utils/contribFunctions.js");

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
        .setTitle("Ajout")
        .setDescription(
          `${interaction.user} a ajouté ${amount} point(s) de contribution à <@${memberID}>.`
        )
        .setColor("#00ff00")
        .setTimestamp();

	  await addPoint(memberID, amount);
    
    await interaction.reply({ embeds: [resultEmbed] });
  },
};