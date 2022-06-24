import { useEffect } from "react"
import maplibre from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import './App.css'
import Navbar from './components/Navbar'
import FadeInSection from "./components/FadeInSection/FadeInSection"
import UseCaseCard from "./components/UseCaseCard"
import IndustryCarousel from "./components/IndustryCarousel"
import ProductCard from "./components/ProductCard";

function App() {
  const mapCenter = {lon: 107.62799384411801, lat: -6.904165066892825};
  // maplibre
  useEffect(() => {
    // initialize the map
    const map = new maplibre.Map({
      container: "map",
      center: mapCenter,
      zoom: 12,
      scrollZoom: false,
      style: {
        version: 8,
        sources: {
          basemap: {
            type: "raster",
            tiles: ["	https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
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
    });

    // this is required
    map.addControl(
      new maplibre.AttributionControl({
        customAttribution:
          '<a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors</a>'
      })
    );

    // add controls

    // fullscreen control
    map.addControl(new maplibre.FullscreenControl(), "top-right");

    // zoom in/out control; disable compass tool here (this does pitch/bearing reset on the map)
    map.addControl(
      new maplibre.NavigationControl({
        showCompass: false
      }),
      "bottom-right"
    );

    // geolocate control; lets user find themselves with click of a button
    map.addControl(
      new maplibre.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      }),
      "bottom-right"
    );
  }, []);

  return (
    <div>
      <Navbar />
      <main className="pt-12 px-[5%] 2xl:px-[10%]">
        <section className="min-h-screen">
          <div className="w-full lg:w-[67%] 2xl:w-[50%]">
            <p className="mb-4">Braga Geodashboard</p>
            <h1>Explore the city <br className="hidden md:block" />on a human scale</h1>
            <p>Analyze existing site conditions, measure key urban indicators, and perform spatial analysis &mdash; directly in the browser.</p>
          </div>
          <div className="flex justify-start my-10">
            <button className="bg-black text-white mr-6 hover:bg-blue">Product Demo</button>
            <button className="bg-transparent border-2 border-black text-black hover:bg-blue hover:border-blue hover:text-white">Download Guidebook</button>
          </div>
          <div id="map" className="h-[50vh] w-full rounded-md border-2 border-black border-opacity-25" />
        </section>
        <section>
          <div className="w-full lg:w-[67%] 2xl:w-[50%]">
            <FadeInSection>
              <p className="mb-4 mt-6">Braga Geodashboard</p>
              <h2>Move from seeing where <br className="hidden md:block" />to understanding why</h2>
              <p>Analyze existing site conditions, measure key urban indicators, and perform spatial analysis &mdash; directly in the browser.</p>
            </FadeInSection>
            <FadeInSection className="my-24">
              <h3>
                Do your research with an urban analysis tool designed for discoveries. Use a single, powerful, interactive interface and explore location insights faster than ever.
              </h3>
            </FadeInSection>
            <FadeInSection className="mb-12">
              <h4>How It Works</h4>
              <p>Braga's Location Intelligence platform allows organizations to store, enrich, analyze & visualize their data to make spatially-aware decisions.
              </p>
            </FadeInSection>
            <FadeInSection className="mb-12">
              <h4>Research</h4>
              <p>Ensure your insights make an impact with rich photo and video data.</p>
            </FadeInSection>
            <FadeInSection className="mb-12">
              <h4>Insight</h4>
              <p>Empower anyone in your org to conduct, engage with, and be inspired by user insights.</p>
            </FadeInSection>
          </div>
        </section>
        <section>
          <FadeInSection className="my-24">
            <h4>Range of Industry</h4>
            <p>Morphocode Explorer helps planners, businesses, and cities do more with data.</p>
            <IndustryCarousel content={["Healthcare", "Transport and Logistics", "Defense", "Cities and Government", "Communication Tech", "Oil, Gas, and Mining"]} toRight={true} />
            <IndustryCarousel content={["Engineering", "Commercial and Retail", "Tourism and Leisure", "Real Estate", "Task Force", "IoT Management"]} toRight={false} />
          </FadeInSection>
          <FadeInSection className="my-24">
            <h4>Consumer Story</h4>
            <p>Innovative partners that surface insights with Braga Technologies</p>
            <div className="flex overflow-x-scroll">
              <UseCaseCard 
                no={1} 
                title="Accelerating Agricultural Sustainability" 
                desc="Disbun relies on Braga to turn complex geospatial information on agricultural trends into insights, supporting its mission to help farmers sustainably feed the planet." 
              />
              <UseCaseCard 
                no={2} 
                title="Mitigation Plan to Save Lives" 
                desc="Disbun relies on Braga to turn complex geospatial information on agricultural trends into insights, supporting its mission to help farmers sustainably feed the planet." 
              />
            </div>
          </FadeInSection>
          <FadeInSection className="w-full lg:w-[67%] xl:w-[50%] mb-24">
            <h3>
              Do your research with an urban analysis tool designed for discoveries. Use a single, powerful, interactive interface and explore location insights faster than ever.
            </h3>
          </FadeInSection>
          <FadeInSection>
            <div className="flex justify-start">
              <ProductCard 
                type="2D Geodashboard" 
                title="BIG GeoDashboard" 
                desc="Designed for task force management and POI data collection" 
              />
              <ProductCard 
                type="2D Geodashboard" 
                title="Disbun" 
                desc="Designed for task force management and POI data collection" 
              />
            </div>
          </FadeInSection>
        </section>
      </main>
      <footer className="border-t-2 border-black border-opacity-25 w-full pt-12 pb-6 px-[5%] 2xl:px-[10%]">
        <h2>Get started today</h2>
        <p>Find out how you can maximize the value from data and strengthen your decision making</p>
        <div className="flex justify-start my-10">
          <button className="bg-black text-white mr-6 hover:bg-blue">Contact Us</button>
          <button className="bg-black text-white mr-6 hover:bg-blue">How We Work</button>
        </div>
      </footer>
    </div>
  )
}

export default App
