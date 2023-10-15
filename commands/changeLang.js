const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const { setLang } = require("../utils/contribFunctions.js");

const i18n = require('i18n')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setlanguage")
        .setDescription("Change the language of the bot.")
        .addStringOption((option) =>
            option
                .setName("language")
                .setDescription("The language you want to set.")
                .setRequired(true)
                .addChoices(
                    { name: 'Interlingua', value: 'ia' },
                    { name: 'Français', value: 'fr' },
                )
        ),

    async execute(interaction) {
        const lang = interaction.options.getString("language");

        i18n.setLocale(lang)

        const resultEmbed = new EmbedBuilder()
            .setTitle(i18n.__("setLang.embed.title"))
            .setDescription(i18n.__("setLang.embed.description")
            )
            .setColor("#0000ff")
            .setTimestamp();
       await setLang(interaction.user.id, lang)
        await interaction.reply({ embeds: [resultEmbed] });
    },
};