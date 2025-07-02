import { ChatInputCommandInteraction, ChannelType, TextChannel } from 'discord.js';
import { db } from '../firebase/firebase';
import { isToday } from '../utils/date';

export async function checkinCommand(interaction: ChatInputCommandInteraction) {
  try {
    await interaction.deferReply({ ephemeral: true });  // แจ้ง Discord ว่าตอบช้า

    const userId = interaction.user.id;
    const userRef = db.collection('users').doc(userId);
    const now = new Date().toISOString();

    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      await userRef.set({ points: 1, lastCheckin: now });

      // ส่งข้อความในช่องแชท (public)
      if (interaction.channel?.type === ChannelType.GuildText) {
        const textChannel = interaction.channel as TextChannel;
        await textChannel.send(`<@${interaction.user.id}> สวัสดีบาสแล้ว รับไป 1 แต้ม !`);
      } else {
        await interaction.editReply('❌ บาสไม่ให้ส่ง');
      }

      // ตอบ interaction แบบส่วนตัว
      await interaction.editReply('✅ เช็กชื่อสำเร็จ! รับ 1 แต้มแล้ว 🎉');
      return;
    }

    const data = userDoc.data();

    if (data && isToday(data.lastCheckin)) {
      await interaction.editReply('❌ หวัดดีบาสไปแล้วยังหวัดดีซ้ำเดะโดนบาสด่าหรอก !');
      return;
    }

    await userRef.update({
      points: (data?.points || 0) + 1,
      lastCheckin: now,
    });

    // ส่งข้อความในช่องแชท (public)
    if (interaction.channel?.type === ChannelType.GuildText) {
      const textChannel = interaction.channel as TextChannel;
      await textChannel.send(`<@${interaction.user.id}> สวัสดีบาสแล้ว รับไป 1 แต้ม !`);
    } else {
      await interaction.editReply('❌ บาสไม่ให้ส่ง');
    }

    await interaction.editReply('✅ เช็กชื่อสำเร็จ! รับ 1 แต้มแล้ว 🎉');

  } catch (error) {
    console.error('Error checkinCommand:', error);
    if (interaction.deferred || interaction.replied) {
      await interaction.followUp({ content: '❌ เกิดข้อผิดพลาดในการเช็กชื่อ โปรดลองอีกครั้ง', ephemeral: true });
    } else {
      await interaction.reply({ content: '❌ เกิดข้อผิดพลาดในการเช็กชื่อ โปรดลองอีกครั้ง', ephemeral: true });
    }
  }
}
