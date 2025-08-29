import { useState } from "react";
import { Search, PlayCircle, Star, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { ExportButton } from "@/components/dashboard/ExportButton";
import { ProgramChart } from "@/components/charts/ProgramChart";

export const ByProgram = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const programData = [
    {
      programTitle: "Morning News",
      channelname: "News Channel",
      viewingtime: "45 mins",
      hits: "89,234",
      rating: "8.7"
    },
    {
      programTitle: "Football Match",
      channelname: "Sports Network", 
      viewingtime: "120 mins",
      hits: "245,678",
      rating: "9.5"
    },
    {
      programTitle: "Movie Night",
      channelname: "Movie Channel",
      viewingtime: "135 mins", 
      hits: "134,567",
      rating: "8.2"
    },
    {
      programTitle: "Kids Adventure",
      channelname: "Kids TV",
      viewingtime: "30 mins",
      hits: "98,765",
      rating: "9.1"
    }
  ];

  const filteredData = programData.filter(program =>
    program.programTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.channelname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Total Programs"
          value="1,247"
          change="+23 this week"
          changeType="increase"
          icon={<PlayCircle className="w-6 h-6 text-admin-primary" />}
          variant="default"
        />
        <MetricCard
          title="Average Rating"
          value="8.9"
          change="+0.4 improvement"
          changeType="increase"
          icon={<Star className="w-6 h-6 text-admin-warning" />}
          variant="default"
        />
        <MetricCard
          title="Total Views"
          value="568,244"
          change="+18% this month"
          changeType="increase"
          icon={<TrendingUp className="w-6 h-6 text-admin-success" />}
          variant="default"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="admin-card p-6">
          <h3 className="text-lg font-semibold mb-4">Top 10 Programs by Rating</h3>
          <ProgramChart type="rating" />
        </div>
        <div className="admin-card p-6">
          <h3 className="text-lg font-semibold mb-4">Program Rating Timeline</h3>
          <ProgramChart type="timeline" />
        </div>
      </div>

      {/* Data Table */}
      <div className="admin-card p-0">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Program Statistics</h3>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search programs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <ExportButton 
                data={programData}
                filename="program-statistics"
                label="Export XLS"
              />
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Program Title</th>
                <th>Channel Name</th>
                <th>Viewing Time</th>
                <th>Hits</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((program, index) => (
                <tr key={index}>
                  <td className="font-medium">{program.programTitle}</td>
                  <td>{program.channelname}</td>
                  <td>{program.viewingtime}</td>
                  <td>{program.hits}</td>
                  <td>
                    <span className="px-2 py-1 bg-admin-success/10 text-admin-success rounded-full text-sm">
                      {program.rating}
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