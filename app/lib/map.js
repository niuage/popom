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

    return window.btoa(this.mapData);
  }
}

export { Map }
