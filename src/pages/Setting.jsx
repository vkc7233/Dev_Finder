import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Mail, Lock, Bell, Save, Check } from 'lucide-react';

const Setting = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  // Form states
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [emailData, setEmailData] = useState({
    currentEmail: 'alex.johnson@example.com',
    newEmail: ''
  });

  const [notifications, setNotifications] = useState({
    newMatches: true,
    messages: true,
    profileViews: false,
    weeklyDigest: true,
    emailNotifications: true,
    pushNotifications: true
  });

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEmailChange = (value) => {
    setEmailData(prev => ({
      ...prev,
      newEmail: value
    }));
  };

  const handleNotificationToggle = (setting) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSave = (section) => {
    setSaveStatus(section);
    setTimeout(() => {
      setSaveStatus('');
    }, 2000);
  };

  const ToggleSwitch = ({ enabled, onToggle }) => (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
        enabled ? 'bg-blue-500' : 'bg-gray-600'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  const SaveButton = ({ onClick, section, children }) => (
    <button
      onClick={() => onClick(section)}
      className="flex items-center justify-center px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium text-sm min-w-[100px]"
    >
      {saveStatus === section ? (
        <>
          <Check size={16} className="mr-2" />
          Saved
        </>
      ) : (
        <>
          <Save size={16} className="mr-2" />
          {children}
        </>
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/*  Header */}
      <div className="border-b border-gray-800 bg-[#0f0f0f] sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16">
            <button 
              className="mr-4 p-2 hover:bg-gray-800 rounded-lg transition-colors group"
              onClick={() => window.history.back()}
            >
              <ArrowLeft 
                size={20} 
                className="text-gray-400 group-hover:text-blue-500 transition-colors" 
              />
            </button>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">
                Dev<span className="text-blue-500">Settings</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-8">
        {/* Password Section */}
        <div className="bg-[#1c1c1c] rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3 border border-blue-500/30">
              <Lock size={18} className="text-blue-400" />
            </div>
            <h2 className="text-lg font-semibold">Security Settings</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={passwordData.currentPassword}
                  onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                  className="w-full bg-[#2b2b2b] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                >
                  {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={passwordData.newPassword}
                  onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                  className="w-full bg-[#2b2b2b] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={passwordData.confirmPassword}
                  onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                  className="w-full bg-[#2b2b2b] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <SaveButton onClick={handleSave} section="password">
                Update Password
              </SaveButton>
            </div>
          </div>
        </div>

        {/* Email Section */}
        <div className="bg-[#1c1c1c] rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3 border border-blue-500/30">
              <Mail size={18} className="text-blue-400" />
            </div>
            <h2 className="text-lg font-semibold">Email Settings</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Current Email
              </label>
              <input
                type="email"
                value={emailData.currentEmail}
                disabled
                className="w-full bg-slate-800/30 border border-slate-700 rounded-lg px-4 py-3 text-slate-400 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                New Email Address
              </label>
              <input
                type="email"
                value={emailData.newEmail}
                onChange={(e) => handleEmailChange(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder="Enter new email address"
              />
            </div>

            <div className="pt-2">
              <SaveButton onClick={handleSave} section="email">
                Update Email
              </SaveButton>
            </div>
          </div>
        </div>

        {/* Enhanced Notifications Section */}
        <div className="bg-[#1c1c1c] rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3 border border-blue-500/30">
              <Bell size={18} className="text-blue-400" />
            </div>
            <h2 className="text-lg font-semibold">Developer Notifications</h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-white">Project Matches</h3>
                <p className="text-sm text-gray-400">Get notified when you match with potential collaborators</p>
              </div>
              <ToggleSwitch
                enabled={notifications.newMatches}
                onToggle={() => handleNotificationToggle('newMatches')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-white">Messages</h3>
                <p className="text-sm text-gray-400">New message notifications</p>
              </div>
              <ToggleSwitch
                enabled={notifications.messages}
                onToggle={() => handleNotificationToggle('messages')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-white">Profile Views</h3>
                <p className="text-sm text-gray-400">When someone views your profile</p>
              </div>
              <ToggleSwitch
                enabled={notifications.profileViews}
                onToggle={() => handleNotificationToggle('profileViews')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-white">Weekly Digest</h3>
                <p className="text-sm text-gray-400">Weekly summary of your activity</p>
              </div>
              <ToggleSwitch
                enabled={notifications.weeklyDigest}
                onToggle={() => handleNotificationToggle('weeklyDigest')}
              />
            </div>

            <hr className="border-slate-700" />

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-white">Email Notifications</h3>
                <p className="text-sm text-gray-400">Receive notifications via email</p>
              </div>
              <ToggleSwitch
                enabled={notifications.emailNotifications}
                onToggle={() => handleNotificationToggle('emailNotifications')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-white">Push Notifications</h3>
                <p className="text-sm text-gray-400">Mobile push notifications</p>
              </div>
              <ToggleSwitch
                enabled={notifications.pushNotifications}
                onToggle={() => handleNotificationToggle('pushNotifications')}
              />
            </div>

            <div className="pt-2">
              <SaveButton onClick={handleSave} section="notifications">
                Save Preferences
              </SaveButton>
            </div>
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={() => handleSave('all')}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 hover:from-blue-700 hover:to-blue-800 shadow-lg"
          >
            <Save size={18} className="inline-block mr-2" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setting;