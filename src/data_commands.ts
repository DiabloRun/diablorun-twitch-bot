import { runewords, recipes } from '@diablorun/diablorun-data';
import { CommandFunction, Commands } from './tmi_client';

function getDataCommand(output: string): CommandFunction {
    return async function (client, channel) {
        await client.say(channel, output);
    }
}

export function getRunewordCommands(): Commands {
    const commands: Commands = {};

    for (const name in runewords) {
        commands[name.toLowerCase()] = getDataCommand(`${name}: ${runewords[name]}`);
    }

    return commands;
}

export function getRecipeCommands(): Commands {
    const commands: Commands = {};

    for (const name in recipes) {
        commands[name.toLowerCase()] = getDataCommand(`${name}: ${recipes[name]}`);
    }

    return commands;
}

