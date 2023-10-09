const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("sendembedticket")
        .setDescription("Send an embed ticket"),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle("Ouvrir un ticket")
            .setDescription(`
            **Bienvenue dans le salon de création de ticket !**
            \n Le système de ticket peut servir à :
* Inviter une personne sur le serveur (autre que du BUT).
* Signaler un joueur / un bug.
* Réserver le serveur événement.
* Demander l'accès aux commands blocks dans le serveur créatif.
\n *Pour ouvrir un ticket, cliquez sur le bouton ci-dessous.*
            `)
            .setColor("#0000ff")
            .setTimestamp();

        const ticketButton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("ticket")
                    .setLabel("Créer un ticket")
                    .setStyle(1)
            );

        await interaction.reply({ embeds: [embed], components: [ticketButton] });
    },
};