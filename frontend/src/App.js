import React from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Events from "./components/EventsPage";
import NotFound from "./components/NotFound";
import EventDetails from "./components/EventDetails";
import Schedule from "./components/Schedule";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import About from "./components/About";
import Dashboard from "./components/Dashboard";
import Marquee from "react-fast-marquee";

export default function App() {

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Router>
        <NavBar />
        <Marquee className="text-red-700 font-bold dark:text-white" pauseOnHover={true} speed={120}>Registrations are live - Click here to register</Marquee>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:eventName" element={<EventDetails />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}