import cron from 'node-cron';
import { Client, GatewayIntentBits, ChannelType, TextChannel } from 'discord.js';
import dotenv from 'dotenv';
import { checkinCommand } from './commands/checkin';
import { leaderboardCommand } from './commands/leaderboard';
import './firebase/firebase';

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
  console.log(`🤖 Bot login as ${client.user?.tag}`);
  cron.schedule('* 2 * * *', async () => {    
    const channelId = '1389974799517880432'; // 🔁 ใส่ ID ของ channel ที่จะส่งข้อความ
    const channel = await client.channels.fetch(channelId);    
    (channel as TextChannel).send('@everyone 🌞 ทุกคนมาสวัสดีบาสด้วยครับ!');    
  });
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'checkin') {
    await checkinCommand(interaction);
  } else if (commandName === 'leaderboard') {
    await leaderboardCommand(interaction);
  } else if (commandName === 'สวัสดีบาส') {
    await checkinCommand(interaction);
  }
});

client.login(process.env.DISCORD_TOKEN);
