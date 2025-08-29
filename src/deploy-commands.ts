import { REST, Routes } from "discord.js";
import { config } from "dotenv";
import { readdirSync } from "fs";
import path from "path";

config();

const token = process.env.DISCORD_TOKEN!;
const clientId = process.env.DISCORD_CLIENT_ID!;
const guildId = process.env.DISCORD_GUILD_ID!;

const commands: any[] = [];
const commandsPath = path.join(__dirname, "commands");
for (const file of readdirSync(commandsPath)) {
  const command = require(path.join(commandsPath, file));
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    console.log("🔄 Registrando slash commands...");
    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands }
    );
    console.log("✅ Slash commands registrados!");
  } catch (error) {
    console.error(error);
  }
})();
