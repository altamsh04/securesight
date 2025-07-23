"use client";
import React, { useState } from "react";
import { AlertTriangle, Video, Clock, ChevronRight, UserPlus, Users, CheckCircle, CameraIcon } from "lucide-react";
import Activity from "./Activity";

const incidents = [
  {
    id: 1,
    type: "Unauthorised Access",
    icon: <AlertTriangle className="w-5 h-5 text-orange-400" />,
    image: "https://placehold.co/120x67",
    camera: "Shop Floor Camera A",
    time: "14:35 - 14:37 on 7-Jul-2025",
    resolve: true,
  },
  {
    id: 2,
    type: "Gun Threat",
    icon: <Video className="w-5 h-5 text-red-500" />,
    image: "https://placehold.co/120x67",
    camera: "Shop Floor Camera A",
    time: "14:35 - 14:37 on 7-Jul-2025",
    resolve: true,
  },
  {
    id: 3,
    type: "Unauthorised Access",
    icon: <AlertTriangle className="w-5 h-5 text-orange-400" />,
    image: "https://placehold.co/120x67",
    camera: "Shop Floor Camera A",
    time: "14:35 - 14:37 on 7-Jul-2025",
    resolve: true,
  },
  {
    id: 4,
    type: "Unauthorised Access",
    icon: <AlertTriangle className="w-5 h-5 text-orange-400" />,
    image: "https://placehold.co/120x67",
    camera: "Shop Floor Camera A",
    time: "14:35 - 14:37 on 7-Jul-2025",
    resolve: true,
  },
];

const cameraList = [
  {
    id: 1,
    name: "Camera - 01",
    src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
    label: "Camera - 01",
    time: "11/7/2025 – 03:12:37",
  },
  {
    id: 2,
    name: "Camera - 02",
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    label: "Camera - 02",
    time: "11/7/2025 – 03:12:37",
  },
  {
    id: 3,
    name: "Camera - 03",
    src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
    label: "Camera - 03",
    time: "11/7/2025 – 03:12:37",
  },
];

const Camera = () => {
  const [mainCamera, setMainCamera] = useState(cameraList[0]);
  const [subCameras, setSubCameras] = useState([cameraList[1], cameraList[2]]);

  const handleSubCameraClick = (clickedCamera: typeof cameraList[0]) => {
    // Swap main and clicked sub camera
    const newSubCameras = subCameras.map((cam) =>
      cam.id === clickedCamera.id ? mainCamera : cam
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
            <img
              src={mainCamera.src}
              alt="Camera Feed"
              className="w-full h-full object-cover opacity-90"
            />
            
            {/* Date/Time Overlay */}
            <div className="absolute top-6 left-6 bg-black/90 text-white text-sm px-3 py-2 rounded-md flex items-center gap-2 z-10 backdrop-blur-sm font-medium">
              <Clock className="w-4 h-4 text-zinc-300" />
              {mainCamera.time}
            </div>
            
            {/* Camera Label */}
            <div className="absolute bottom-2 left-6 bg-black/90 text-white text-sm px-4 py-1 flex items-center gap-2 z-10 backdrop-blur-sm font-medium">
              <span className="w-2 h-2 bg-red-500 rounded-full inline-block animate-pulse"></span>
              {mainCamera.label}
            </div>

            {/* Sub Camera Cards - Horizontal alignment */}
            <div className="absolute bottom-2 right-2 md:bottom-2 md:right-6 flex flex-row gap-2 md:gap-4 z-20">
              {subCameras.map((cam, index) => (
                <div key={cam.id} className="flex flex-col items-center">
                  {/* Camera Label outside the card */}
                  <div className="w-30 text-xs font-medium text-white bg-black/90 text-center py-0.5">
                    {cam.label}
                  </div>
                  <div
                    className="relative overflow-hidden w-30 h-16 bg-black border border-zinc-700 shadow-xl cursor-pointer group hover:border-zinc-500 transition-all duration-200 flex flex-col items-center"
                    onClick={() => handleSubCameraClick(cam)}
                  >
                    <img
                      src={cam.src}
                      alt={cam.label}
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
              <span className="text-white text-lg font-semibold">15 Unresolved Incidents</span>
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
              {incidents.map((incident) => (
                <div key={incident.id} className="flex gap-3 items-start bg-zinc-900/80 rounded-lg p-4 border border-zinc-800/50 hover:bg-zinc-900/90 transition-colors">
                  <img
                    src={incident.image}
                    alt={incident.type}
                    style={{ width: 120, height: 67.2 }}
                    className="object-cover rounded-md border border-zinc-700"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {incident.icon}
                      <span className={`font-semibold text-sm ${incident.type === 'Gun Threat' ? 'text-red-500' : 'text-orange-400'}`}>
                        {incident.type}
                      </span>
                    </div>
                    <div className="text-xs text-zinc-300 flex items-center gap-1 mt-1">
                      <CameraIcon className="w-4 h-4 text-zinc-400" />
                      {incident.camera}
                    </div>
                    <div className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-4 h-4 text-zinc-400" />
                      {incident.time}
                    </div>
                  </div>
                  {incident.resolve && (
                    <button className="ml-2 text-yellow-400 text-xs md:text-sm font-semibold flex items-center gap-1 hover:text-yellow-300 transition-colors cursor-pointer">
                      Resolve <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
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