// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import Dashboard from './pages/dashboard/Dashboard';
import ResourceStatistics from './pages/statistics/resource/ResourceStatistics';
import ByChannel from './pages/statistics/linear/by-channel/ByChannel';
import ByProgram from './pages/statistics/linear/by-program/ByProgram';
import OnlineContent from './pages/statistics/linear/online-content/OnlineContent';
import DeviceHistory from './pages/statistics/linear/device-history/DeviceHistory';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="statistics">
            <Route path="resource" element={<ResourceStatistics />} />
            <Route path="linear">
              <Route path="by-channel" element={<ByChannel />} />
              <Route path="by-program" element={<ByProgram />} />
              <Route path="online-content" element={<OnlineContent />} />
              <Route path="device-history" element={<DeviceHistory />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;