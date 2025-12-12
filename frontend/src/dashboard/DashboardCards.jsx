import { FaBusinessTime } from "react-icons/fa6";
import { FcLeave } from "react-icons/fc"; 
import { BsFillPersonLinesFill } from "react-icons/bs";
import { MdAssignmentAdd } from "react-icons/md";
export default function DashboardCards() {
  return (
    <div>
    <div className="cards">
      <div className="card">
        <FaBusinessTime size={50} style={{color:'#006CA3'}}/>
        <h3>Total Working Hours</h3>
        <p>120</p>
      </div>
      <div className="card">
        <FcLeave size={60} />
        <h3>Leave</h3>
        <p>10</p>
      </div>
      <div className="card">
        <BsFillPersonLinesFill size={60} style={{color:'#006CA3'}}/>
        <h3>Status</h3>
        <p>Online</p>
      </div>
      <div className="card">
        <MdAssignmentAdd  size={60} style={{color:'#006CA3'}} />
        <h3>Pending Works</h3>
        <p>2</p>
      </div>
    </div>
    </div>
  );
}