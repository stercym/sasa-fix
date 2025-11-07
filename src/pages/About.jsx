// src/pages/About.jsx
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header Section */}
      <section className=" py-20 px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About SasaFix</h1>
        <p className=" max-w-2xl mx-auto text-lg">
          Connecting you instantly to trusted service providers wherever you are in Kenya.
        </p>
      </section>

      {/* Mission & Story */}
      <section className="py-20 px-8 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Story</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            When you travel or move around Kenya, unexpected breakdowns or household emergencies can happen — 
            and finding a reliable mechanic, plumber, or electrician in a new area can be stressful. 
            Many people end up overpaying or waiting for hours simply because they don’t know who to call.
          </p>
          <p className="text-gray-600 leading-relaxed">
            <span className="font-semibold">SasaFix</span> was built to solve that. 
            Our platform instantly connects you with **trusted, rated service providers** nearby. 
            Whether you need a mechanic in Kinoo, a plumber in Nakuru, or a boda pickup in Eldoret — 
            SasaFix helps you find help quickly and confidently.
          </p>
        </div>

        <div className="rounded-lg overflow-hidden shadow-lg">
          <img
            src="https://blog.cinch.io/hubfs/Imported_Blog_Media/auto-shop-service-tech-talking-to-a-customer-1.jpg"
            alt="Mechanic helping a customer"
            className="w-full h-80 object-cover"
          />
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Mission</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-12">
            To make **emergency and essential services accessible anywhere, anytime**, 
            while empowering skilled workers with visibility and fair job opportunities.
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              {
                title: "Reliability",
                desc: "Only verified and rated providers are listed — so you can count on quality service every time."
              },
              {
                title: "Convenience",
                desc: "Search by service type and location, and contact providers instantly through WhatsApp or call."
              },
              {
                title: "Community Trust",
                desc: "Ratings and reviews from real clients help build a trusted network of professionals."
              }
            ].map((item, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-blue-700 text-xl">✓</span>
                </div>
                <h3 className="font-semibold text-lg text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-8 bg-blue-700 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Join the SasaFix Community</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Whether you're a client looking for quick help or a skilled provider ready to serve, 
            SasaFix is here to connect you.
          </p>
          <div className="flex justify-center gap-6">
            <Link
              to="/register"
              className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
            >
              Register as Provider
            </Link>
            <Link
              to="/"
              className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-gray-400 text-center text-sm">
        © {new Date().getFullYear()} SasaFix — All Rights Reserved.
      </footer>
    </div>
  );
}
