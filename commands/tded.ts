import { CommandInteraction } from "discord.js";

export const getTded = async (interaction: CommandInteraction) => {        
      await interaction.reply({ content: 'แมนยู 5 พัลลล', ephemeral: true, fetchReply: true });
}