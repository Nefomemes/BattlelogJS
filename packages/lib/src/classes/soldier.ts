import * as utils from "../utils";
import { User } from "./user";
import type { GameClient } from "./gameclient";
import { UserPropType } from "../types/userprop";
/*
"picture": "bf3-us-recon",
          "userId": "3307924356088947575",
          "user": null,
          "updatedAt": 1607031181,
          "firstPartyId": "",
          "personaId": "1005012929719",
          "personaName": "Nefomemes",
          "gamesLegacy": "0",
          "namespace": "cem_ea_id",
          "gamesJson": "{\"1\":\"2\"}",
          "games": {
            "1": "2"
          },
          "clanTag": "BLTH"

*/
export type PersonaType = {
  personaId: string;
  picture: string;
  user: User;
  userId: string;
  updatedAt: number;
  personaName: string;
  clanTag: string;
};

export type BitPlatform = 1 | 2 | 4 | 8 | 16 | 32 | 64;
export type BitGame =
  | 1
  | 2
  | 4
  | 8
  | 16
  | 32
  | 64
  | 128
  | 256
  | 512
  | 1024
  | 2048
  | 4096
  | 8192;

/**
 * Represents a Battlelog soldier.
 *
 */

export class Soldier {
  /**
   * The user of this soldier.
   */
  user!: User;
  client!: GameClient;
  platform!: BitPlatform;
  game!: BitGame;
  /**
   * How many coop missions have been completed with the soldier.
   */
  coopLevelsTaken!: number;
  /**
   *  The persona of this soldier.
   */
  persona!: PersonaType;
  /**
   * @typedef {object} SoldierStats
   * @property {number} coopMissionsFinished - How many coop missions have the
   * soldier finished
   * @property {number} coopUnlocks - How many unlockable weapons have the
   * soldier unlocked by playing coop missions
   * @property {number} rank - The soldier's rank
   * @property {number} revives - How many revives the soldier have done
   * @property {number} kills - How many kills the soldier have
   * @property {number} wins - How many matches the soldier have won
   * @property {number} dogtagsCollected - How many dogtags have the soldier
   * collected. Usually when killing an enemy with a knife
   * @property {number} assists - How many kill assists the soldier have
   * @property {number} repairs - How many repairs the soldier have done when
   * using the engineer class
   * @property {number} deaths - How many times the soldiers have died
   * @property {number} accuracy - The soldier's accuracy.
   */

  /**
   * The statistics of this soldier.
   *
   * @property {SoldierStats}
   */
  stats = {};

  /**
   * Creates a new Soldier instance
   *
   * @class
   * @param {User} user - The user of this soldier.
   * @param {object} [data] - The raw data object to be used to populate the
   *     instance.
   */

  constructor(client, data: Soldier, fetch?: boolean) {
    this.structureData(data, fetch);
    Object.defineProperties(this, {
      client: { value: client, enumerable: false }
    });
  }
  /**
   * Populate an object with a raw data object.
   *
   * @param {object} data - The raw data
   * @param {boolean} [fetch] - Whether the raw data is from a fetch function.
   * @returns {Soldier} - The soldier
   */
  structureData(data: Soldier, fetch?: boolean) {
    var rules: utils.StructureDataOptions = {
      blacklist: ["user"],
    };

    var soldierRootStats = [
      "timePlayed",
      "kills",
      "deaths",
      "npStatus",
      "legendaryLevel",
      "rsNumWins",
      "rank",
      "numLosses",
      "numWins",
      "skill",
      "score",
      "rsNumLosses",
    ];
    if (!fetch) {
      rules = {
        ...rules,
        blacklist: [...rules.blacklist, ...soldierRootStats],
      };
    }

    if (!this.user && data.user) {
      // @ts-ignore
      this.user = new User(this.client, { user: data.user });
    }
    utils.structureData(this, data, rules);

    utils.structureData(this.stats, data, {
      whitelist: soldierRootStats,
    });

    return this;
  }

  async fetch() {
    let url: string;
    switch (this.client.game) {
      case "bf4": {
        url = `/warsawoverviewpopulate/${this.persona.personaId}/1/`;
        break;
      }
      default: {
        url = `/overviewPopulateStats/${this.persona.personaId}/o/1/`;
      }
    }

    const res = await this.client.axios.get(url);

    utils.structureData(this.stats, res.data.data.overviewStats);
    return this;
  }
}
