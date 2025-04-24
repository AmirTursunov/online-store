"use client";
import Image from "next/image";
import PlantCard from "./PlantCard";
import Navbar from "../navbar/page";
import Footer from "../footer/page";
import { redirect } from "next/navigation";

const PlantCarePage = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-green-50 text-gray-800">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-between p-8 bg-green-100">
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold mb-4">Grow Happy Plants 🌿</h1>
            <p className="mb-4 text-lg">
              Learn how to take care of your indoor and outdoor plants with
              simple tips.
            </p>
            <button
              onClick={() => redirect("/plant-care/plantcaretips")}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Get Started
            </button>
          </div>
          <div className="mt-6 md:mt-0">
            <Image
              src="/hero-plant.jpg"
              alt="Plant Care"
              width={400}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="p-8 bg-white grid gap-6 md:grid-cols-3 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">💧 Watering Tips</h3>
            <p>
              Know how often and how much to water different types of plants.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">☀️ Sunlight Needs</h3>
            <p>Understand if your plant needs direct or indirect light.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">🌱 Soil & Potting</h3>
            <p>Choose the best soil and pot to help your plant thrive.</p>
          </div>
        </section>

        {/* Plant Cards Section */}
        <section className="p-8 bg-green-50">
          <h2 className="text-2xl font-bold text-center mb-6">
            Popular Houseplants
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <PlantCard
              name="Ficus Elastica"
              image="/plantCare1.jpg"
              watering="Once a week"
              sunlight="Bright, indirect"
            />
            <PlantCard
              name="Snake Plant"
              image="/plantCare2.jpg"
              watering="Every 2–3 weeks"
              sunlight="Low to bright indirect"
            />
            <PlantCard
              name="Pothos"
              image="/plantCare3.jpg"
              watering="Once a week"
              sunlight="Low to medium light"
            />
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default PlantCarePage;
