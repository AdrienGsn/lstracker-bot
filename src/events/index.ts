import { Client } from "discord.js";

import { handleInteractionCreate } from "./interactionCreate";
import { handleReady } from "./ready";

export function registerEvents(client: Client) {
	client.once("ready", handleReady);

	client.on("interactionCreate", (interaction) => {
		void handleInteractionCreate(interaction);
	});
}
