interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "increase" | "decrease" | "neutral";
  icon: React.ReactNode;
  variant: "total" | "online" | "offline" | "never" | "unregister" | "default";
}

export const MetricCard = ({ 
  title, 
  value, 
  change, 
  changeType = "neutral", 
  icon, 
  variant = "default" 
}: MetricCardProps) => {
  const getCardClasses = () => {
    switch (variant) {
      case "total": return "metric-card-total";
      case "online": return "metric-card-online";
      case "offline": return "metric-card-offline";
      case "never": return "metric-card-never";
      case "unregister": return "metric-card-unregister";
      default: return "metric-card";
    }
  };

  const getChangeColor = () => {
    switch (changeType) {
      case "increase": return "text-admin-success";
      case "decrease": return "text-admin-danger";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className={`${getCardClasses()}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-card-foreground mb-2">{value}</p>
          {change && (
            <p className={`text-sm ${getChangeColor()}`}>
              {change}
            </p>
          )}
        </div>
        <div className="ml-4 p-3 rounded-lg bg-muted/50">
          {icon}
        </div>
      </div>
    </div>
  );
};