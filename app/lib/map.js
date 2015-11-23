'use strict';

class Map {
  constructor(mapData) {
    this.mapData = mapData;
  }

  isValid() {
    if (!this.mapData) { return false; }

    return(
      this.mapData.includes("Rarity:")
    )
  }

  encode() {
    if (!this.isValid()) { return null; }

    var encoded_map = window.btoa(this.mapData);
    return encoded_map;
  }
}

export { Map }
