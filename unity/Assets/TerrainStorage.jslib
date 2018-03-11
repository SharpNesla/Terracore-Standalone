mergeInto(LibraryManager.library, {
  ExecuteTerracoreAsyncCode: function (index, xPos, yPos, resolution) {
    window.dispatchEvent(new CustomEvent('terracore-async-code-event',
      {'detail': {index: index, xPos: xPos, yPos: yPos, resolution: resolution}}));
  },
  InitTerrainStorages: function (amount) {
    TerrainStorages = new Array(amount)
  },
  InitTerrainStorage: function (index, heights, heightsLength, splatmaps, splatmapsLength, detailPrototypesCount) {
    TerrainStorages[index] = {
      Heights: new Float32Array(buffer, heights, heightsLength),
      SplatMaps: new Float32Array(buffer, splatmaps, splatmapsLength),
      DetailLayers: new Array(detailPrototypesCount),
      TreeInstances: {
        Instances: []
      }
    }
  },
  InitTerrainStorageDetailsMap: function (index, detailLayerId, layer, layerLength) {
    TerrainStorages[index].DetailLayers[detailLayerId] = new Float32Array(buffer, layer, layerLength)
  }
});