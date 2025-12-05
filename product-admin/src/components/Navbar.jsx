import { FaUserCircle } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";

export default function Navbar() {
  return (
    <div className="navbar">
      <h3>Employee Dashboard</h3>
      <div>
        <a href="">
          <IoIosNotifications size={30} style={{ width: '40px', height: '40px', color: '#ffffffff',padding:'3px' }}/>
        </a>
        <a href="" >
            <FaUserCircle size={40} className="navbar-icons"/>
        </a>
        
      </div>
    </div>
  );
}