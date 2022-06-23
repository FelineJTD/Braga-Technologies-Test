function Navbar() {

  return (
    <nav className="flex bg-white bg-opacity-80 backdrop-blur-md rounded-md border-black py-4 px-6 border-2 sticky top-6 mx-[5%] justify-between">
      <div className="flex items-center">
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