'use strict';

class Map {
  constructor(mapData) {
    this.mapData = mapData;
  }

  isValid() {
    return(
      this.mapData.includes("Rarity:") &&
      this.mapData.includes("Travel to this Map")
    )
  }

  encode() {
    if (!this.isValid()) { return null; }

    encoded_map = window.btoa(this.mapData);
    console.log("encoded map: ", encoded_map);
    return encoded_map;
  }
}

export { Map }
