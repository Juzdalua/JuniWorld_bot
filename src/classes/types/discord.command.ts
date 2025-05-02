import { SlashCommandBuilder } from 'discord.js';

const commands: Array<SlashCommandBuilder> = [
  new SlashCommandBuilder().setName('ping').setDescription('PING - PONG'),
  new SlashCommandBuilder().setName('test').setDescription('TEST'),
  new SlashCommandBuilder().setName('hi').setDescription('HI MSG')
];

export default commands;
