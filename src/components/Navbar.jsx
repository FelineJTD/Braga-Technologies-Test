import logo from "/src/assets/images/braga-logo.svg";

function Navbar() {

  return (
    <nav className="flex bg-white bg-opacity-80 backdrop-blur-md rounded-md border-black py-4 px-6 border-2 fixed top-6 w-[80%] mx-[5%] 2xl:mx-[10%] justify-between z-50">
      <div className="flex items-center">
        <img src={logo} alt="" className="w-4 h-4 self-start" />
        <p>GeoDashboard</p>
        <p className="mx-6">|</p>
        <a href="#" className="mr-6 un">Features</a>
        <a href="#" className="un">Use Case</a>
      </div>
      <button className="bg-black text-white hover:bg-blue">Product Demo</button>
    </nav>
  )
}

export default Navbar;