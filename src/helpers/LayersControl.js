export default class LayersControl {
  onAdd(map) {
    this._map = map;
    this._jembatan = document.createElement("button");
    this._jembatan.className = "bg-[#AAA] font-bold";
    this._jembatan.textContent = "Jembatan";
    this._jembatan.addEventListener("click", () => {
      const jembatanVisibility = this._map.getLayoutProperty("jembatan-layer", "visibility");
      if (jembatanVisibility === "none") {
        this._map.setLayoutProperty("jembatan-layer", "visibility", "none");
        this._jembatan.className = "Jembatan";
      } else {
        this._map.setLayoutProperty("jembatan-layer", "visibility", "visible");
        this._jembatan.className = "bg-[#AAA] font-bold";
      }
    });
    this._jalan = document.createElement("button");
    this._jalan.className = "bg-[#AAA] font-bold";
    this._jalan.textContent = "Ruas Jalan";
    this._jalan.addEventListener("click", () => {
      const jalanVisibility = this._map.getLayoutProperty("jalan-layer", "visibility");
      if (jalanVisibility === "none") {
        this._map.setLayoutProperty("jalan-layer", "visibility", "none");
        this._jalan.className = "Jembatan";
      } else {
        this._map.setLayoutProperty("jalan-layer", "visibility", "visible");
        this._jalan.className = "bg-[#AAA] font-bold";
      }
    });
    this._container = document.createElement('div');
    this._container.className = 'mapboxgl-ctrl bg-white rounded-md border-black border-[1px]';
    this._container.appendChild(this._jembatan);
    this._container.appendChild(this._jalan);
    
    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}