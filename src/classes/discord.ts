import { Client, REST, Routes, Events, SlashCommandBuilder, Interaction, CacheType, ChatInputCommandInteraction, RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord.js';
import { DiscordJSCommand, DiscordJSCommandBuilder } from './types/discord.types';
import { Logger } from '@nestjs/common';
import { commandMap, commands } from './types/discord.command';

export class DiscordJS {
  private readonly logger = new Logger(DiscordJS.name);
  private DISCORD_BOT_TOKEN: string;
  private DISCORD_GUILD_ID: string;
  private DISCORD_CLIENT_ID: string;

  public static instance: DiscordJS;

  private client: Client;
  private rest: REST;
  private commands: Array<RESTPostAPIChatInputApplicationCommandsJSONBody>;

  constructor() {
    this.DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
    this.DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID;
    this.DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;

    this.client = new Client({ intents: ['Guilds', 'GuildMessages'] });

    this.rest = new REST({ version: '10' }).setToken(this.DISCORD_BOT_TOKEN);

    this.commands = commands.map((cmd) => cmd.data.toJSON());
    this.addCommands();
  }

  public static getInstance(): DiscordJS {
    if (!this.instance) {
      this.instance = new DiscordJS();
    }

    return this.instance;
  }

  public async init() {
    if (!(await this.addCommands())) {
      return;
    }

    this.client.once(Events.ClientReady, (readyClient: Client) => {
      this.logger.debug(`🚀 READY ${readyClient.user.tag}`);
    });

    this.client.on(Events.InteractionCreate, async (interaction: Interaction<CacheType>) => {
      if (!interaction.isChatInputCommand()) {
        this.logger.warn('error');
        return;
      }

      commandMap(interaction);
    });

    await this.client.login(this.DISCORD_BOT_TOKEN);
  }

  private async addCommands(): Promise<boolean> {
    try {
      await this.rest.put(Routes.applicationGuildCommands(this.DISCORD_CLIENT_ID, this.DISCORD_GUILD_ID), { body: this.commands });
      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }
}
