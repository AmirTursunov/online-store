"use client";
import { useEffect, useState } from "react";
import { Contact, Phone } from "lucide-react";
import { supabase } from "../supabaseClient";
import { Category } from "../admin/category/page";
import "./footer.css";

const Footer = () => {
  const [category, setCategory] = useState<Category[]>([]);

  useEffect(() => {
    getCategory();
  }, []);

  async function getCategory() {
    const { data } = await supabase.from("category").select("*");
    setCategory(data || []);
  }

  return (
    <footer className="bg-gray-100 mt-8">
      {/* TOP */}
      <div className="py-8 px-4 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-3">
          {[
            { src: "garden-care.jpg", title: "Garden Care" },
            { src: "plant.jpg", title: "Plant Renovation" },
            { src: "watering.jpg", title: "Watering Plants" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-2"
            >
              <img src={item.src} alt="plant" className="w-48 h-auto rounded" />
              <h1 className="footer-title">{item.title}</h1>
              <p className="footer-text">
                We are an online plant shop offering a wide range of cheap and
                trendy plants.
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="input-title">Would you like to join newsletters?</h1>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="text"
              placeholder="Recipient's username"
              className="w-full sm:w-auto flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none"
            />
            <button className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700">
              Join
            </button>
          </div>
          <p className="input-text">
            We usually post offers and challenges in newsletter. We’re your
            online houseplant destination. We offer a wide range of houseplants
            and accessories shipped directly from our (green)house to yours!
          </p>
        </div>
      </div>

      {/* MIDDLE */}
      <div className="bg-green-100 py-4 px-4 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-700">
        <img src="Logo.jpg" alt="logo" className="w-28" />
        <p>70 West Buckingham Ave. Farmingdale, NY 11735</p>
        <div className="flex items-center gap-2">
          <Contact size={16} />
          <span>contact@greenshop.com</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone size={16} />
          <span>+88 01911 717 490</span>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="bottom-footer">
        <div className="max-w-7xl mx-auto py-8 px-4 lg:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm text-gray-700">
          <div>
            <h4 className="font-semibold mb-2">My Account</h4>
            <ul className="space-y-1">
              <li>My Account</li>
              <li>Our stores</li>
              <li>Contact us</li>
              <li>Career</li>
              <li>Specials</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Help & Guide</h4>
            <ul className="space-y-1">
              <li>Help Center</li>
              <li>How to Buy</li>
              <li>Shipping & Delivery</li>
              <li>Product Policy</li>
              <li>How to Return</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Categories</h4>
            <ul className="space-y-1">
              {category.map((itm) => (
                <li key={itm.id}>{itm.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">More Info</h4>
            <ul className="space-y-1">
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Blog</li>
              <li>About Us</li>
              <li>FAQs</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
