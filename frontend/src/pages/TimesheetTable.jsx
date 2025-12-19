export default function TimesheetTable({ records }) {
  return (
    <table className="w-full border-collapse bg-white shadow rounded overflow-hidden">
      <thead className="bg-gray-100">
        <tr>
          <th className="border p-2">Date</th>
          <th className="border p-2">Hours</th>
          <th className="border p-2">Task</th>
        </tr>
      </thead>

      <tbody>
        {records.map((r, index) => (
          <tr key={index}>
            <td className="border p-2">{r.date}</td>
            <td className="border p-2">{r.hours}</td>
            <td className="border p-2">{r.task}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
