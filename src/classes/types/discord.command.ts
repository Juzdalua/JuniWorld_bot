import { ChatInputCommandInteraction, CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { DiscordJSCommandBuilder } from './discord.types';

export const commands: Array<DiscordJSCommandBuilder> = [
  {
    data: new SlashCommandBuilder().setName('ping').setDescription('PING - PONG'),
    execute: async (interaction: CommandInteraction) => {
      await interaction.reply('pong');
    }
  },
  {
    data: new SlashCommandBuilder().setName('이호근').setDescription('제프'),
    execute: async (interaction) => {
      await interaction.reply({
        embeds: [
          {
            title: 'TEST EM',
            description: 'TTTT',
            color: 0x5865f2,
            image: {
              url: 'https://c.tenor.com/-_VCzW__yRcAAAAC/tenor.gif'
            }
          }
        ]
      });
    }
  }
];

export const commandMap = async (interaction: ChatInputCommandInteraction) => {
  const command = commands.find((cmd: DiscordJSCommandBuilder) => cmd.data.name == interaction.commandName);
  if (!command) return;

  await command.execute(interaction);
};
