import React, { useEffect, useState } from "react";
import { Play, Rewind, FastForward, Volume2, RotateCcw, SkipForward, AlertTriangle, Users, Lock, Car, Cctv } from "lucide-react";

// Helper to assign color and icon based on type
const typeMeta: Record<string, { color: string; pColor: string; icon: React.ReactNode }> = {
  "Unauthorised Access": { color: "#431407", pColor: "#F97316", icon: <Lock className="w-4 h-4" /> },
  "Face Recognised": { color: "#172554", pColor: "#3B82F6", icon: <Users className="w-4 h-4" /> },
  "Gun Threat": { color: "#450A0A", pColor: "#EF4444", icon: <span>🔫</span> },
  "Traffic congestion": { color: "#042F2E", pColor: "#10B981", icon: <Car className="w-4 h-4" /> },
};

// Helper to get left offset and width as percent of 24h
const getTimelineMetrics = (start: Date, end: Date) => {
  const startH = start.getHours() + start.getMinutes() / 60;
  const endH = end.getHours() + end.getMinutes() / 60;
  const left = (startH / 24) * 100;
  let width = ((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) * 100; // percent of 24h
  // Minimum width for visibility
  if (width < 2) width = 2;
  return { left: `${left}%`, width: `${width}%` };
};

// API service functions
const fetchIncidents = async () => {
  const response = await fetch("http://localhost:3000/api/incidents?resolved=false");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const Activity = () => {
  const [cameras, setCameras] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await fetchIncidents();
        
        // Group by camera
        const grouped: Record<string, any> = {};
        data.forEach((incident: any) => {
          const camId = incident.camera.id;
          if (!grouped[camId]) {
            grouped[camId] = { 
              name: incident.camera.name + " : Camera " + incident.camera.id, 
              events: [] 
            };
          }
          grouped[camId].events.push(incident);
        });
        
        setCameras(Object.values(grouped));
      } catch (err) {
        setError("Failed to connect to API. Please check if the server is running.");
        console.error("Error fetching incidents:", err);
        setCameras([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Set up polling to refresh data every 30 seconds
    const interval = setInterval(fetchData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const getCurrentTimePercent = () => {
    const now = new Date();
    const hours = now.getHours() + now.getMinutes() / 60;
    return (hours / 24) * 100;
  };

  if (loading) {
    return (
      <div className="w-full bg-black text-white flex items-center justify-center" style={{ minHeight: 320, maxHeight: 420 }}>
        <div className="text-gray-400">Loading camera data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-black text-white flex flex-col items-center justify-center" style={{ minHeight: 320, maxHeight: 420 }}>
        <div className="text-red-400 flex items-center gap-2 mb-4">
          <AlertTriangle className="w-4 h-4" />
          {error}
        </div>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-black text-white flex flex-col" style={{ minHeight: 320, maxHeight: 420 }}>
      {/* Top Control Bar */}
      <div className="flex items-center px-4 py-2 bg-[#131313] m-4 rounded-lg">
        <div className="flex items-center gap-1">
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Rewind className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <RotateCcw className="w-4 h-4" />
          </button>
          <button className="p-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors">
            <Play className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <SkipForward className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <FastForward className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center ml-6 gap-4">
          <span className="text-white text-sm">{new Date().toLocaleTimeString()} ({new Date().toLocaleDateString()})</span>
          <span className="text-gray-400 text-sm">1x</span>
        </div>
        <div className="ml-auto">
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 m-4 rounded-lg">
        {/* Camera List */}
        <div className="w-64 bg-[#131313] rounded-lg">
          <h3 className="text-white text-lg font-medium px-3 py-4">Camera List</h3>
          {cameras.map((camera: any, idx: number) => (
            <div key={camera.name} className="flex items-center px-4 text-gray-300 h-16 hover:bg-[#1a1a1a] transition-colors cursor-pointer">
              <span className="mr-3"><Cctv className="w-5 h-5" /></span>
              <span className="text-sm">{camera.name}</span>
              <span className="ml-auto text-xs text-gray-500">
                {camera.events.length} events
              </span>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="flex-1 bg-black relative ml-4">
          {/* Timeline Header */}
          <div className="px-4 py-3 relative">
            <div className="flex justify-between text-xs text-gray-400 relative">
              {Array.from({ length: 25 }, (_, i) => (
                <div key={i} className="flex flex-col items-center" style={{ width: `${100/24}%` }}>
                  <span>{i.toString().padStart(2, '0')}:00</span>
                  <div className="w-px h-3 bg-gray-700 mt-1"></div>
                </div>
              ))}
              
              {/* Current Time Yellow Line */}
              <div 
                className="absolute top-0 flex flex-col items-center z-10"
                style={{ left: `${getCurrentTimePercent()}%` }}
              >
                <div className="w-0.5 h-full bg-yellow-400"></div>
                <div className="bg-yellow-400 text-black text-xs px-2 py-1 rounded font-bold mt-8 whitespace-nowrap">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>

          {/* Camera Rows */}
          <div className="relative">
            {cameras.map((camera: any, cameraIndex: number) => (
              <div key={camera.name} className="h-16 relative flex items-center group hover:bg-[#232323] transition-colors duration-150">
                {/* Yellow Current Time Line */}
                <div 
                  className="absolute top-0 bottom-0 w-0.5 bg-yellow-400 z-5"
                  style={{ left: `${getCurrentTimePercent()}%` }}
                ></div>
                
                {/* Events */}
                {camera.events.map((incident: any, eventIndex: number) => {
                  const meta = typeMeta[incident.type as string] || { 
                    color: "#1C1917", 
                    pColor: "#6B7280", 
                    icon: <AlertTriangle className="w-4 h-4" /> 
                  };
                  const start = new Date(incident.tsStart);
                  const end = new Date(incident.tsEnd);
                  const { left, width } = getTimelineMetrics(start, end);
                  
                  return (
                    <div
                      key={eventIndex}
                      className="absolute top-1/2 -translate-y-1/2 rounded px-2 py-1 flex items-center text-xs font-medium cursor-pointer hover:opacity-80 transition-all duration-200 hover:scale-105"
                      style={{
                        left,
                        width: 'auto',
                        minWidth: '120px',
                        backgroundColor: meta.color,
                        color: meta.pColor,
                        zIndex: 10,
                        borderLeft: `4px solid ${meta.pColor}`,
                        whiteSpace: 'nowrap'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.zIndex = '50';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.zIndex = '10';
                      }}
                      title={`${incident.type} - ${start.toLocaleTimeString()} to ${end.toLocaleTimeString()}`}
                    >
                      <span className="mr-1" style={{ color: meta.pColor }}>{meta.icon}</span>
                      <span style={{ color: meta.pColor }}>{incident.type}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;