const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");

const Variables = require("../index.js");
const contribution = Variables.contribution;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leaderboardpoint")
    .setDescription("Show the leaderboard of contribution point"),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle("Leaderboard [1]")
      .setDescription(`Voici le leaderboard des points de contribution.`)
      .setColor("#0000ff")
      .setTimestamp();

    contribution.sort((a, b) => b.contributionPoint - a.contributionPoint);

    for (let i = 0; i < 9; i++) {
      const user = contribution.get(contribution.keyAt(i));
      if (user) {
        embed.addFields({
          name: `Top ${i + 1} : `,
          value: `<@${user.user_id}> avec **${user.contributionPoint}** points de contribution`,
        });
      }
    }

    const leaderboardButton = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("previous")
          .setEmoji("⬅️")
          .setStyle(1)
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId("next")
          .setEmoji("➡️")
          .setStyle(1)
      );

    await interaction.reply({ embeds: [embed], components: [leaderboardButton] });
  },
};
