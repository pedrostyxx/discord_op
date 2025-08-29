import { Client, GatewayIntentBits, Collection, Interaction } from "discord.js";
import { config } from "dotenv";
import { readdirSync } from "fs";
import path from "path";

config();

const token = process.env.DISCORD_TOKEN!;
interface ExtendedClient extends Client {
  commands: Collection<string, any>;
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
}) as ExtendedClient;

client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
for (const file of readdirSync(commandsPath)) {
  const command = require(path.join(commandsPath, file));
  client.commands.set(command.data.name, command);
}

client.once("ready", () => {
  console.log(`🤖 Logado como ${client.user?.tag}`);
});

client.on("interactionCreate", async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: "Erro ao executar comando.", ephemeral: true });
  }
});

client.login(token);
