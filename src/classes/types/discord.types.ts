import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

export interface DiscordJSCommand {
  name: string;
  description: string;
}

export interface DiscordJSCommandBuilder {
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => Promise<void>;
}
