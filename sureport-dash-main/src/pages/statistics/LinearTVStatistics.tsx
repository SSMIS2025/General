import { NavLink, useLocation } from "react-router-dom";
import { Monitor, PlayCircle, Activity, History } from "lucide-react";

const statsNavItems = [
  { title: "By Channel", url: "/statistics/by-channel", icon: Monitor },
  { title: "By Program", url: "/statistics/by-program", icon: PlayCircle },
  { title: "Online Content", url: "/statistics/online-content", icon: Activity },
  { title: "Device History", url: "/statistics/device-history", icon: History }
];

export const LinearTVStatistics = () => {
  const location = useLocation();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Linear TV Statistics</h1>
        <p className="text-muted-foreground mt-1">
          Comprehensive television viewing analytics and insights
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="admin-card p-0">
        <div className="flex border-b border-border overflow-x-auto">
          {statsNavItems.map((item) => (
            <NavLink
              key={item.url}
              to={item.url}
              className={({ isActive }) =>
                `flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                  isActive
                    ? "text-admin-primary border-b-2 border-admin-primary bg-admin-primary/5"
                    : "text-muted-foreground hover:text-card-foreground hover:bg-muted/50"
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              {item.title}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="admin-card p-12 text-center">
        <div className="max-w-md mx-auto">
          <Monitor className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-card-foreground mb-2">
            Select a Statistics Category
          </h3>
          <p className="text-muted-foreground">
            Choose from the tabs above to view detailed statistics for channels, programs, online content, or device history.
          </p>
        </div>
      </div>
    </div>
  );
};