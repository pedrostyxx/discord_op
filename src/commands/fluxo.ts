import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("fluxo")
  .setDescription("Envia embed de fluxo iniciado");

export async function execute(interaction: ChatInputCommandInteraction) {
  const embed = new EmbedBuilder()
    .setTitle("🚀 Fluxo Iniciado")
    .setDescription("Um usuário iniciou o fluxo com sucesso! ✅")
    .setColor(0x5865F2)
    .setFooter({ text: "Sistema de Notificações" })
    .setTimestamp();

  await interaction.reply({ content: "@everyone 🚨", embeds: [embed] });
}
