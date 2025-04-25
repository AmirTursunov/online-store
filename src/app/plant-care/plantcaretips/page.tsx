"use client";
import Footer from "@/app/footer/page";
import Navbar from "@/app/navbar/page";
import React from "react";

const PlantCareTips = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8 text-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-green-700 text-center">
          🌱 Plant Care Tips: Indoor &amp; Outdoor
        </h1>

        {/* Indoor Care */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">
            🏡 Indoor Plant Care
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-base">
            <li>
              <strong>Light Matters:</strong> Most indoor plants prefer bright
              but indirect light. Place them near a window.
            </li>
            <li>
              <strong>Water Moderately:</strong> Check the soil with your
              finger. If it&apos;s dry, it&apos;s time to water (typically once
              a week).
            </li>
            <li>
              <strong>Keep Humidity:</strong> Mist the leaves or place a bowl of
              water nearby in dry environments.
            </li>
            <li>
              <strong>Rotate the Plants:</strong> Rotate regularly so they grow
              evenly from all sides.
            </li>
          </ul>
        </section>

        {/* Outdoor Care */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">
            🌳 Outdoor Plant Care
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-base">
            <li>
              <strong>Choose Climate-Friendly Plants:</strong> Select plants
              that suit your local weather conditions.
            </li>
            <li>
              <strong>Improve Soil:</strong> Use compost or organic fertilizers
              to enrich the soil and boost growth.
            </li>
            <li>
              <strong>Use Mulch:</strong> Helps retain moisture, prevent weeds,
              and protect roots.
            </li>
            <li>
              <strong>Pest Protection:</strong> Use natural insect repellents or
              remove pests manually if needed.
            </li>
          </ul>
        </section>

        {/* Bonus Tips */}
        <section>
          <h2 className="text-2xl font-semibold text-green-600 mb-4">
            💡 Bonus Tips
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-base">
            <li>Ensure proper drainage to avoid root rot.</li>
            <li>Talk to your plants – care and attention matter 😉</li>
            <li>In winter, reduce watering as most plants rest.</li>
          </ul>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default PlantCareTips;
