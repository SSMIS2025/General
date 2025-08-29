import { NavLink, useLocation } from "react-router-dom";
import { 
  Home, 
  BarChart3, 
  Settings, 
  Monitor, 
  Users, 
  Activity,
  TrendingUp,
  Tv,
  PlayCircle,
  History
} from "lucide-react";

const navigationItems = [
  { 
    title: "Home", 
    url: "/", 
    icon: Home 
  },
  { 
    title: "Statistics", 
    icon: BarChart3,
    submenu: [
      { title: "Resource Statistics", url: "/statistics/resource", icon: TrendingUp },
      { title: "Linear TV Statistics", url: "/statistics/linear-tv", icon: Tv },
      { title: "By Channel", url: "/statistics/by-channel", icon: Monitor },
      { title: "By Program", url: "/statistics/by-program", icon: PlayCircle },
      { title: "Online Content", url: "/statistics/online-content", icon: Activity },
      { title: "Device History", url: "/statistics/device-history", icon: History }
    ]
  }
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sidebar-accent rounded-lg flex items-center justify-center">
            <Monitor className="w-6 h-6 text-sidebar-accent-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-sidebar-foreground">SRMS</h1>
            <p className="text-xs text-sidebar-muted">Remote Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          if (item.submenu) {
            return (
              <div key={item.title} className="space-y-1">
                <div className="flex items-center px-3 py-2 text-sidebar-muted font-medium text-sm">
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.title}
                </div>
                <div className="ml-7 space-y-1">
                  {item.submenu.map((subItem) => (
                    <NavLink
                      key={subItem.url}
                      to={subItem.url}
                      className={({ isActive }) =>
                        `sidebar-nav-item text-sm ${
                          isActive ? "active" : ""
                        }`
                      }
                    >
                      <subItem.icon className="w-4 h-4 mr-3" />
                      {subItem.title}
                    </NavLink>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <NavLink
              key={item.url}
              to={item.url}
              className={({ isActive }) =>
                `sidebar-nav-item ${isActive ? "active" : ""}`
              }
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.title}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="text-xs text-sidebar-muted text-center">
          © 2024 SRMS v2.1.0
        </div>
      </div>
    </div>
  );
};