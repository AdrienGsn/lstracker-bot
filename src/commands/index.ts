import { REST, Routes } from "discord.js";
import { logger } from "../lib/logger";
import { Command } from "../types";
import { helpCommand } from "./help";

export const commands: Command[] = [helpCommand];

export async function registerSlashCommands(clientId: string, token: string) {
	const rest = new REST().setToken(token);

	try {
		logger.info("Début de l'enregistrement des commandes slash...");

		const commandsData = commands.map((command) => command.data.toJSON());

		// Enregistrement global (peut prendre jusqu'à 1 heure)
		logger.info("Enregistrement global des commandes (peut prendre jusqu'à 1 heure)...");

		await rest.put(Routes.applicationCommands(clientId), {
			body: commandsData,
		});

		logger.info(
			`✅ ${commandsData.length} commande(s) slash enregistrée(s) globalement avec succès!`
		);
	} catch (error) {
		logger.error("Erreur lors de l'enregistrement des commandes:", error);
		throw error;
	}
}
