import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";

import { Command } from "../types";
import { commands } from "./index";

export const helpCommand: Command = {
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription("Affiche la liste des commandes disponibles"),
	async execute(interaction: ChatInputCommandInteraction) {
		const embed = new EmbedBuilder()
			.setColor(0x00ff00)
			.setTitle("📚 Liste des commandes")
			.setDescription("Voici toutes les commandes disponibles:")
			.addFields(
				commands.map((cmd) => ({
					name: `/${cmd.data.name}`,
					value: cmd.data.description,
					inline: false,
				}))
			)
			.setFooter({ text: "Commandes slash Discord" })
			.setTimestamp();

		await interaction.reply({ embeds: [embed] });
	},
};
