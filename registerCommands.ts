import { CommandInteraction, REST, Routes, SlashCommandBuilder, TextDisplayBuilder } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const commands = [
  new SlashCommandBuilder().setName('checkin').setDescription('เช็กชื่อประจำวัน'),
  new SlashCommandBuilder().setName('leaderboard').setDescription('ดูอันดับคะแนน'),  
  new SlashCommandBuilder().setName('tded').setDescription('เพื่อดูทีเด็ด')
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
