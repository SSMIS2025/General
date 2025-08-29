import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ContentChartProps {
  type: "rating" | "views";
}

export const ContentChart = ({ type }: ContentChartProps) => {
  const ratingData = [
    { content: "Movie Premiere", rating: 9.5 },
    { content: "Breaking News", rating: 9.2 },
    { content: "Sports Highlights", rating: 8.8 },
    { content: "Kids Animation", rating: 8.6 },
    { content: "Documentary", rating: 8.3 }
  ];

  const viewsData = [
    { period: "Jan", views: 145000 },
    { period: "Feb", views: 178000 },
    { period: "Mar", views: 203000 },
    { period: "Apr", views: 189000 },
    { period: "May", views: 234000 },
    { period: "Jun", views: 267000 },
    { period: "Jul", views: 298000 },
    { period: "Aug", views: 320000 }
  ];

  if (type === "rating") {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={ratingData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="content" 
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
          <Bar dataKey="rating" fill="#f59e0b" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={viewsData}>
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
          formatter={(value: any) => [value?.toLocaleString(), "Views"]}
        />
        <Area 
          type="monotone" 
          dataKey="views" 
          stroke="#3b82f6" 
          fill="#3b82f6"
          fillOpacity={0.3}
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};