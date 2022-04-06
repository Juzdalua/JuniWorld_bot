import { Controller, Get, Param, Query, Redirect } from '@nestjs/common';

@Controller('discord')
export class DiscordController {

    @Get("/oauth2")
    @Redirect()
    getOauthDiscord(){
        const url = process.env.DISCORD_OAUTH_URL;
        return {            
            url: `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_ID}&permissions=414464731200&redirect_uri=${encodeURI(String(process.env.DISCORD_REDIRECT_ADD_BOT))}&response_type=code&scope=identify%20guilds%20bot%20applications.commands`
        }
    }

    @Get("/oauth2/bot")
    getOauthDiscordInfo(@Query() query:any){
        const { code, guild_id, permissions } = query
        console.log(code, guild_id, permissions)
        return "hi";
    }
    
}
