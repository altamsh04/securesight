import React from "react";
import { Play, Rewind, FastForward, Volume2, RotateCcw, SkipForward, AlertTriangle, Users, Lock, Car, CameraIcon } from "lucide-react";

const cameras = [
  {
    name: "Camera - 01",
    events: [
      { label: "Unauthorised Access", color: "#431407", left: "20%", width: "120px" , pColor: "#F97316"},
      { label: "Face Recognised", color: "#172554", left: "40%", width: "140px", time: "14:45" , pColor: "#3B82F6"},
      { label: "4 Multiple Events", color: "#1C1917", left: "60%", width: "130px" , pColor: "#6B7280"},
      { label: "Unauthorised Access", color: "#431407", left: "82%", width: "120px" , pColor: "#F97316"},
      { label: "Gun Threat", color: "#450A0A", left: "88%", width: "90px" , pColor: "#EF4444"},
    ],
  },
  {
    name: "Camera - 02",
    events: [
      { label: "Unauthorised Access", color: "#431407", left: "18%", width: "120px" , pColor: "#F97316"},
      { label: "Face Recognised", color: "#172554", left: "52%", width: "120px" , pColor: "#3B82F6"},
    ],
  },
  {
    name: "Camera - 03",
    events: [
      { label: "Traffic congestion", color: "#042F2E", left: "40%", width: "130px" , pColor: "#10B981"},
      { label: "Unauthorised Access", color: "#431407", left: "70%", width: "120px" , pColor: "#F97316"},
    ],
  },
];

const Activity = () => (
  <div className="w-full h-screen bg-black text-white flex flex-col">
    {/* Top Control Bar */}
    <div className="flex items-center px-4 py-2 bg-gray-900 border-b border-gray-800">
      <div className="flex items-center gap-1">
        <button className="p-2 text-gray-400 hover:text-white">
          <Rewind className="w-4 h-4" />
        </button>
        <button className="p-2 text-gray-400 hover:text-white">
          <RotateCcw className="w-4 h-4" />
        </button>
        <button className="p-2 bg-white text-black rounded-full">
          <Play className="w-5 h-5" />
        </button>
        <button className="p-2 text-gray-400 hover:text-white">
          <SkipForward className="w-4 h-4" />
        </button>
        <button className="p-2 text-gray-400 hover:text-white">
          <FastForward className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex items-center ml-6 gap-4">
        <span className="text-white text-sm">03:12:37 (15-Jun-2025)</span>
        <span className="text-gray-400 text-sm">1x</span>
      </div>
      
      <div className="ml-auto">
        <button className="p-2 text-gray-400 hover:text-white">
          <Volume2 className="w-4 h-4" />
        </button>
      </div>
    </div>

    {/* Main Content */}
    <div className="flex flex-1">
      {/* Camera List */}
      <div className="w-44 bg-gray-900 border-r border-gray-800 py-4">
        <h3 className="text-white text-sm font-medium px-4 mb-4">Camera List</h3>
        {cameras.map((camera, idx) => (
          <div key={camera.name} className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800">
            <span className="mr-3"><CameraIcon /></span>
            <span className="text-sm">{camera.name}</span>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="flex-1 bg-black relative">
        {/* Timeline Header */}
        <div className="border-b border-gray-800 px-4 py-3 relative">
          <div className="flex justify-between text-xs text-gray-400 relative">
            {Array.from({ length: 17 }, (_, i) => (
              <div key={i} className="flex flex-col items-center" style={{ width: `${100/17}%` }}>
                <span>{i.toString().padStart(2, '0')}:00</span>
                <div className="w-px h-3 bg-gray-700 mt-1"></div>
              </div>
            ))}
            
            {/* Current Time Yellow Line */}
            <div className="absolute top-0 left-[20%] flex flex-col items-center z-10">
              <div className="w-0.5 h-full bg-yellow-400"></div>
              <div className="bg-yellow-400 text-black text-xs px-2 py-1 rounded font-bold mt-8">
                03:12:37
              </div>
            </div>
          </div>
        </div>

        {/* Camera Rows */}
        <div className="relative">
          {cameras.map((camera, cameraIndex) => (
            <div key={camera.name} className="h-12 border-b border-gray-800 relative flex items-center">
              {/* Vertical Grid Lines */}
              <div className="absolute inset-0 flex">
                {Array.from({ length: 17 }, (_, i) => (
                  <div key={i} className="flex-1 border-r border-gray-800/30"></div>
                ))}
              </div>
              
              {/* Yellow Current Time Line */}
              <div className="absolute left-[20%] top-0 bottom-0 w-0.5 bg-yellow-400 z-5"></div>
              
              {/* Events */}
              {camera.events.map((event, eventIndex) => (
                <div
                  key={eventIndex}
                  className="absolute top-2 bottom-2 rounded px-3 flex items-center text-xs font-small whitespace-nowrap"
                  style={{ 
                    left: event.left, 
                    width: "auto",
                    minWidth: event.width,
                    backgroundColor: event.color,
                    color: event.pColor,
                    zIndex: 10
                  }}
                >
                  {event.label === "Unauthorised Access" && <span className="mr-1" style={{ color: event.pColor }}><Lock className="w-4 h-4" /></span>}
                  {event.label === "Face Recognised" && <span className="mr-1" style={{ color: event.pColor }}><Users className="w-4 h-4" /></span>}
                  {event.label === "Traffic congestion" && <span className="mr-1" style={{ color: event.pColor }}><Car className="w-4 h-4" /></span>}
                  {event.label === "Gun Threat" && <span className="mr-1" style={{ color: event.pColor }}>🔫</span>}
                  <span>{event.label}</span>
                  {event.time && (
                    <span className="ml-2 text-blue-300">{event.time}</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Activity;