import React from 'react';

const Card = ({ formData }) => {
  return (
    <div className="bg-[#2b2b2b] rounded-lg p-6 w-full max-w-sm text-center">
      <div className="flex justify-center mb-4">
        {formData.profileImage ? (
          <img
            src={typeof formData.profileImage === 'string' 
              ? formData.profileImage 
              : URL.createObjectURL(formData.profileImage)}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/150";
            }}
          />
        ) : (
          <div className="w-24 h-24 rounded-full border-4 border-blue-500 bg-gray-600" />
        )}
      </div>
      <h3 className="text-xl font-semibold">
        {formData.firstname || 'John'} {formData.lastname || 'Doe'}
      </h3>
      <p className="text-blue-400 text-sm mb-4">{formData.profession || 'UI/UX Engineer'}</p>

      <div className="bg-[#1f1f1f] rounded-md p-4 text-left text-sm space-y-2">
        <div><strong>📞</strong> {formData.phone || '9910XXXXXX'}</div>
        <div><strong>📧</strong> {formData.email || 'info@example.com'}</div>
        <div><strong>🔗</strong> {formData.website || 'www.example.com'}</div>
      </div>

      <div className="flex justify-around text-xs text-gray-400 mt-6">
        <div><span className="block font-bold text-white">154</span>Projects</div>
        <div><span className="block font-bold text-white">2.2k</span>Followers</div>
        <div><span className="block font-bold text-white">9.1k</span>Views</div>
      </div>
    </div>
  );
};

export default Card;