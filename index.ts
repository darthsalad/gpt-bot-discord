// console.log("testing")
import { Client, GatewayIntentBits, REST, Routes } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const TOKEN = process.env.DISCORD_BOT_TOKEN;

const commands = [
    {
        name: "ping",
        description: "Replies with pong",
    },
];

const registerCommands = async () => {
    const rest = new REST({ version: "10" }).setToken(TOKEN!);

    try {
        console.log("Started refreshing application (/) commands.");
        await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID!), {
            body: commands,
        });
        console.log("Successfully reloaded application (/) commands.");
    } catch (err) {
        console.error(err);
    }
};

const main = async () => {
    await registerCommands();

    const client = new Client({
        intents: [GatewayIntentBits.Guilds],
    });

    client.on("ready", () => {
        console.log(`Logged in as ${client.user!.tag}`);
    });

    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName === "ping") {
            await interaction.reply("pong");
        }
    });

    client.login(TOKEN);
};

main();
