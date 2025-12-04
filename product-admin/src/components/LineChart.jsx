import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function LineChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Active Employees",
        data: [100, 110, 105, 115, 120, 125],
        borderColor: "#2563eb",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="chart-box">
      <h3>Employee Activity Chart</h3>
      <Line data={data} />
    </div>
  );
}