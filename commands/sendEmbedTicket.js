const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("sendembedticket")
        .setDescription("Send an embed ticket"),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle("Ticket")
            .setDescription("Pour ouvrir un ticket, cliquez sur le bouton ci-dessous.")
            .setColor("#0000ff")
            .setTimestamp();

        const ticketButton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("ticket")
                    .setLabel("Créer un ticket")
                    .setStyle("PRIMARY")
            );

        await interaction.reply({ embeds: [embed], components: [ticketButton] });
    },
};