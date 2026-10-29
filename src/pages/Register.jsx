// src/pages/Register.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  isEmailRegistered,
  generateReferralCode,
  saveRegistration,
  getRegistrations,
} from "../utils/storage";

function Register() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const referralFromQuery = query.get("ref");

  const [form, setForm] = useState({
    name: "",
    email: "",
    college: "",
    branch: "",
    gradYear: "",
    source: "",
    referral: referralFromQuery || "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [myReferral, setMyReferral] = useState("");

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      newErrors.email = "Invalid email format";
    if (!form.college.trim()) newErrors.college = "College name is required";
    if (!form.branch.trim()) newErrors.branch = "Branch is required";
    if (!form.gradYear.trim()) newErrors.gradYear = "Graduation year is required";
    if (!form.source) newErrors.source = "Select a source";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validate()) return;
    const emailNorm = form.email.toLowerCase();
    if (isEmailRegistered(emailNorm)) {
      setErrors({ email: "This email is already registered" });
      return;
    }
    // Generate own referral code
    const myCode = generateReferralCode();
    const registration = {
      name: form.name.trim(),
      email: emailNorm,
      college: form.college.trim(),
      branch: form.branch.trim(),
      gradYear: form.gradYear.trim(),
      source: form.source,
      referralCode: myCode,
      usedReferral: form.referral && form.referral !== myCode ? form.referral : null,
      timestamp: new Date().toISOString(),
    };
    saveRegistration(registration);
    setMyReferral(myCode);
    setSubmitted(true);
    // Clear form after short delay (optional)
    setTimeout(() => navigate("/dashboard"), 2000);
  };

  const copyLink = () => {
    const url = `${window.location.origin}?ref=${myReferral}`;
    navigator.clipboard.writeText(url).catch(() => {});
  };

  const shareLink = () => {
    const url = `${window.location.origin}?ref=${myReferral}`;
    if (navigator.share) {
      navigator.share({ title: "AI Project Sprint – Referral", url }).catch(() => {});
    } else {
      copyLink();
    }
  };

  if (submitted) {
    return (
      <section className="max-w-xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold text-primary mb-4">Registration Successful!</h2>
        <p className="mb-2">Your unique referral code:</p>
        <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded">
          <span className="font-mono text-lg">{myReferral}</span>
          <button
            onClick={copyLink}
            className="text-sm text-primary hover:underline"
          >
            Copy Link
          </button>
          <button
            onClick={shareLink}
            className="text-sm text-primary hover:underline"
          >
            Share
          </button>
        </div>
        <p className="mt-4 text-gray-600">Thank you for registering. You will be redirected to the dashboard shortly.</p>
      </section>
    );
  }

  return (
    <section className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-primary mb-4 text-center">Register for Free</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
        </div>
        <div>
          <label className="block font-medium">College Name</label>
          <input
            type="text"
            name="college"
            value={form.college}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {errors.college && <p className="text-red-600 text-sm">{errors.college}</p>}
        </div>
        <div>
          <label className="block font-medium">Engineering Branch</label>
          <input
            type="text"
            name="branch"
            value={form.branch}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {errors.branch && <p className="text-red-600 text-sm">{errors.branch}</p>}
        </div>
        <div>
          <label className="block font-medium">Graduation Year</label>
          <input
            type="number"
            name="gradYear"
            value={form.gradYear}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {errors.gradYear && <p className="text-red-600 text-sm">{errors.gradYear}</p>}
        </div>
        <div>
          <label className="block font-medium">How did you hear about us?</label>
          <select
            name="source"
            value={form.source}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select source</option>
            <option value="College Clubs">College Clubs</option>
            <option value="WhatsApp Groups">WhatsApp Groups</option>
            <option value="Peer Referrals">Peer Referrals</option>
            <option value="Paid Promotion">Paid Promotion</option>
            <option value="Other">Other</option>
          </select>
          {errors.source && <p className="text-red-600 text-sm">{errors.source}</p>}
        </div>
        {referralFromQuery && (
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm">You were referred by code <strong>{referralFromQuery}</strong>.</p>
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:bg-primary/80 transition"
        >
          Submit Registration
        </button>
      </form>
    </section>
  );
}

export default Register;
