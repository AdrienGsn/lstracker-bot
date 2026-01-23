import "./server";

import { Client, Collection, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";


import { commands } from "./commands";
import { registerEvents } from "./events";
import { logger } from "./lib/logger";
import { ClientWithCommands, Command } from "./types";

dotenv.config();

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
}) as ClientWithCommands;

if (!client.commands) {
	client.commands = new Collection<string, Command>();
}

client.commands.clear();

commands.forEach((command) => {
	client.commands.set(command.data.name, command);
});

registerEvents(client);

process.once("SIGINT", async () => {
	logger.info("SIGINT signal received. Shutting down gracefully...");

	client.destroy();

	process.exit(0);
});

client.login(process.env.DISCORD_BOT_TOKEN);
