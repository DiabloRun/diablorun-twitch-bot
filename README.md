# diablorun-twitch-bot

## Setting up for development

Copy `.env.example` to `.env` and fill in a twitch username and password. You can remove or leave `CHANNELS` empty to use the list of channels that have opted in to use the DiabloRun bot. Alternatively, you can add comma-separated channel names that the bot will connect to.

Run `npm i` to install dependencies and `npm run dev` to start the bot in development mode.

## Defining commands

Commands are defined in `src/commands.ts` as async methods. The `CommandFunction` type shows what arguments the command method should accept: `client: Client, channel: string, tags: ChatUserstate, ...args: string[]`.

For example, a simple info command `!forge` to output simple text can be defined as follows:

```
const commands: Commands = {
  async forge(client, channel) {
    await client.say(channel, 'Up to Amn in normal, Sol to Um in nightmare and Hel to Gul in hell.');
  }
}
```

It is possible to define commands to accept any number of arguments. For example, `!test first second third` will call this method:

```
const commands: Commands = {
  async test(client, channel, _tags, a, b, c) {
    // a, b, c are strings with values "first", "second", "third" respectively
  }
}
```


The third argument contains info about the user that executed the command. This includes

```tags: { username: string, mod: boolean }```

and more, see `tmi.js` documentation for more information.
