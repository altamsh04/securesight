import React from "react";
import { Play, Rewind, FastForward, Volume2, User, AlertTriangle, Video, Users } from "lucide-react";

const cameras = [
  {
    name: "Camera - 01",
    events: [
      { label: "Unauthorised Access", color: "bg-orange-900", icon: <AlertTriangle className="w-4 h-4 mr-1" />, left: "20%", width: "10%" },
      { label: "Face Recognised", color: "bg-blue-900", icon: <Users className="w-4 h-4 mr-1" />, left: "40%", width: "10%", time: "14:45" },
      { label: "4 Multiple Events", color: "bg-zinc-800", icon: <AlertTriangle className="w-4 h-4 mr-1" />, left: "60%", width: "10%" },
      { label: "Unauthorised Access", color: "bg-orange-900", icon: <AlertTriangle className="w-4 h-4 mr-1" />, left: "80%", width: "10%" },
      { label: "Gun Threat", color: "bg-red-900", icon: <Video className="w-4 h-4 mr-1" />, left: "85%", width: "8%" },
    ],
  },
  {
    name: "Camera - 02",
    events: [
      { label: "Unauthorised Access", color: "bg-orange-900", icon: <AlertTriangle className="w-4 h-4 mr-1" />, left: "20%", width: "10%" },
      { label: "Face Recognised", color: "bg-blue-900", icon: <Users className="w-4 h-4 mr-1" />, left: "50%", width: "10%" },
    ],
  },
  {
    name: "Camera - 03",
    events: [
      { label: "Traffic congestion", color: "bg-teal-900", icon: <User className="w-4 h-4 mr-1" />, left: "40%", width: "12%" },
      { label: "Unauthorised Access", color: "bg-orange-900", icon: <AlertTriangle className="w-4 h-4 mr-1" />, left: "70%", width: "10%" },
    ],
  },
];

const hours = Array.from({ length: 17 }, (_, i) => i);

const Activity = () => (
  <div className="w-full bg-zinc-900 rounded-2xl shadow-xl p-4 md:p-6 mt-12 flex flex-col items-center justify-center">
    {/* Top Bar */}
    <div className="flex items-center gap-4 bg-zinc-800 rounded-lg px-4 py-2 mb-4">
      <button className="p-2 hover:bg-zinc-700 rounded"><Rewind className="w-5 h-5" /></button>
      <button className="p-2 hover:bg-zinc-700 rounded"><Play className="w-5 h-5" /></button>
      <button className="p-2 hover:bg-zinc-700 rounded"><FastForward className="w-5 h-5" /></button>
      <span className="ml-4 text-white font-mono text-sm">03:12:37 (15-Jun-2025)</span>
      <span className="ml-4 text-zinc-400 text-xs">1x</span>
      <div className="flex-1" />
      <button className="p-2 hover:bg-zinc-700 rounded"><Volume2 className="w-5 h-5" /></button>
    </div>
    {/* Timeline */}
    <div className="relative w-full border-b border-zinc-700 pb-2 mb-2 max-w-full">
      <div className="flex justify-between text-xs text-zinc-400 font-mono">
        {hours.map((h) => (
          <span key={h} className="w-12 text-center">{h.toString().padStart(2, "0")}:00</span>
        ))}
      </div>
      {/* Yellow indicator */}
      <div className="absolute top-0 left-[20%] h-full flex flex-col items-center" style={{zIndex:2}}>
        <div className="w-0.5 h-8 bg-yellow-400" />
        <span className="bg-yellow-400 text-black text-xs px-2 py-0.5 rounded font-bold mt-1">03:12:37</span>
      </div>
    </div>
    {/* Camera List and Events */}
    <div className="flex flex-col gap-2 w-full">
      {cameras.map((cam, idx) => (
        <div key={cam.name} className="flex items-center gap-2 min-h-[48px] border-b border-zinc-800 last:border-b-0 relative">
          <span className="flex items-center text-white text-sm font-medium w-40"><span className="mr-2">📷</span>{cam.name}</span>
          <div className="relative flex-1 h-12">
            {cam.events.map((ev, i) => (
              <div key={i} className={`absolute top-2 flex items-center px-3 py-1 rounded-lg text-xs font-semibold text-white ${ev.color}`} style={{ left: ev.left, width: ev.width, minWidth: 90, maxWidth: 180 }}>
                {ev.icon}
                {ev.label}
                {ev.time && <span className="ml-2 text-blue-300 font-mono">{ev.time}</span>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Activity; 