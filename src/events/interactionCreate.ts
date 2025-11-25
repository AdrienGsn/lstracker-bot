import { Interaction } from "discord.js";
import { logger } from "../lib/logger";

export async function handleInteractionCreate(interaction: Interaction) {
	// Gestion des interactions de boutons
	if (interaction.isButton()) {
		try {
			// Si le bouton a un customId et qu'il commence par "copy-"
			if (interaction.customId && interaction.customId.startsWith("copy-")) {
				const message = interaction.message;
				// Vérifier si le message possède au moins un embed
				if ("embeds" in message && message.embeds.length > 0) {
					const embed = message.embeds[0];
					let latitude = null;
					let longitude = null;

					// Chercher les champs dans l'embed (fields)
					if (embed.fields && embed.fields.length > 0) {
						for (const field of embed.fields) {
							if (
								field.name.toLowerCase().includes("latitude") ||
								field.name.toLowerCase().includes("lat")
							) {
								latitude = field.value;
							}
							if (
								field.name.toLowerCase().includes("longitude") ||
								field.name.toLowerCase().includes("lng") ||
								field.name.toLowerCase().includes("long")
							) {
								longitude = field.value;
							}
						}
					}

					if (latitude && longitude) {
						await interaction.reply({
							content: `Coordonnées à copier : ${latitude}, ${longitude}`,
							ephemeral: true,
						});
					} else {
						await interaction.reply({
							content: "❌ Impossible de trouver les coordonnées dans l'embed.",
							ephemeral: true,
						});
					}
				} else {
					await interaction.reply({
						content: "❌ Aucun embed trouvé dans le message.",
						ephemeral: true,
					});
				}
			} else {
				await interaction.reply({
					content: "✅ Interaction reçue avec succès !",
					ephemeral: true, // Seule la personne qui a cliqué verra la réponse
				});
			}
		} catch (error) {
			logger.error("Erreur lors de la gestion de l'interaction du bouton", error);

			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({
					content: "❌ Une erreur est survenue lors du traitement de votre interaction.",
					ephemeral: true,
				});
			} else {
				await interaction.reply({
					content: "❌ Une erreur est survenue lors du traitement de votre interaction.",
					ephemeral: true,
				});
			}
		}
		return;
	}

	// Gestion des commandes slash
	if (!interaction.isChatInputCommand()) return;

	const client = interaction.client as any;
	const command = client.commands.get(interaction.commandName);

	if (!command) {
		logger.warn(`Commande ${interaction.commandName} non trouvée`);

		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		logger.error(`Erreur lors de l'exécution de la commande ${interaction.commandName}`, error);

		const errorMessage = "❌ Une erreur est survenue lors de l'exécution de la commande.";

		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: errorMessage, ephemeral: true });
		} else {
			await interaction.reply({ content: errorMessage, ephemeral: true });
		}
	}
}
