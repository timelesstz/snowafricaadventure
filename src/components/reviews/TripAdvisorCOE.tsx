"use client";

import Script from "next/script";

/**
 * TripAdvisor Travelers' Choice / Certificate of Excellence badge.
 * Loads the official TripAdvisor widget script.
 */
export function TripAdvisorCOE({ className = "" }: { className?: string }) {
  return (
    <div className={`tripadvisor-coe ${className}`}>
      <div id="TA_certificateOfExcellence357" className="TA_certificateOfExcellence">
        <ul id="KgO52eFyxzu" className="TA_links G8DSf4ysqS">
          <li id="tWsAttopv1O" className="A0DHT6">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.tripadvisor.com/Attraction_Review-g297913-d15336338-Reviews-Snow_Africa_Adventures-Arusha_Arusha_Region.html"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://static.tacdn.com/img2/travelers_choice/widgets/tchotel_2025_L.png"
                alt="TripAdvisor Travelers' Choice 2025"
                className="widCOEImg"
                id="CDSWIDCOELOGO"
              />
            </a>
          </li>
        </ul>
      </div>
      <Script
        id="ta-coe-script"
        strategy="lazyOnload"
        src="https://www.jscache.com/wejs?wtype=certificateOfExcellence&uniq=357&locationId=15336338&lang=en_US&year=2025&display_version=2"
      />
    </div>
  );
}
