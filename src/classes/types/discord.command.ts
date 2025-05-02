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
  },
  {
    data: new SlashCommandBuilder()
      .setName('fow')
      .setDescription('for.kr 전적검색')
      .addStringOption((option) => option.setName('소환사명').setDescription('검색할 소환사명').setRequired(true)) as SlashCommandBuilder,
    execute: async (interaction: ChatInputCommandInteraction) => {
      const rowQuery = interaction.options.getString('소환사명');
      let query = rowQuery;

      if (query.length == 2) {
        query = `${query[0]}+${query[1]}`;
      }

      query = query.trim().replace(/\s+/g, '+');
      query = query.replace('#', '-');

      await interaction.reply({
        embeds: [
          {
            title: `for.lol 전적검색: ${rowQuery}`,
            description: `${query}`,
            url: `https://www.fow.lol/find/kr/${query}`,
            image: { url: `https://www.fow.lol/find/kr/${query}` }
          }
        ]
      });
    }
  },
  {
    data: new SlashCommandBuilder()
      .setName('opgg')
      .setDescription('op.gg 전적검색')
      .addStringOption((option) => option.setName('소환사명').setDescription('검색할 소환사명').setRequired(true)) as SlashCommandBuilder,
    execute: async (interaction: ChatInputCommandInteraction) => {
      const rowQuery = interaction.options.getString('소환사명');
      let query = rowQuery;

      if (query.length == 2) {
        query = `${query[0]}+${query[1]}`;
      }

      query = query.trim().replace(/\s+/g, '+');
      query = query.replace('#', '-');

      await interaction.reply({
        embeds: [
          {
            title: `op.gg 전적검색: ${rowQuery}`,
            description: `${query}`,
            url: `https://op.gg/ko/lol/summoners/kr/${query}`,
            image: { url: `https://op.gg/ko/lol/summoners/kr/${query}` }
          }
        ]
      });
    }
  }
];

export const commandMap = async (interaction: ChatInputCommandInteraction) => {
  try {
    const command = commands.find((cmd: DiscordJSCommandBuilder) => cmd.data.name == interaction.commandName);
    if (!command) return;

    await command.execute(interaction);
  } catch (error) {
    console.error(error);
  }
};
