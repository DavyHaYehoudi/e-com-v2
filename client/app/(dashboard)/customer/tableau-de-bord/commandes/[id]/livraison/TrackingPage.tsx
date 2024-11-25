"use client";

import { useEffect, useState } from "react";
import { BaggageClaim } from "lucide-react";

interface TrackingPageProps {
  trackingNumber: string;
}
const TrackingPage: React.FC<TrackingPageProps> = ({ trackingNumber }) => {
  const [isTrackingNumber, setIsTrackingNumber] = useState(false);
  useEffect(() => {
    if (trackingNumber) {
      setIsTrackingNumber(true);
      handleTrack();
    } else {
      setIsTrackingNumber(false);
    }
  }, [trackingNumber]);

  const handleTrack = () => {
    if (typeof window !== "undefined" && (window as any).YQV5) {
      (window as any).YQV5.trackSingle({
        YQ_ContainerId: "YQContainer",
        YQ_Height: 560,
        YQ_Fc: "0",
        YQ_Lang: "fr",
        YQ_Num: trackingNumber.trim(),
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 space-y-6 border-2 rounded">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <span>Suivi de colis</span> <BaggageClaim />{" "}
      </h1>
      {!isTrackingNumber && (
        <p>Le numéro de suivi n'a pas encore été assigné.</p>
      )}
      <div id="YQContainer" className="mt-6 border rounded-md p-4"></div>
      <script
        type="text/javascript"
        src="//www.17track.net/externalcall.js"
        async
      ></script>
    </div>
  );
};
export default TrackingPage;
