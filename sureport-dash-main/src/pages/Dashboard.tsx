import { Download, Monitor, Users, Wifi, WifiOff, AlertTriangle, Box, UserCheck } from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Button } from "@/components/ui/button";
import { ExportButton } from "@/components/dashboard/ExportButton";

export const Dashboard = () => {
  // Sample data - in real app this would come from API
  const metrics = [
    {
      title: "Total Devices",
      value: "2,847",
      change: "+12% from last month",
      changeType: "increase" as const,
      icon: <Monitor className="w-6 h-6 text-metric-total" />,
      variant: "total" as const
    },
    {
      title: "Online Devices", 
      value: "2,143",
      change: "+5% from yesterday",
      changeType: "increase" as const,
      icon: <Wifi className="w-6 h-6 text-metric-online" />,
      variant: "online" as const
    },
    {
      title: "Never Connected",
      value: "89",
      change: "-2% from last week",
      changeType: "decrease" as const,
      icon: <AlertTriangle className="w-6 h-6 text-metric-never" />,
      variant: "never" as const
    },
    {
      title: "Offline Devices",
      value: "615",
      change: "+3% from yesterday",
      changeType: "increase" as const,
      icon: <WifiOff className="w-6 h-6 text-metric-offline" />,
      variant: "offline" as const
    },
    {
      title: "Unregistered",
      value: "156",
      change: "No change",
      changeType: "neutral" as const,
      icon: <UserCheck className="w-6 h-6 text-metric-unregister" />,
      variant: "unregister" as const
    },
    {
      title: "Models",
      value: "47",
      change: "+2 new models",
      changeType: "increase" as const,
      icon: <Box className="w-6 h-6 text-admin-primary" />,
      variant: "default" as const
    },
    {
      title: "Users",
      value: "1,234", 
      change: "+18 this week",
      changeType: "increase" as const,
      icon: <Users className="w-6 h-6 text-admin-primary" />,
      variant: "default" as const
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of your device management system
          </p>
        </div>
        <ExportButton 
          data={metrics}
          filename="dashboard-metrics"
          label="Export Dashboard"
        />
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div 
            key={metric.title} 
            className="animate-fade-in" 
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
          >
            <MetricCard
              title={metric.title}
              value={metric.value}
              change={metric.change}
              changeType={metric.changeType}
              icon={metric.icon}
              variant={metric.variant}
            />
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="admin-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-card-foreground">Recent Activity</h2>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-metric-online"></div>
              <span className="text-sm">Device STB-2847 came online</span>
            </div>
            <span className="text-xs text-muted-foreground">2 minutes ago</span>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-metric-offline"></div>
              <span className="text-sm">Device STB-1923 went offline</span>
            </div>
            <span className="text-xs text-muted-foreground">15 minutes ago</span>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-admin-primary"></div>
              <span className="text-sm">New user John Doe registered</span>
            </div>
            <span className="text-xs text-muted-foreground">1 hour ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};