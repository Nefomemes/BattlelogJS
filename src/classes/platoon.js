const utils = require("../utils/utils");
/**
 * Represents a Platoon
 * 
 * @class
 */
class Platoon {


	#badgePathRaw;
	/**
	 * Creates a new Platoon instance.
	 * 
	 * @constructor
	 * @param {GameClient} client 
	 * @param {object} data 
	 */
	constructor(client, data){
	if(data){
	this.structureData(data);
	}
		}
	/**
	 * Structure the class using the data provided. 
   *
	 * @param {object} data - The data used to structure the class  
	 * @returns {User} the User
	 */
	structureData(data){
		utils.structureData(this, data, {blacklist: ['badgePath']});

		/**
		 * @typedef
		 */
		this.badge = {};
		
		var badgeUrl1 = data.badgePath.split("[FORMAT]").join("png").split("[SIZE]");
		
		badge[60] = badgeUrl1.join('60');
		badge[320] = badgeUrl1.join('320');
		
	}

	
	async fetch(){
		const res = await this.client.axios.get(`/platoon/${this.id}/`);

		this.structureData(res.context.platoon);

		this.isFan = res.context.isFan;
	}
}

module.exports.Platoon = Platoon;