import { CommandInteraction, REST, Routes, SlashCommandBuilder, TextDisplayBuilder } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const commands = [
  new SlashCommandBuilder().setName('checkin').setDescription('เช็กชื่อประจำวัน'),
  new SlashCommandBuilder().setName('leaderboard').setDescription('ดูอันดับคะแนน'),  
  new SlashCommandBuilder().setName('tded').setDescription('เพื่อดูทีเด็ด'),
  new SlashCommandBuilder()
  .setName('รวมพลัง')
  .setDescription('รวมพลังโอนเงินเข้าบัญชีที่ระบุ')
  .addStringOption(option =>
    option.setName('เลขบัญชี')
      .setDescription('เลขบัญชีที่ต้องการให้โอนเข้า')
      .setRequired(true)
  )
  .addIntegerOption(option =>
    option.setName('จำนวนเงิน')
      .setDescription('จำนวนเงินที่ให้โอน')
      .setRequired(true)
  )
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN!);

(async () => {
  try {
    console.log('📡 Registering commands...');
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID!),
      { body: commands }
    );
    console.log('✅ Commands registered!');
  } catch (err) {
    console.error('❌ Error registering commands:', err);
  }
})();
