import tmi from 'tmi.js'

export type Client = tmi.Client;
export type CommandFunction = (client: Client, channel: string, username?: string, ...args: string[]) => Promise<any>;
export type Commands = { [command: string]: CommandFunction };

let _tmiClient: Client;

export async function getTmiClient() {
  if (_tmiClient) {
    return _tmiClient;
  }

  _tmiClient = new tmi.Client({
    identity: {
      username: process.env.TWITCH_USERNAME,
      password: process.env.TWITCH_PASSWORD
    },
    connection: {
      reconnect: true
    }
  });

  await _tmiClient.connect();
  return _tmiClient;
}
