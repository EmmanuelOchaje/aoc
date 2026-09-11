"use client";

import { useState } from "react";
import { Card, Container } from "@/components/ui";
import { trackingCarriers, trackingUrl } from "@/content/site";

/** "Track a shipment" bar — hands the customer off to the carrier's own tracking page. */
export function TrackBar() {
  const [trackingNo, setTrackingNo] = useState("");
  const [carrier, setCarrier] = useState("dhl");

  function handleTrack() {
    if (!trackingNo.trim()) return;
    window.open(trackingUrl(carrier, trackingNo), "_blank", "noopener");
  }

  return (
    <section id="track" className="px-4 py-5 sm:px-6 sm:py-8">
      <Container className="!px-0">
        <Card className="grid items-center gap-4 p-4 sm:gap-8 sm:p-6 md:grid-cols-[1fr_2fr]">
          <div>
            <p className="label">Track a shipment</p>
            <p className="mt-2 max-w-[36ch] text-sm leading-relaxed text-ink-soft">
              Enter the number on your receipt and we hand you to the
              carrier&rsquo;s tracking page.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <input
              aria-label="Tracking number"
              placeholder="Tracking number"
              value={trackingNo}
              onChange={(event) => setTrackingNo(event.target.value)}
              className="min-h-12 min-w-[200px] flex-1 rounded-full border border-line bg-canvas px-4 text-sm text-ink outline-none focus:border-ink"
            />
            <select
              aria-label="Carrier"
              value={carrier}
              onChange={(event) => setCarrier(event.target.value)}
              className="min-h-12 rounded-full border border-line bg-canvas px-3.5 text-sm font-semibold text-ink outline-none focus:border-ink"
            >
              {trackingCarriers.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleTrack}
              className="min-h-12 rounded-full bg-ink px-6 text-sm font-semibold text-white transition-colors hover:bg-[#33383D]"
            >
              Track
            </button>
          </div>
        </Card>
      </Container>
    </section>
  );
}
