const { Client, GatewayIntentBits, EmbedBuilder, REST, Routes } = require("discord.js");
require("dotenv").config();
const token = process.env.DISCORD_TOKEN;
const clientId = process.env.DISCORD_CLIENT_ID; // Adicione ao seu .env
const guildId = process.env.DISCORD_GUILD_ID;   // Adicione ao seu .env

const client = new Client({
  intents: [GatewayIntentBits.Guilds] // só precisa disso agora
});

const commands = [
  {
    name: "ping",
    description: "Responde com Pong!"
  },
  {
    name: "fluxo",
    description: "Envia embed de fluxo iniciado"
  }
];

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

// -------- BOT LÓGICA --------
client.on("ready", () => {
  console.log(`🤖 Logado como ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("🏓 Pong!");
  }

  if (interaction.commandName === "fluxo") {
    const embed = new EmbedBuilder()
      .setTitle("🚀 Fluxo Iniciado")
      .setDescription("Um usuário iniciou o fluxo com sucesso! ✅")
      .setColor(0x5865F2)
      .setFooter({ text: "Sistema de Notificações" })
      .setTimestamp();

    await interaction.reply({ content: "@everyone 🚨", embeds: [embed] });
  }
});

client.login(token);