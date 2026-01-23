import { ChatInputCommandInteraction, Client, Collection, SlashCommandBuilder, SlashCommandOptionsOnlyBuilder } from "discord.js";

export interface Command {
	data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
	execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

export interface ClientWithCommands extends Client {
	commands: Collection<string, Command>;
}

export interface BotConfig {
	prefix: string;
	ownedId?: string;
}
