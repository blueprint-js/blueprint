import { Client } from "discord.js-light";

export class Blueprint<T> {
    protected client: Client;

    /**
     * Creates a new Blueprint instance.
     * @param client
     */
    constructor(client: Client) {
        this.client = client;
    }

    /**
     * Starts the bot and connects to the gateway.
     */
    public async connect() {
        await this.client.login('');
    }

    public disconnect() {
        this.client.destroy();
    }
}
