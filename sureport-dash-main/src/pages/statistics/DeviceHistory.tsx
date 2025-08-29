import { useState } from "react";
import { Search, Monitor, User, Calendar, CheckCircle, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { ExportButton } from "@/components/dashboard/ExportButton";

export const DeviceHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterResult, setFilterResult] = useState("all");

  const historyData = [
    {
      action: "Channel Change",
      performedBy: "admin@srms.com",
      deviceId: "STB-2847",
      result: "Success",
      datePerformed: "2024-08-24 10:30:15",
      dateCompleted: "2024-08-24 10:30:18"
    },
    {
      action: "Software Update",
      performedBy: "tech@srms.com",
      deviceId: "STB-1923",
      result: "Success", 
      datePerformed: "2024-08-24 09:15:00",
      dateCompleted: "2024-08-24 09:45:23"
    },
    {
      action: "Reboot Device",
      performedBy: "admin@srms.com",
      deviceId: "STB-3456",
      result: "Failed",
      datePerformed: "2024-08-24 08:20:45",
      dateCompleted: "2024-08-24 08:21:30"
    },
    {
      action: "Configuration Change",
      performedBy: "support@srms.com",
      deviceId: "STB-7891", 
      result: "Success",
      datePerformed: "2024-08-24 07:45:12",
      dateCompleted: "2024-08-24 07:45:45"
    }
  ];

  const filteredData = historyData.filter(item => {
    const matchesSearch = 
      item.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.deviceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.performedBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterResult === "all" || 
      item.result.toLowerCase() === filterResult.toLowerCase();
      
    return matchesSearch && matchesFilter;
  });

  const successCount = historyData.filter(item => item.result === "Success").length;
  const failedCount = historyData.filter(item => item.result === "Failed").length;

  return (
    <div className="space-y-6">
      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          title="Total Actions"
          value={historyData.length.toString()}
          change="Today"
          changeType="neutral"
          icon={<Monitor className="w-6 h-6 text-admin-primary" />}
          variant="default"
        />
        <MetricCard
          title="Successful Actions"
          value={successCount.toString()}
          change={`${((successCount / historyData.length) * 100).toFixed(1)}% success rate`}
          changeType="increase"
          icon={<CheckCircle className="w-6 h-6 text-admin-success" />}
          variant="online"
        />
        <MetricCard
          title="Failed Actions"
          value={failedCount.toString()}
          change={`${((failedCount / historyData.length) * 100).toFixed(1)}% failure rate`}
          changeType="decrease"
          icon={<XCircle className="w-6 h-6 text-admin-danger" />}
          variant="offline"
        />
        <MetricCard
          title="Active Users"
          value="3"
          change="Performing actions"
          changeType="neutral"
          icon={<User className="w-6 h-6 text-admin-primary" />}
          variant="default"
        />
      </div>

      {/* Data Table */}
      <div className="admin-card p-0">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Device Action History</h3>
            <div className="flex items-center gap-4">
              <Select value={filterResult} onValueChange={setFilterResult}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Result" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Results</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search actions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <ExportButton 
                data={historyData}
                filename="device-action-history"
                label="Export XLS"
              />
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Action</th>
                <th>Performed By</th>
                <th>Device ID</th>
                <th>Result</th>
                <th>Date Performed</th>
                <th>Date Completed</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td className="font-medium">{item.action}</td>
                  <td>{item.performedBy}</td>
                  <td>
                    <span className="px-2 py-1 bg-admin-primary/10 text-admin-primary rounded text-sm font-mono">
                      {item.deviceId}
                    </span>
                  </td>
                  <td>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      item.result === "Success" 
                        ? "bg-admin-success/10 text-admin-success" 
                        : "bg-admin-danger/10 text-admin-danger"
                    }`}>
                      {item.result}
                    </span>
                  </td>
                  <td className="text-sm text-muted-foreground font-mono">
                    {item.datePerformed}
                  </td>
                  <td className="text-sm text-muted-foreground font-mono">
                    {item.dateCompleted}
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