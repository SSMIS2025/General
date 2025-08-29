import { useState } from "react";
import { Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExportButton } from "@/components/dashboard/ExportButton";

export const ResourceStatistics = () => {
  const [fromDate, setFromDate] = useState("2024-08-18");
  const [toDate, setToDate] = useState("2024-08-24");

  // Sample data for the week
  const resourceData = [
    {
      category: "CPU Usage",
      "18Aug24": "45%",
      "19Aug24": "52%", 
      "20Aug24": "38%",
      "21Aug24": "61%",
      "22Aug24": "43%",
      "23Aug24": "49%",
      "24Aug24": "55%"
    },
    {
      category: "Memory Usage",
      "18Aug24": "67%",
      "19Aug24": "72%",
      "20Aug24": "59%", 
      "21Aug24": "81%",
      "22Aug24": "64%",
      "23Aug24": "70%",
      "24Aug24": "75%"
    },
    {
      category: "Network Traffic",
      "18Aug24": "234 MB",
      "19Aug24": "189 MB",
      "20Aug24": "298 MB",
      "21Aug24": "445 MB",
      "22Aug24": "321 MB",
      "23Aug24": "267 MB",
      "24Aug24": "389 MB"
    },
    {
      category: "Storage Used",
      "18Aug24": "12.4 GB",
      "19Aug24": "12.6 GB",
      "20Aug24": "12.8 GB",
      "21Aug24": "13.1 GB",
      "22Aug24": "13.3 GB",
      "23Aug24": "13.5 GB",
      "24Aug24": "13.7 GB"
    }
  ];

  const dateColumns = ["18Aug24", "19Aug24", "20Aug24", "21Aug24", "22Aug24", "23Aug24", "24Aug24"];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Resource Statistics</h1>
          <p className="text-muted-foreground mt-1">
            Monitor system resource usage over time
          </p>
        </div>
        <ExportButton 
          data={resourceData}
          filename="resource-statistics"
          label="Export Statistics"
        />
      </div>

      {/* Date Range Selector */}
      <div className="admin-card p-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <label className="text-sm font-medium">From:</label>
            <Input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-auto"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">To:</label>
            <Input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-auto"
            />
          </div>
          <Button className="btn-admin-primary">
            Apply Filter
          </Button>
        </div>
      </div>

      {/* Statistics Table */}
      <div className="admin-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th className="text-left">Category</th>
                {dateColumns.map((date) => (
                  <th key={date} className="text-center">{date}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {resourceData.map((row, index) => (
                <tr key={index}>
                  <td className="font-medium">{row.category}</td>
                  {dateColumns.map((date) => (
                    <td key={date} className="text-center">
                      {row[date as keyof typeof row]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};