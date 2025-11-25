import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export interface Command {
	data: SlashCommandBuilder;
	execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

export interface BotConfig {
	prefix: string;
	ownedId?: string;
}
