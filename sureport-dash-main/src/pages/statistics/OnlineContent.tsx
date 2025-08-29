import { useState } from "react";
import { Search, Play, Clock, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { ExportButton } from "@/components/dashboard/ExportButton";
import { ContentChart } from "@/components/charts/ContentChart";

export const OnlineContent = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const contentData = [
    {
      contentTitle: "Breaking News Special",
      session: "S01",
      episode: "E15", 
      viewingtime: "42 mins",
      hits: "156,789",
      rating: "9.2"
    },
    {
      contentTitle: "Sports Highlights",
      session: "S02",
      episode: "E08",
      viewingtime: "25 mins",
      hits: "203,456", 
      rating: "8.8"
    },
    {
      contentTitle: "Movie Premiere",
      session: "S01",
      episode: "E01",
      viewingtime: "128 mins",
      hits: "298,765",
      rating: "9.5"
    },
    {
      contentTitle: "Kids Animation",
      session: "S03",
      episode: "E12",
      viewingtime: "22 mins",
      hits: "87,432",
      rating: "8.6"
    }
  ];

  const filteredData = contentData.filter(content =>
    content.contentTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Total Content"
          value="3,456"
          change="+89 this week"
          changeType="increase"
          icon={<Play className="w-6 h-6 text-admin-primary" />}
          variant="default"
        />
        <MetricCard
          title="Total Watch Time"
          value="12,847 hrs"
          change="+24% increase"
          changeType="increase"
          icon={<Clock className="w-6 h-6 text-admin-success" />}
          variant="default"
        />
        <MetricCard
          title="Total Views"
          value="746,442"
          change="+15% this month"
          changeType="increase"
          icon={<Eye className="w-6 h-6 text-admin-warning" />}
          variant="default"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="admin-card p-6">
          <h3 className="text-lg font-semibold mb-4">Top 10 Content by Rating</h3>
          <ContentChart type="rating" />
        </div>
        <div className="admin-card p-6">
          <h3 className="text-lg font-semibold mb-4">Content Views Over Time</h3>
          <ContentChart type="views" />
        </div>
      </div>

      {/* Data Table */}
      <div className="admin-card p-0">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Online Content Statistics</h3>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <ExportButton 
                data={contentData}
                filename="online-content-statistics"
                label="Export XLS"
              />
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Content Title</th>
                <th>Session</th>
                <th>Episode</th>
                <th>Viewing Time</th>
                <th>Hits</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((content, index) => (
                <tr key={index}>
                  <td className="font-medium">{content.contentTitle}</td>
                  <td>{content.session}</td>
                  <td>{content.episode}</td>
                  <td>{content.viewingtime}</td>
                  <td>{content.hits}</td>
                  <td>
                    <span className="px-2 py-1 bg-admin-success/10 text-admin-success rounded-full text-sm">
                      {content.rating}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};