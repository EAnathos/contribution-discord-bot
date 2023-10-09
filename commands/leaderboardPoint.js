const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const Variables = require("../index.js");
const contribution = Variables.contribution;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leaderboardpoint")
    .setDescription("Show the leaderboard of contribution point"),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle("Leaderboard")
      .setDescription(`Voici le leaderboard des points de contribution.`)
      .setColor("#0000ff")
      .setTimestamp();

    contribution.sort((a, b) => b.contributionPoint - a.contributionPoint);

    let index = 1;
    contribution.forEach((user) => {
      embed.addFields({
        name: `Top ${index} : `,
        value: `<@${user.user_id}> avec **${user.contributionPoint}** points de contribution`,
      });
      if (index === 10) return;
      index++;
    });

    await interaction.reply({ embeds: [embed] });
  },
};
