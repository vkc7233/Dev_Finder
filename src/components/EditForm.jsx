import React from 'react';

const EditForm = ({ formData, handleChange, handleSubmit, loading, handleImageUpload }) => {
    return (
        <form className="w-full space-y-4" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            <div className="grid grid-cols-2 gap-4">
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="bg-black border border-gray-600 rounded-md px-3 py-2 focus:outline-none"
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="bg-black border border-gray-600 rounded-md px-3 py-2 focus:outline-none"
                />
            </div>
            <div className="grid grid-cols-3 gap-2">
                <input type="text" name="day" placeholder="DD" value={formData.dob.day} onChange={handleChange} className="bg-black border border-gray-600 rounded-md px-3 py-2" />
                <input type="text" name="month" placeholder="MM" value={formData.dob.month} onChange={handleChange} className="bg-black border border-gray-600 rounded-md px-3 py-2" />
                <input type="text" name="year" placeholder="YYYY" value={formData.dob.year} onChange={handleChange} className="bg-black border border-gray-600 rounded-md px-3 py-2" />
            </div>
            <input type="text" name="profession" placeholder="Profession" value={formData.profession} onChange={handleChange} className="w-full bg-black border border-gray-600 rounded-md px-3 py-2" />
            <input type="text" name="bio" placeholder="Bio" value={formData.bio} onChange={handleChange} className="w-full bg-black border border-gray-600 rounded-md px-3 py-2" />
            <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="w-full bg-black border border-gray-600 rounded-md px-3 py-2" />
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full text-sm text-gray-400"
            />
            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 w-full mt-4 disabled:opacity-50"
            >
                {loading ? 'Saving...' : 'Save Changes'}
            </button>
        </form>
    );
};

export default EditForm;
