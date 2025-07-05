import { ChatInputCommandInteraction } from "discord.js";

export const getPower = async (interaction: ChatInputCommandInteraction) => {
    const account = interaction.options.getString('เลขบัญชี'); // จาก SlashCommand option
    const amount = interaction.options.getInteger('จำนวนเงิน'); // จาก SlashCommand option

    await interaction.reply({
        content: `@everyone รวมพลังโอนมาคนละ 💸 **${amount?.toLocaleString()} บาท** เข้าบัญชี **${account}**`,
        allowedMentions: { parse: ['everyone'] }, // เพื่อให้ @everyone ทำงานจริง
        ephemeral: false, // เปลี่ยนเป็น true ถ้าไม่อยากให้ทุกคนเห็น
    });
}