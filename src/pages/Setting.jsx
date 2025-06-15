import React, { useState } from 'react';

const Setting = () => {
  const [settings, setSettings] = useState({
    name: '',
    email: '',
    theme: 'light',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log('Saved settings:', settings);
    alert('Settings saved!'); // Replace with API/localStorage call
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>

      <div className="mb-4">
        <label className="block font-medium mb-1">Name</label>
        <input
          name="name"
          value={settings.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="Enter your name"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={settings.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="Enter your email"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Theme</label>
        <select
          name="theme"
          value={settings.theme}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Settings
      </button>
    </div>
  );
};

export default Setting;
