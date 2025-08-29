import { useState } from "react";
import { Search, Download, TrendingUp, Users, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExportButton } from "@/components/dashboard/ExportButton";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { ChannelChart } from "@/components/charts/ChannelChart";

export const ByChannel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("all");

  // Sample data
  const channelData = [
    {
      channelname: "News Channel",
      viewingtime: "2,345 hrs",
      rating: "8.5",
      tvr: "12.3%",
      shares: "15.8%",
      hits: "156,789"
    },
    {
      channelname: "Sports Network",
      viewingtime: "1,890 hrs", 
      rating: "9.2",
      tvr: "18.7%",
      shares: "22.1%",
      hits: "203,456"
    },
    {
      channelname: "Movie Channel",
      viewingtime: "1,567 hrs",
      rating: "7.8",
      tvr: "9.4%", 
      shares: "11.2%",
      hits: "98,765"
    },
    {
      channelname: "Kids TV",
      viewingtime: "1,234 hrs",
      rating: "8.9",
      tvr: "14.5%",
      shares: "18.3%",
      hits: "187,432"
    }
  ];

  const filteredData = channelData.filter(channel =>
    channel.channelname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Total Viewing Set-top Boxes"
          value="2,847"
          change="+156 today"
          changeType="increase"
          icon={<Users className="w-6 h-6 text-admin-primary" />}
          variant="default"
        />
        <MetricCard
          title="Total Viewing Time"
          value="7,036 hrs"
          change="+12% this week"
          changeType="increase"
          icon={<Clock className="w-6 h-6 text-admin-success" />}
          variant="default"
        />
        <MetricCard
          title="Average Rating"
          value="8.6"
          change="+0.3 from last month"
          changeType="increase"
          icon={<TrendingUp className="w-6 h-6 text-admin-warning" />}
          variant="default"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="admin-card p-6">
          <h3 className="text-lg font-semibold mb-4">Viewing Timeline</h3>
          <ChannelChart type="line" />
        </div>
        <div className="admin-card p-6">
          <h3 className="text-lg font-semibold mb-4">Top 10 Channels by Rating</h3>
          <ChannelChart type="bar" />
        </div>
      </div>

      {/* Channel Comparison */}
      <div className="admin-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Channel Comparison</h3>
          <Select value={selectedChannel} onValueChange={setSelectedChannel}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select channel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Channels</SelectItem>
              <SelectItem value="news">News Channel</SelectItem>
              <SelectItem value="sports">Sports Network</SelectItem>
              <SelectItem value="movies">Movie Channel</SelectItem>
              <SelectItem value="kids">Kids TV</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ChannelChart type="comparison" />
      </div>

      {/* Data Table */}
      <div className="admin-card p-0">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Channel Statistics</h3>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search channels..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <ExportButton 
                data={channelData}
                filename="channel-statistics"
                label="Export XLS"
              />
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Channel Name</th>
                <th>Viewing Time</th>
                <th>Rating</th>
                <th>TVR</th>
                <th>Shares</th>
                <th>Hits</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((channel, index) => (
                <tr key={index}>
                  <td className="font-medium">{channel.channelname}</td>
                  <td>{channel.viewingtime}</td>
                  <td>
                    <span className="px-2 py-1 bg-admin-success/10 text-admin-success rounded-full text-sm">
                      {channel.rating}
                    </span>
                  </td>
                  <td>{channel.tvr}</td>
                  <td>{channel.shares}</td>
                  <td>{channel.hits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};