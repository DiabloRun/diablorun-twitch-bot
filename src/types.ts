import * as tmi from 'tmi.js'

export type Client = tmi.Client;
export type CommandFunction = (client: Client, channel: string, tags: tmi.ChatUserstate, ...args: string[]) => Promise<any>;
export type CommandFunction2 = (channel: string, tags: tmi.ChatUserstate, ...args: string[]) => Promise<any>;
export type Commands = { [command: string]: CommandFunction };

export interface Usernames {
    user_name: string;
}
