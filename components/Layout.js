import NavBar from "./NavBar"
import Notify from "./Notify"

const Layout = ({ children }) => {
  return (
    <div className="container-fluid">
      <NavBar />
      <Notify />
      {children}
    </div>
  )
}

export default Layout