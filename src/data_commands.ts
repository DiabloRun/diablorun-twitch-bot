import { fbr, fcr, fhr, runewords, recipes } from '@diablorun/diablorun-data';
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
     * Builds the commands for FBR based on the data
     * @returns The commands for FBR
     */
    public getFasterBlockRateCommands(): Commands {
        return this.addCommandWithCommandItselfCheck(fbr, 'fbr');
    }

    /**
     * Builds the commands for FCR based on the data
     * @returns The commands for FCR
     */
    public getFasterCastRateCommands(): Commands {
        return this.addCommandWithCommandItselfCheck(fcr, 'fcr');
    }

    /**
     * Builds the commands for FHR based on the data
     * @returns The commands for FHR
     */
    public getFasterHitRecoveryCommands(): Commands {
        return this.addCommandWithCommandItselfCheck(fhr, 'fhr');
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

    /**
     * This is a helper method to create commands where for instance, one of the commands it is the command name itself.
     * Normally we just get the string directly, but in this case the command strings are built dynamically.
     * Example: !fbr => valid command, but so is !fbr barbarian.
     * @param dataCommands The commands that needs to be parsed and created
     * @param commandName The base of the command we are adding
     * @returns Commands dictionary ready to be added to the execution
     */
    private addCommandWithCommandItselfCheck(dataCommands: { [name: string]: string; }, commandName: string): Commands {
        const commands: Commands = {};
        let commandItselfAdded = false; // just to speed up if check
    
        for (const name in dataCommands) {
            if (!commandItselfAdded && name === commandName) {
                commands[commandName] = this.getDataCommand(`${dataCommands[commandName]}`);
                commandItselfAdded = true;
                continue;
            }
    
            commands[`${commandName} ${name.toLowerCase()}`.trimEnd()] = this.getDataCommand(`${dataCommands[name]}`);
        }
    
        return commands;
    }
}

export const dataCommands = new DataCommands();
