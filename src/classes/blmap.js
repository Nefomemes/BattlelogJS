/**
 * Custom Map class for battlelog.js utilities.
 * 
 * @class
 * @extends Map
 */
class BattlelogMap extends Map {
    /**
     * If the key existed in the instance, calls
     * 
     * @function
     * @param {*} key 
     * @param {*} value 
     * @param {...*} structureDataStuff - The additional parameters to be passed to the key's structureData method. 
     */
    structureData(key, value, ...structureDataStuff){
        if(super.get(key)){
            super.get(key).structureData(value , ...structureDataStuff);
        } else {
                super.set(key, value);
        }
    }
}

module.exports.BattlelogMap = BattlelogMap;