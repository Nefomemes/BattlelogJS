import axios from "axios";
import type { AxiosInstance } from "axios";

import { CacheMap } from "./cachemap";
import { Profile, User } from "./user";
import { Server } from "./server";
import type { SupportedGames } from "../types/games";
import type { AxiosRequestConfig } from "axios";
import { Platoon } from "./platoon";
import type { BattlelogClient } from "./blclient";

/**
 *  Represents that /:game/ part. The main brain of everything.
 *
 * @class
 */
export class GameClient {
  game: SupportedGames;
  axios: AxiosInstance;
  /**
   * Creates a new GameClient instance.
   *
   * @class
   * @param client - The client of this instance.
   * @param  game - The game of this GameClient.
   * @param  [options] - The options used for this instance.
   */
  constructor(
    client: BattlelogClient,
    game: SupportedGames = "bf3",
    options: {
      axios?: AxiosRequestConfig;
    } = {}
  ) {
    if (!client) throw Error("The 'client' parameter is required. ");

    if (typeof options !== "object")
      throw Error("Parameter 'options' is required to be an object. ");

    if (typeof game !== "string")
      throw Error("Parameter 'game' is required to be a string.");
    game = <SupportedGames>game.toLowerCase();

    if (!["bf3", "bf4", "mohw", "bfh"].includes(game))
      throw Error("The game is not available in Battlelog.");

    this.game = game;
    /**
     *  @property {GameType} game - The game
     */

    Object.defineProperty(this, "client", { value: client, enumerable: false });

    if (!options.axios) options.axios = {};

    let instance = axios.create({
      ...options.axios,
      baseURL: `https://battlelog.battlefield.com/${this.game}`,
      headers: {
        ...(options.axios.headers || {}),
        "X-Requested-With": "XMLHttpRequest",
        "X-AjaxNavigation": "1",
      },
    });

    Object.defineProperty(this, "axios", {
      value: instance,
      enumerable: false,
    });
  }

  users = new CacheMap();
  servers = new CacheMap();
  platoons = new CacheMap();

  async fetchProfile(data: Profile | string): Promise<Profile> {
    let user = await new Profile(this, data).fetch();

    this.users.structureData(user.user.userId, user);
    return user;
  }

  async fetchProfileFromUser(data: User): Promise<Profile> {
  // @ts-expect-error
  return await this.fetchProfile({user: data});
  }

  async fetchPlatoon(data: Platoon | string): Promise<Platoon> {
    let platoon = await new Platoon(this, data).fetch();

    this.platoons.structureData(platoon.id, platoon);
    return platoon;
  }

  async fetchServers(): Promise<Map<string, Server>> {
    let res = await this.axios.get("/servers");
    this.servers.structureData(null, res.data.context.servers, {
      callbackKey: (k, v) => v.guid,
      callbackValue: (k, v) => new Server(this, v),
    });

    return this.servers;
  }

  async fetchServer(data: Server | string): Promise<Server> {
    let server = await new Server(this, data).fetch();
    this.servers.structureData(server.guid, server);

    return server;
  }
}
