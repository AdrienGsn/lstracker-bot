import { Client } from "discord.js";

import { registerSlashCommands } from "../commands";
import { logger } from "../lib/logger";

export async function handleReady(client: Client) {
	logger.info(`Bot connecté en tant que ${client.user?.tag}`);

	try {
		// await prisma.$connect();
		// logger.info("Connexion à PostgreSQL établie");
	} catch (error) {
		logger.error("Erreur de connexion à PostgreSQL", error);
	}

	if (client.user && process.env.DISCORD_BOT_TOKEN) {
		await registerSlashCommands(client.user.id, process.env.DISCORD_BOT_TOKEN);
	}

	// client.user?.setActivity("Commandes slash disponibles", { type: ActivityType.Playing });
}
