import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { Dashboard } from "./pages/Dashboard";
import { ResourceStatistics } from "./pages/statistics/ResourceStatistics";
import { LinearTVStatistics } from "./pages/statistics/LinearTVStatistics";
import { ByChannel } from "./pages/statistics/ByChannel";
import { ByProgram } from "./pages/statistics/ByProgram";
import { OnlineContent } from "./pages/statistics/OnlineContent";
import { DeviceHistory } from "./pages/statistics/DeviceHistory";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="statistics/resource" element={<ResourceStatistics />} />
            <Route path="statistics/linear-tv" element={<LinearTVStatistics />} />
            <Route path="statistics/by-channel" element={<ByChannel />} />
            <Route path="statistics/by-program" element={<ByProgram />} />
            <Route path="statistics/online-content" element={<OnlineContent />} />
            <Route path="statistics/device-history" element={<DeviceHistory />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
