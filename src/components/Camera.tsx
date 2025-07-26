"use client";
import React, { useState, useEffect } from "react";
import { AlertTriangle, Clock, ChevronRight, UserPlus, Users, CheckCircle, CameraIcon, Loader2 } from "lucide-react";
import Activity from "./Activity";

// Define types
interface Camera {
  id: number;
  name: string;
  location: string;
  videoStream: string;
}

interface Incident {
  id: number;
  type: string;
  tsStart: string;
  tsEnd: string;
  thumbnailUrl: string;
  image?: string;
  camera: {
    id: number;
    name: string;
  };
}

const Camera = () => {
  const [mainCamera, setMainCamera] = useState<Camera | null>(null);
  const [subCameras, setSubCameras] = useState<Camera[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(false);
  const [resolvingIds, setResolvingIds] = useState<Set<number>>(new Set());

  // Fetch cameras from API
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cameras`)
      .then((res) => res.json())
      .then((data: Camera[]) => {
        setMainCamera(data[0]);
        setSubCameras(data.slice(1, 3));
      });
  }, []);

  // Fetch incidents from API
  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/incidents?resolved=false`)
      .then((res) => res.json())
      .then((data: Incident[]) => setIncidents(data))
      .finally(() => setLoading(false));
  }, []);

  // Handle resolve button click
  const handleResolve = async (id: number) => {
    // Add the incident ID to the resolving set
    setResolvingIds(prev => new Set(prev).add(id));
    
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/incidents/${id}/resolve`, { method: "PATCH" });
      // Refetch incidents after resolving
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/incidents?resolved=false`);
      const data = await response.json();
      setIncidents(data);
    } catch (error) {
      console.error('Error resolving incident:', error);
    } finally {
      // Remove the incident ID from the resolving set
      setResolvingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
      setLoading(false);
    }
  };

  const handleSubCameraClick = (clickedCamera: Camera) => {
    // Swap main and clicked sub camera
    const newSubCameras = subCameras.map((cam) =>
      cam.id === clickedCamera.id ? mainCamera! : cam
    );
    setMainCamera(clickedCamera);
    setSubCameras(newSubCameras);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black">
      <div className="flex flex-col lg:flex-row gap-6 md:gap-10 px-2 md:px-4 pt-4 md:pt-8 lg:pt-12 lg:px-12 w-full max-w-[1800px] mx-auto items-start">
        {/* Left: Camera Feed */}
        <div className="flex-shrink-0 flex flex-col relative w-full md:max-w-[700px] lg:max-w-[880px]">
          {/* Main Camera Feed Container */}
          <div className="relative rounded-xl overflow-hidden shadow-2xl bg-zinc-900 w-full" style={{ height: '55vw', maxHeight: 495, minHeight: 220 }}>
            {mainCamera && (
              <img
                src={mainCamera.videoStream}
                alt={mainCamera.name}
                className="w-full h-full object-cover opacity-90"
              />
            )}
            
            {/* Date/Time Overlay */}
            <div className="absolute top-6 left-6 bg-black/90 text-white text-sm px-3 py-2 rounded-md flex items-center gap-2 z-10 backdrop-blur-sm font-medium">
              <Clock className="w-4 h-4 text-zinc-300" />
              {mainCamera && `Camera ${mainCamera.id} : ${mainCamera.name}`}
            </div>
            
            {/* Camera Label */}
            <div className="absolute bottom-2 left-6 bg-black/90 text-white text-sm px-4 py-1 flex items-center gap-2 z-10 backdrop-blur-sm font-medium">
              <span className="w-2 h-2 bg-red-500 rounded-full inline-block animate-pulse"></span>
              {mainCamera && `Camera ${mainCamera.id} : ${mainCamera.name}`}
            </div>

            {/* Sub Camera Cards - Horizontal alignment */}
            <div className="absolute bottom-2 right-2 md:bottom-2 md:right-6 flex flex-row gap-2 md:gap-4 z-20">
              {subCameras.map((cam: Camera) => (
                <div key={cam.id} className="flex flex-col items-center">
                  {/* Camera Label outside the card */}
                  <div className="w-30 text-xs font-medium text-white bg-black/90 text-center py-0.5 truncate">
                    {`Camera ${cam.id} : ${cam.name}`}
                  </div>
                  <div
                    className="relative overflow-hidden w-30 h-16 bg-black border border-zinc-700 shadow-xl cursor-pointer group hover:border-zinc-500 transition-all duration-200 flex flex-col items-center"
                    onClick={() => handleSubCameraClick(cam)}
                  >
                    <img
                      src={cam.videoStream}
                      alt={cam.name}
                      className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-200"
                    />
                    {/* Menu dots (vertical, sized to fit under label) */}
                    <div className="absolute top-2 right-2 flex flex-col gap-1 items-center" style={{height: '18px', justifyContent: 'flex-start'}}>
                      <div className="w-1 h-1.5 bg-white rounded-full opacity-60"></div>
                      <div className="w-1 h-1.5 bg-white rounded-full opacity-60"></div>
                      <div className="w-1 h-1.5 bg-white rounded-full opacity-60"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Incidents Panel */}
        <aside className="w-full md:w-[90vw] lg:w-[700px] flex-shrink-0 mt-2" style={{maxWidth: 700, height: 'auto'}}>
          <div className="bg-black/80 border-l border-zinc-800 p-2 md:p-4 lg:p-6 h-full rounded-2xl shadow-2xl flex flex-col backdrop-blur-sm" style={{minHeight: 350, height: '100%'}}>
            <div className="flex items-center gap-2 mb-6">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <span className="text-white text-lg font-semibold">{incidents.length} Unresolved Incidents</span>
              <div className="flex-1"></div>
              <button className="flex items-center gap-1 bg-zinc-900 text-xs text-white/80 px-2 py-1 rounded-full border border-zinc-700 mr-2 hover:bg-zinc-800 transition-colors">
                <UserPlus className="w-4 h-4 text-orange-400" />
              </button>
              <button className="flex items-center gap-1 bg-zinc-900 text-xs text-white/80 px-2 py-1 rounded-full border border-zinc-700 mr-2 hover:bg-zinc-800 transition-colors">
                <Users className="w-4 h-4 text-purple-400" />
              </button>
              <button className="flex items-center gap-1 bg-zinc-900 text-xs text-green-400 px-2 py-1 rounded-full border border-zinc-700 hover:bg-zinc-800 transition-colors">
                <CheckCircle className="w-4 h-4" />
                4 resolved incidents
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-1 md:pr-2 space-y-4 scrollbar-hide" style={{maxHeight: 400}}>
              {loading ? (
                <div className="text-white">Loading...</div>
              ) : (
                incidents.map((incident) => {
                  const isResolving = resolvingIds.has(incident.id);
                  return (
                    <div key={incident.id} className="flex gap-3 items-start bg-zinc-900/80 rounded-lg p-4 border border-zinc-800/50 hover:bg-zinc-900/90 transition-colors">
                      <img
                        src={incident.thumbnailUrl || incident.image}
                        alt={incident.type}
                        style={{ width: 120, height: 67.2 }}
                        className="object-cover rounded-md border border-zinc-700"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          {/* You can add icons based on incident.type if needed */}
                          <span className={`font-semibold text-sm ${incident.type === 'Gun Threat' ? 'text-red-500' : 'text-orange-400'}`}>
                            {incident.type}
                          </span>
                        </div>
                        <div className="text-xs text-zinc-300 flex items-center gap-1 mt-1">
                          <CameraIcon className="w-4 h-4 text-zinc-400" />
                          {incident.camera.name + " : " + "Camera " + incident.camera.id}
                        </div>
                        <div className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5">
                          <Clock className="w-4 h-4 text-zinc-400" />
                          {new Date(incident.tsStart).toLocaleString()} - {new Date(incident.tsEnd).toLocaleString()}
                        </div>
                      </div>
                      <button
                        className={`ml-2 text-xs md:text-sm font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                          isResolving 
                            ? 'text-zinc-500 cursor-not-allowed' 
                            : 'text-yellow-400 hover:text-yellow-300'
                        }`}
                        onClick={() => !isResolving && handleResolve(incident.id)}
                        disabled={isResolving}
                      >
                        {isResolving ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Resolving...
                          </>
                        ) : (
                          <>
                            Resolve <ChevronRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </aside>
      </div>
      {/* Activity Timeline Component */}
      <Activity />
    </div>
  );
};

export default Camera;