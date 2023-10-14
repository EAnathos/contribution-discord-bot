const {
  Events,
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
} = require("discord.js");

const i18n = require('i18n')
const {getLang} = require('../utils/contribFunctions.js')

const Variables = require("../index.js");
const contribution = Variables.contribution;

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    // We set the language of the bot to the language of the user who has initiated the interaction
    i18n.setLocale(getLang(interaction.user.id))

    if (interaction.isButton()) {

      if (
        interaction.customId === "previous" ||
        interaction.customId === "next"
      ) {
        const actualPageInt = parseInt(
          interaction.message.embeds[0].title.split("[")[1].split("]")[0]
        );

        const embed = new EmbedBuilder()
          .setTitle(
              i18n.__('leaderboard.embed.title', actualPageInt + 1)
          )
          .setDescription(
              i18n.__('leaderboard.embed.description')
          )
          .setColor("#0000ff")
          .setTimestamp();

        const leaderboardButton = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId("previous")
              .setEmoji("⬅️")
              .setStyle(1)
          )
          .addComponents(
            new ButtonBuilder().setCustomId("next").setEmoji("➡️").setStyle(1)
          );

        contribution.sort((a, b) => b.contributionPoint - a.contributionPoint);

        if (interaction.customId === "previous") {
          if (actualPageInt === 1) {
            await interaction.reply({
              content: i18n.__('leaderboardEvent.buttons.errors.goBack'),
              ephemeral: true,
            });
          } else {
            embed.setTitle(i18n.__("leaderboard.embed.title", actualPageInt + 1));

            const startIndex = (actualPageInt - 2) * 10;
            const endIndex = startIndex + 10;

            for (let i = startIndex; i < endIndex; i++) {
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

            await interaction.message.edit({
              embeds: [embed],
              components: [leaderboardButton],
            });

            await interaction.deferUpdate();
          }
        } else {
          if ((actualPageInt * 10 + 1) > contribution.size) {
            await interaction.reply({
              content: i18n.__('leaderboardEvent.buttons.errors.goFroward'),
              ephemeral: true,
            });
          } else {
            const startIndex = actualPageInt * 10;
            const endIndex =
              startIndex + 10 > contribution.size
                ? contribution.size
                : startIndex + 10;

            for (let i = startIndex; i < endIndex; i++) {
              const user = contribution.get(contribution.keyAt(i));
              if (user) {
                embed.addFields({
                  name: i18n.__(
                      "leaderboard.embed.field.name" , i+1
                  ),
                  value: i18n.__(
                      "leaderboard.embed.field.value",
                      user.user_id, // The ID of the user
                      i18n.__n(
                          "global.points", user.contributionPoint // X point(s)
                      ))
                });
              }
            }

            await interaction.message.edit({
              embeds: [embed],
              components: [leaderboardButton],
            });

            await interaction.deferUpdate();
          }
        }
      }
    }
  },
};
