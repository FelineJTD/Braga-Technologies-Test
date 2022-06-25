import { useEffect, useState } from "react"
import maplibre from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import './App.css'
import Navbar from './components/Navbar'
import FadeInSection from "./components/FadeInSection/FadeInSection"
import UseCaseCard from "./components/UseCaseCard"
import IndustryCarousel from "./components/IndustryCarousel"
import ProductCard from "./components/ProductCard";

import logo1 from "./assets/images/partner-logos/logo1.svg";
import logo2 from "./assets/images/partner-logos/logo2.svg";
import logo3 from "./assets/images/partner-logos/logo3.svg";

import { loadAnimation } from "lottie-web";
import { defineLordIconElement } from "lord-icon-element";

// register lottie and define custom element
defineLordIconElement(loadAnimation);

function App() {
  const mapCenter = {lon: 107.62799384411801, lat: -6.904165066892825};
  const partnerLogos = [logo1, logo2, logo3, logo1, logo3];

  const pathToProductImages = "../src/assets/images/products-photos/";
  const productImages = ["product1.jpg", "product2.jpg", "product3.jpg", "product4.jpg"];

  const industryContentTop = ["Healthcare", "Transport and Logistics", "Defense", "Cities and Government", "Communication Tech", "Oil, Gas, and Mining"];
  const industryImageTop = ["healthcare.json", "logistics.json", "defense.json", "city.json", "communication.json", "mining.json"];
  const industryContentBottom = ["Engineering", "Commercial and Retail", "Tourism and Leisure", "Real Estate", "Task Force", "IoT Management"];
  const industryImageBottom = ["engineering.json", "retail.json", "leisure.json", "real-estate.json", "task-force.json", "iot.json"];

  /*
  This is an example snippet - you should consider tailoring it
  to your service.
  */

  async function fetchGraphQL(operationsDoc, operationName, variables) {
    const result = await fetch(
      "https://sipjatan.com/hasura/v1/graphql",
      {
        method: "POST",
        body: JSON.stringify({
          query: operationsDoc,
          variables: variables,
          operationName: operationName
        })
      }
    );

    return await result.json();
  }

  const operationsDoc = `
    query MyQuery {
      jembatan {
        image_url
        lebar
        nama_jembatan
        panjang
        geom
      }
    }
  `;

  function fetchMyQuery() {
    return fetchGraphQL(
      operationsDoc,
      "MyQuery",
      {}
    );
  }

  async function startFetchMyQuery() {
    const { errors, data } = await fetchMyQuery();

    if (errors) {
      // handle those errors like a pro
      console.error(errors);
    }

    // do something great with this precious data
    console.log(data);
  }

  startFetchMyQuery();

  // maplibre
  useEffect(() => {
    // initialize the map
    const map = new maplibre.Map({
      container: "map",
      center: mapCenter,
      zoom: 12,
      scrollZoom: false,
      minZoom: 0,
      maxZoom: 20,
      style: 
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
      
    }, []);
    

    // this is required
    // map.addControl(
    //   new maplibre.AttributionControl({
    //     customAttribution:
    //       '<a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors</a>'
    //   })
    // );

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

    // Control implemented as ES6 class
    class StylesControl {
      onAdd(map) {
        this._map = map;
        this._satellite = document.createElement("button");
        this._satellite.className = "satellite";
        this._satellite.textContent = "Satellite";
        this._satellite.addEventListener("click", () => {
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

    // add control to map
    map.addControl(new StylesControl(), "bottom-left");

  }, []);

  return (
    <div>
      <Navbar />
      <main className="pt-12 px-[5%] 2xl:px-[10%]">
        <section className="min-h-screen">
          <div className="w-full lg:w-[67%] 2xl:w-[50%]">
            {/* <img src="../src/assets/images/braga-logo.svg" alt="" className="absolute -right-96 -top-96 w-[60rem] opacity-25 animate-spin" /> */}
            <p className="mb-4">Braga Geodashboard</p>
            <h1>Explore the city <br className="hidden md:block" />on a human scale</h1>
            <p>Analyze existing site conditions, measure key urban indicators, and perform spatial analysis &mdash; directly in the browser.</p>
          </div>
          <div className="flex justify-start my-10">
            <button className="bg-black text-white mr-6 hover:bg-blue">Product Demo</button>
            <button className="bg-transparent border-2 border-black text-black hover:bg-blue hover:border-blue hover:text-white">Download Guidebook</button>
          </div>
          <div id="map" className="h-[50vh] w-full rounded-md border-2 border-black border-opacity-25" />
          <div className="flex justify-start items-center mt-3 mb-24">
            { partnerLogos.map((logo, index) => (
              <img key={index} src={logo} alt={logo} className="h-full mr-6" />
            ))}
          </div>
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
            <IndustryCarousel content={industryContentTop} icons={industryImageTop} toRight={true} />
            <IndustryCarousel content={industryContentBottom} icons={industryImageBottom} toRight={false} />
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
          <FadeInSection className="w-full lg:w-[67%] xl:w-[50%] mb-20">
            <h3>
              Do your research with an urban analysis tool designed for discoveries. Use a single, powerful, interactive interface and explore location insights faster than ever.
            </h3>
          </FadeInSection>
          <FadeInSection>
            <div className="flex flex-col md:flex-row w-full justify-start pt-3 overflow-x-hidden md:overflow-x-auto mb-24">
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
