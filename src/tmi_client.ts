import * as tmi from 'tmi.js'
import { Client } from './types';

/**
 * This class creates the twitch chat client and ensures it is a singleton
 */
class ClientSingleton {
  private _tmiClient!: Client;

  /**
   * Returns the twitch client - Singleton pattern
   * @returns Either the existing client or it instantiates a global client
   */
  public getTmiClient = async(): Promise<Client> => {
    if (this._tmiClient) {
      return this._tmiClient;
    }

    this._tmiClient = new tmi.Client({
      identity: {
        username: process.env.TWITCH_USERNAME,
        password: process.env.TWITCH_PASSWORD
      },
      connection: {
        reconnect: true
      }
    });

    await this._tmiClient.connect();

    return this._tmiClient;
  }
}

export const tmiClient = new ClientSingleton();
