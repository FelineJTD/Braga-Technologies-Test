import { useEffect, useState, useRef } from "react"

// Maplibre
import maplibre from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import StylesControl from "./helpers/StylesControl";
import LayersControl from "./helpers/LayersControl";

// Components
import Navbar from './components/Navbar'
import FadeInSection from "./components/FadeInSection/FadeInSection"
import UseCaseCard from "./components/UseCaseCard"
import IndustryCarousel from "./components/IndustryCarousel"
import ProductCard from "./components/ProductCard";

// Assets
import logo1 from "./assets/images/partner-logos/logo1.svg";
import logo2 from "./assets/images/partner-logos/logo2.svg";
import logo3 from "./assets/images/partner-logos/logo3.svg";
import logo from "./assets/images/braga-logo.svg";

// Icons
import { loadAnimation } from "lottie-web";
import { defineLordIconElement } from "lord-icon-element";
defineLordIconElement(loadAnimation);

function App() {
  // Data
  const [jembatanData, setJembatanData] = useState(null);
  const [jalanData, setJalanData] = useState(null);

  // Map
  const mapCenter = {lon: 107.62799384411801, lat: -6.904165066892825};
  const map = useRef(null);

  // Partner Logos
  const partnerLogos = [logo1, logo2, logo3, logo1, logo3];

  // Industry Carousel Data
  // The format is cursed, sorry
  const industryContentTop = ["Healthcare", "Transport and Logistics", "Defense", "Cities and Government", "Communication Tech", "Oil, Gas, and Mining"];
  const industryImageTop = ["healthcare.json", "logistics.json", "defense.json", "city.json", "communication.json", "mining.json"];
  const industryContentBottom = ["Engineering", "Commercial and Retail", "Tourism and Leisure", "Real Estate", "Task Force", "IoT Management"];
  const industryImageBottom = ["engineering.json", "retail.json", "leisure.json", "real-estate.json", "task-force.json", "iot.json"];

  // Fetch Map Data
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
    const { errors, data } = await result.json();
    if (errors) console.error(errors);
    return data;
  }

  // Query
  const Query = `
    query jembatanQuery {
      jembatan {
        geom
      }
    }
    query jalanQuery {
      ruas_jalan {
        geom
      }
    }
  `;

  // Function to Add Data to Map
  // Reference: https://codesandbox.io/s/ofk4g

  // Jalan Layer
  function addJalanLayer() {
    if (map.current.getLayer('jalan-layer')) return;
    map.current.addLayer({
      id: "jalan-layer",
      type: "line",
      paint: {
        // stylize the layer
        "line-color": "#3773CE",
        "line-width": 2
      },
      source: {
        // add data to the layer
        type: "geojson",
        data: 
        {
          type: "FeatureCollection",
          features: [
            // Data should have been cleaned beforehand and made into GeoJSON format but I'm running out of time so I'm using this codesandbox code
            ...Array(jalanData.ruas_jalan.length)
              .fill(0)
              .map((_x, i) => ({
                // feature for Mapbox DC
                type: "Feature",
                geometry: jalanData["ruas_jalan"][i]["geom"],
              }))
          ]
        }
      }
      
    });
    map.current.setLayoutProperty("jalan-layer", "visibility", "visible");
  }

  // Jembatan Layer
  function addJembatanLayer() {
    if (map.current.getLayer('jembatan-layer')) return;
    map.current.addLayer({
      id: "jembatan-layer",
      type: "circle",
      paint: {
        // stylize the layer
        "circle-radius": 6,
        "circle-color": "#d22",
        "circle-blur": 0.8
      },
      source: {
        // add data to the layer
        // this should be obtained from the API server
        type: "geojson",
        data: 
        {
          type: "FeatureCollection",
          features: [
            ...Array(jembatanData["jembatan"].length)
              .fill(0)
              .map((_x, i) => ({
                // feature for Mapbox DC
                type: "Feature",
                geometry: jembatanData["jembatan"][i]["geom"]
              }))
          ]
        }
      }
    });
    map.current.setLayoutProperty("jembatan-layer", "visibility", "visible");
  }

  // maplibre
  useEffect(() => {
    // Fetch Map Data
    fetchGraphQL(Query, "jembatanQuery", {}).then(setJembatanData);
    fetchGraphQL(Query, "jalanQuery", {}).then(setJalanData);

    if (map.current) return; // don't run if map already exists

    // Create Map
    map.current = new maplibre.Map({
      container: "map",
      center: mapCenter,
      zoom: 10,
      scrollZoom: false,
      minZoom: 0,
      maxZoom: 20,
      style: 
      // I have no idea what the difference is between this format and the one-link-only format, but I find that this one is faster in rendering
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
      
    });

    // Add Controls to Map

    // fullscreen control
    map.current.addControl(new maplibre.FullscreenControl(), "top-right");

    // zoom in/out control; disable compass tool here (this does pitch/bearing reset on the map)
    map.current.addControl(
      new maplibre.NavigationControl({
        showCompass: false
      }),
      "bottom-right"
    );

    // geolocate control; lets user find themselves with click of a button
    map.current.addControl(
      new maplibre.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      }),
      "bottom-right"
    );

    // add control to map
    map.current.addControl(new StylesControl(), "bottom-left");

    // add layers control to map
    map.current.addControl(new LayersControl(), "bottom-left");
  }, []);

  // Add data to map
  useEffect(() => {
    if (!(map.current && (jembatanData || jalanData))) return;

    // Attempt to clean data
    // let dataJembatan = jembatanData.jembatan;
    // dataJembatan = dataJembatan.map(item => {
    //   return {
    //     type: "Feature",
    //     geometry: {
    //       type: item.geom.type,
    //       coordinates: item.geom.coordinates,
    //     }
    //   }
    // });
    // console.log(dataJembatan);

    map.current.on("load", () => {
      if (jalanData) addJalanLayer(); 
      if (jembatanData) addJembatanLayer(); 
    });
    
    map.current.on('styledata', function () {
      // Triggered when `setStyle` is called.
      if (jalanData) addJalanLayer(); 
      if (jembatanData) addJembatanLayer(); 
    });
    
  }, [jembatanData, jalanData]);


  return (
    <div>
      <Navbar />
      <main>
        <section className="min-h-screen px-[5%] 2xl:px-[10%] border-b-2 border-black border-opacity-25 relative overflow-x-hidden pt-36">
        <div className="w-[45vw] h-[45vw] bg-blue opacity-10 rounded-full absolute blur-2xl -top-[15vw] -right-[10vw] z-0"/>
            <div className="w-[25vw] h-[25vw] bg-blue opacity-10 rounded-full absolute blur-2xl top-[15vw] -left-[10vw] z-0"/>
          <div className="w-full lg:w-[67%] 2xl:w-[50%] relative z-10">
            
            <p className="mb-4">Braga Geodashboard</p>
            <h1>Explore the city <br className="hidden md:block" />on a human scale</h1>
            <p>Analyze existing site conditions, measure key urban indicators, and perform spatial analysis &mdash; directly in the browser.</p>
          </div>
          <div className="flex justify-start my-10 relative z-10">
            <button className="bg-black text-white mr-6 hover:bg-blue">Product Demo</button>
            <button className="bg-transparent border-2 border-black text-black hover:bg-blue hover:border-blue hover:text-white">Download Guidebook</button>
          </div>
          <div id="map" className="flex items-center justify-center h-[50vh] w-full rounded-md border-2 border-black border-opacity-25 relative z-10 bg-black bg-opacity-25">
            <img src={logo} alt="Loading..." className="h-1/2 w-1/2 animate-pulse" />
          </div>
          <div className="flex justify-start items-center mt-3 mb-24">
            { partnerLogos.map((logo, index) => (
              <img key={index} src={logo} alt={logo} className="h-full mr-6" />
            ))}
          </div>
        </section>
        <section className="flex px-[5%] 2xl:px-[10%] pt-12 pb-12">
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
          <aside className="ml-24 py-10 hidden lg:block w-[33%] 2xl:w-1/2">
            <video preload="metadata" autoPlay muted loop playsInline className="w-full h-full object-cover rounded-xl"> 
             <source src="https://assets.mixkit.co/videos/download/mixkit-modern-house-on-the-beach-27543-medium.mp4" type="video/mp4" />
             Your browser does not support the video tag.
            </video>
          </aside>
        </section>
        <section>
          <FadeInSection className="py-12 px-[5%] 2xl:px-[10%] bg-black bg-opacity-10">
            <h2>Range of Industry</h2>
            <p>Morphocode Explorer helps planners, businesses, and cities do more with data.</p>
            <IndustryCarousel content={industryContentTop} icons={industryImageTop} toRight={true} />
            <IndustryCarousel content={industryContentBottom} icons={industryImageBottom} toRight={false} />
          </FadeInSection>
          <div className="py-24">
            <FadeInSection className="px-[5%] 2xl:px-[10%]">
              <h2>Consumer Story</h2>
              <p>Innovative partners that surface insights with Braga Technologies</p>
              <div className="flex overflow-x-auto">
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
          </div>
        </section>

        <section className="px-[5%] 2xl:px-[10%] pt-24 bg-black bg-opacity-10">
          <FadeInSection className="w-full lg:w-[67%] xl:w-[50%] pb-20">
            <h3>
              Do your research with an urban analysis tool designed for discoveries. Use a single, powerful, interactive interface and explore location insights faster than ever.
            </h3>
          </FadeInSection>
          <FadeInSection>
            <div className="flex flex-col md:flex-row w-full justify-start pt-3 overflow-x-hidden md:overflow-x-auto pb-24">
              <ProductCard 
                type="2D Geodashboard" 
                title="BIG GeoDashboard" 
                desc="Designed for task force management and POI data collection" 
                image="https://wp.technologyreview.com/wp-content/uploads/2019/01/mapillary-2-12.jpg"
              />
              <ProductCard 
                type="2D Geodashboard" 
                title="Disbun" 
                desc="Designed for task force management and POI data collection" 
                image="https://www.toronto.ca/wp-content/uploads/2017/10/9680-tomaps-870x338.png"
              />
            </div>
          </FadeInSection>
        </section>
      </main>
      <footer className="border-t-2 border-black border-opacity-25 w-full pt-12 pb-6 px-[5%] 2xl:px-[10%] bg-white">
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
