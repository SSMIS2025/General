import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ProgramChartProps {
  type: "rating" | "timeline";
}

export const ProgramChart = ({ type }: ProgramChartProps) => {
  const ratingData = [
    { program: "Football Match", rating: 9.5 },
    { program: "Kids Adventure", rating: 9.1 },
    { program: "Morning News", rating: 8.7 },
    { program: "Movie Night", rating: 8.2 },
    { program: "Talk Show", rating: 7.9 }
  ];

  const timelineData = [
    { time: "06:00", rating: 8.2 },
    { time: "08:00", rating: 8.7 },
    { time: "10:00", rating: 7.4 },
    { time: "12:00", rating: 8.9 },
    { time: "14:00", rating: 8.1 },
    { time: "16:00", rating: 9.2 },
    { time: "18:00", rating: 9.5 },
    { time: "20:00", rating: 9.8 },
    { time: "22:00", rating: 8.6 }
  ];

  if (type === "rating") {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={ratingData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="program" 
            stroke="#64748b"
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis stroke="#64748b" />
          <Tooltip 
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
            }}
          />
          <Bar dataKey="rating" fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={timelineData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="time" stroke="#64748b" />
        <YAxis stroke="#64748b" />
        <Tooltip 
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
          }}
        />
        <Line 
          type="monotone" 
          dataKey="rating" 
          stroke="#f59e0b" 
          strokeWidth={3}
          dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};