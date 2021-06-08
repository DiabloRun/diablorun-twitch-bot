import { runewords, recipes } from '@diablorun/diablorun-data';
import { CommandFunction, Commands } from './types';

/**
 * Handles the commands based in diablorun-data static files
 */
class DataCommands {
    /**
     * Creates the runeword commands for the bot
     * @returns The runeword commands
     */
    public getRunewordCommands = (): Commands => {
        const commands: Commands = {};

        for (const name in runewords) {
            commands[name.toLowerCase()] = this.getDataCommand(`${name}: ${runewords[name]}`);
        }

        return commands;
    }

    /**
     * Creates the recipes commands for the bot
     * @returns The recipes commands
     */
    public getRecipeCommands = (): Commands => {
        const commands: Commands = {};

        for (const name in recipes) {
            commands[name.toLowerCase()] = this.getDataCommand(`${name}: ${recipes[name]}`);
        }

        return commands;
    }

    /**
     * 
     * @param output 
     * @returns 
     */
    private getDataCommand = (output: string): CommandFunction => {
        return async function (client, channel) {
            await client.say(channel, output);
        }
    }
}

export const dataCommands = new DataCommands();