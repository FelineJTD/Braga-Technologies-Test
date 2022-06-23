import { useState } from "react"
import logo from './logo.svg'
import './App.css'
import Navbar from './components/Navbar'
import FadeInSection from "./components/FadeInSection/FadeInSection"
import UseCaseCard from "./components/UseCaseCard"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar />
      <main className="pt-12 px-[5%]">
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
          <div>
            Map Demo
          </div>
        </section>
        <section>
          <div className="w-full lg:w-[67%] 2xl:w-[50%]">
            <FadeInSection>
              <p className="mb-4">Braga Geodashboard</p>
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
          <FadeInSection>
            <h4>Range of Industry</h4>
            <p>Morphocode Explorer helps planners, businesses, and cities do more with data.</p>
            {/* carousel */}
          </FadeInSection>
          <FadeInSection>
            <h4>Consumer Story</h4>
            <p>Innovative partners that surface insights with Braga Technologies</p>
            <div className="flex justify-between overflow-x-scroll">
              <UseCaseCard />
            </div>
          </FadeInSection>
          <FadeInSection className="w-full lg:w-[67%] xl:w-[50%]">
            <h3>
              Do your research with an urban analysis tool designed for discoveries. Use a single, powerful, interactive interface and explore location insights faster than ever.
            </h3>
          </FadeInSection>
        </section>
      </main>
      <footer className="border-t-2 border-black border-opacity-25 w-full py-6 px-[5%]">
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
