const {
  Events,
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
} = require("discord.js");

const Variables = require("../index.js");
const contribution = Variables.contribution;

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (interaction.isButton()) {
      if (
        interaction.customId === "previous" ||
        interaction.customId === "next"
      ) {
        const actualPageInt = parseInt(
          interaction.message.embeds[0].title.split("[")[1].split("]")[0]
        );

        const embed = new EmbedBuilder()
          .setTitle(`Leaderboard [${actualPageInt + 1}]`)
          .setDescription(`Voici le leaderboard des points de contribution.`)
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
          if (actualPageInt == 1) {
            await interaction.reply({
              content: "Vous ne pouvez pas aller en arrière !",
              ephemeral: true,
            });
          } else {
            embed.setTitle(`Leaderboard [${actualPageInt - 1}]`);

            const startIndex = (actualPageInt - 2) * 10;
            const endIndex = startIndex + 10;

            for (let i = startIndex; i < endIndex; i++) {
              const user = contribution.get(contribution.keyAt(i));
              if (user) {
                embed.addFields({
                  name: `Top ${i + 1} : `,
                  value: `<@${user.user_id}> avec **${user.contributionPoint}** points de contribution`,
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
              content: "Vous ne pouvez pas aller en avant !",
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
                  name: `Top ${i + 1} : `,
                  value: `<@${user.user_id}> avec **${user.contributionPoint}** points de contribution`,
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
