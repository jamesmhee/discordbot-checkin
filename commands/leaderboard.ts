import { ChatInputCommandInteraction } from 'discord.js';
import { db } from '../firebase/firebase';

export async function leaderboardCommand(interaction: ChatInputCommandInteraction) {
  const snapshot = await db.collection('users')
    .orderBy('points', 'desc')
    .limit(10)
    .get();

  let message = '** 🏆 อันดับคนที่สวัสดีบาส **\n';
  snapshot.docs.forEach((doc, i) => {
    message += `${i + 1}. <${doc.id}> - ${doc.data().points} แต้ม\n`;
  });

  await interaction.reply({ content: message, ephemeral: false });
}
