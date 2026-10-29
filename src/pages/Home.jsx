// src/pages/Home.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const ref = new URLSearchParams(location.search).get("ref");
  const registerLink = ref ? `/register?ref=${ref}` : "/register";

  return (
    <section className="max-w-5xl mx-auto p-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary">
          Build Your First AI Project in 60 Minutes
        </h1>
        <p className="text-xl text-gray-600">
          Stop just learning AI. Start building with it.
        </p>
        <span className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
          Free Online Workshop
        </span>
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
          Join a hands‑on session where you will create a complete AI project from scratch, learn core concepts, and get a portfolio‑ready artifact.
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-left max-w-3xl mx-auto">
          <li className="bg-white p-4 rounded shadow-sm">
            <strong>Beginner‑friendly</strong> – No prior AI experience needed.
          </li>
          <li className="bg-white p-4 rounded shadow-sm">
            <strong>Practical experience</strong> – Build a real AI project.
          </li>
          <li className="bg-white p-4 rounded shadow-sm">
            <strong>Portfolio boost</strong> – Showcase your work.
          </li>
        </ul>
        <p className="mt-4 text-gray-600">
          Target audience: Final‑year engineering students (CSE, IT, AI/ML, etc.)
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Workshop date and joining details will be announced.
        </p>
        <Link
          to={registerLink}
          className="mt-6 inline-block bg-primary text-white px-6 py-3 rounded hover:bg-primary/80 transition"
        >
          Register for Free
        </Link>
      </div>
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        <details className="bg-white p-4 rounded mb-2 shadow-sm" open>
          <summary className="font-medium cursor-pointer">Do I need any prior AI knowledge?</summary>
          <p className="mt-2 text-gray-600">No – the workshop is designed for beginners.</p>
        </details>
        <details className="bg-white p-4 rounded mb-2 shadow-sm">
          <summary className="font-medium cursor-pointer">Will I receive a certificate?</summary>
          <p className="mt-2 text-gray-600">Certificates are not part of this challenge.</p>
        </details>
        <details className="bg-white p-4 rounded mb-2 shadow-sm">
          <summary className="font-medium cursor-pointer">How will I join the session?</summary>
          <p className="mt-2 text-gray-600">Joining details will be announced after registration.</p>
        </details>
      </section>
    </section>
  );
}

export default Home;
