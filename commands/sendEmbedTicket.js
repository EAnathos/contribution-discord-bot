const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const i18n = require('i18n')
const { getLang } = require("../utils/contribFunctions.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("sendembedticket")
        .setDescription("Send an embed ticket"),
    async execute(interaction) {
        // we do change the language of the bot to the language of the user:
        i18n.setLocale(getLang(interaction.user.id))

        const embed = new EmbedBuilder()
            .setTitle(i18n.__("sendEmbedTicket.embed.title"))
            .setDescription(i18n.__("sendEmbedTicket.embed.description"))
            .setColor("#0000ff")
            .setTimestamp();

        const ticketButton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("ticket")
                    .setLabel(i18n.__("sendEmbedTicket.button.label"))
                    .setStyle(1)
            );

        await interaction.reply({ embeds: [embed], components: [ticketButton] });
    },
};