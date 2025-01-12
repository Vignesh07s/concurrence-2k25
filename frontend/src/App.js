import React from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Events from "./components/EventsPage";
import NotFound from "./components/NotFound";
import EventDetails from "./components/EventDetails";
import Gallery from "./components/Gallery";
import EventSchedule from "./components/EventSchedule";
import Contact from "./components/Contact";
import Carousel from "./components/Carousel";
import About from "./components/About";
import TotalRegistrations from "./components/TotalRegistrations";
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  const LocationAwareRegistrations = () => {
    const location = useLocation();
    // Exclude `/events` and `/events/:eventName`
    const excludedPaths = ["/events"];
    const isExcluded = excludedPaths.some((path) => location.pathname.startsWith(path));
    return !isExcluded && <TotalRegistrations />;
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:eventName" element={<EventDetails />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/event-schedule" element={<EventSchedule />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/carousel" element={<Carousel />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <LocationAwareRegistrations />
        <Analytics/>
      </Router>
    </div>
  );
}
