'use strict';

class Map {
  constructor(mapData) {
    this.mapData = mapData;
    console.log this.mapData;
  }

  isValid() {
    if (!this.mapData) { return false; } 
    
    return(
      this.mapData.includes("Rarity:") &&
      this.mapData.includes("Travel to this Map")
    )
  }

  encode() {
    if (!this.isValid()) { return null; }

    var encoded_map = window.btoa(this.mapData);
    console.log("encoded map: ", encoded_map);
    return encoded_map;
  }
}

export { Map }
