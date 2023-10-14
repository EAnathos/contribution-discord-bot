const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");

const Variables = require("../index.js");
const contribution = Variables.contribution;

const i18n = require('i18n')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leaderboardpoint")
    .setDescription("Show the leaderboard of contribution point"),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle(
          i18n.__("leaderboard.embed.title", 1)
      )
      .setDescription(
          i18n.__("leaderboard.embed.description")
      )
      .setColor("#0000ff")
      .setTimestamp();

    contribution.sort((a, b) => b.contributionPoint - a.contributionPoint);

    for (let i = 0; i < 9; i++) {
      const user = contribution.get(contribution.keyAt(i));
      if (user) {

        embed.addFields({
          name: i18n.__(
              "leaderboard.embed.field.name",
              i+1
          ),
          value: i18n.__(
              "leaderboard.embed.field.value",
              user.user_id, // The ID of the user

              i18n.__n(
                  "global.points",
                  user.contributionPoint // X point(s)
              ))
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
