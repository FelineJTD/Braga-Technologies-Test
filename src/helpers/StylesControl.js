export default class StylesControl {
  onAdd(map) {
    this._map = map;
    this._satellite = document.createElement("button");
    this._satellite.className = "bg-[#AAA] font-bold";
    this._satellite.disabled = true;
    this._satellite.textContent = "Satellite";
    this._satellite.addEventListener("click", () => {
      this._satellite.className = "bg-[#AAA] font-bold";
      this._roadmap.className = "satellite";
      this._satellite.disabled = true;
      this._roadmap.disabled = false;
      this._map.setStyle(
        {
          version: 8,
          sources: {
            basemap: {
              type: "raster",
              tiles: ["https://api.maptiler.com/maps/hybrid/256/{z}/{x}/{y}.jpg?key=49Mv4xVcjc0elsx4SmPM"],
              tileSize: 256
            }
          },
          layers: [
            {
              id: "basemap",
              type: "raster",
              source: "basemap",
              minzoom: 0,
              maxzoom: 20
            }
          ]
        }
      );
    });
    this._roadmap = document.createElement("button");
    this._roadmap.className = "roadmap";
    this._roadmap.textContent = "Roadmap";
    this._roadmap.addEventListener("click", () => {
      this._roadmap.className = "bg-[#DDD] font-bold";
      this._satellite.className = "satellite";
      this._roadmap.disabled = true;
      this._satellite.disabled = false;
      this._map.setStyle(
        {
          version: 8,
          sources: {
            basemap: {
              type: "raster",
              tiles: ["https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=49Mv4xVcjc0elsx4SmPM"],
              tileSize: 256
            }
          },
          layers: [
            {
              id: "basemap",
              type: "raster",
              source: "basemap",
              minzoom: 0,
              maxzoom: 20
            }
          ]
        }
      );
    });
    this._container = document.createElement('div');
    this._container.className = 'mapboxgl-ctrl bg-white rounded-md border-black border-[1px]';
    this._container.appendChild(this._satellite);
    this._container.appendChild(this._roadmap);
    
    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}