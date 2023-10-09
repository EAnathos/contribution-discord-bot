const { Events, ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js');


module.exports = {
	name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isButton()) {
            if (interaction.customId === 'ticket') {
                const thread = await interaction.channel.threads.create({
                    name: `ticket-${interaction.user.username}`,
                    autoArchiveDuration: 1440,
                    reason: "Ticket créé"
                });

                await thread.members.add(interaction.user.id, {
                    reason: "Ticket créé"
                });

                const newTicketEmbed = new EmbedBuilder()
                    .setTitle("Ticket de " + interaction.user.username)
                    .setDescription(`
                        Bienvenue dans votre ticket !
                        Veuillez expliquer la raison de votre ticket en détail.
                        Un membre du staff vous répondra dès que possible.
                        \n Si vous pensez que votre ticket est terminé, vous pouvez le fermer en cliquant sur le bouton ci-dessous.
                    `)
                    .setColor("#0000ff")
                    .setTimestamp();

                const newTicketButtons = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId("closeticket")
                            .setLabel("Fermer le ticket")
                            .setStyle(4)
                    );

                await thread.send({ embeds: [newTicketEmbed], components: [newTicketButtons] });
            } else if (interaction.customId === 'closeticket') {
                await interaction.channel.send("``` ```\nTicket fermé !");
                await interaction.channel.setArchived(true, "Ticket fermé");
            }
        }
    },
};