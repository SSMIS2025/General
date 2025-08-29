import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface ChannelChartProps {
  type: "line" | "bar" | "comparison";
}

export const ChannelChart = ({ type }: ChannelChartProps) => {
  const timelineData = [
    { time: "00:00", viewers: 1200, rating: 6.5 },
    { time: "04:00", viewers: 800, rating: 4.2 },
    { time: "08:00", viewers: 2100, rating: 8.3 },
    { time: "12:00", viewers: 2800, rating: 9.1 },
    { time: "16:00", viewers: 2400, rating: 8.7 },
    { time: "20:00", viewers: 3200, rating: 9.8 },
    { time: "24:00", viewers: 1800, rating: 7.2 }
  ];

  const topChannelsData = [
    { channel: "Sports", rating: 9.2, shares: 22.1 },
    { channel: "Kids TV", rating: 8.9, shares: 18.3 },
    { channel: "News", rating: 8.5, shares: 15.8 },
    { channel: "Movies", rating: 7.8, shares: 11.2 },
    { channel: "Music", rating: 7.5, shares: 9.8 }
  ];

  const comparisonData = [
    { period: "Morning", "News Channel": 8.2, "Sports Network": 6.1 },
    { period: "Afternoon", "News Channel": 7.8, "Sports Network": 8.9 },
    { period: "Evening", "News Channel": 9.1, "Sports Network": 9.8 },
    { period: "Night", "News Channel": 6.9, "Sports Network": 7.2 }
  ];

  if (type === "line") {
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
            dataKey="viewers" 
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  if (type === "bar") {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={topChannelsData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="channel" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip 
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
            }}
          />
          <Bar dataKey="rating" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  // Comparison chart
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={comparisonData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="period" stroke="#64748b" />
        <YAxis stroke="#64748b" />
        <Tooltip 
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
          }}
        />
        <Legend />
        <Bar dataKey="News Channel" fill="#3b82f6" radius={[2, 2, 0, 0]} />
        <Bar dataKey="Sports Network" fill="#10b981" radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};