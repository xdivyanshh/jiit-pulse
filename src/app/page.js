"use client";

import React, { useState, useEffect } from 'react';
import LandingPage from '../components/LandingPage';
import CollegeHub from '../components/CollegeHub';
import allBatches128 from '../../classes.json';
import { getStudentProfile } from '../utils/studentProfile';
import { requestNotificationPermission, checkScheduleAndNotify } from '../utils/notificationService';

export default function Page() {
  // State to track which campus the user has selected (null, '62', or '128')
  const [selectedCampus, setSelectedCampus] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Only set isLoaded to true. DO NOT auto-select from localStorage.
  // This ensures the Landing Page is always shown first.
  useEffect(() => {
    setIsLoaded(true);
    
    // Check for saved profile to auto-redirect
    const profile = getStudentProfile();
    if (profile && profile.campus) {
      setSelectedCampus(profile.campus);
    }

    // Initialize notifications
    requestNotificationPermission();
    const interval = setInterval(() => {
      const currentProfile = getStudentProfile();
      if (currentProfile) {
        checkScheduleAndNotify(currentProfile, allBatches128);
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const handleSelect = (campus) => {
    setSelectedCampus(campus);
    // We still save it (optional), but we won't read it on startup anymore.
    localStorage.setItem('selectedCampus', campus);
  };

  const handleSwitch = () => {
    setSelectedCampus(null);
    localStorage.removeItem('selectedCampus');
  };

  // Prevent hydration mismatch by waiting for mount
  if (!isLoaded) return null;

  // 1. If no campus is selected, show the Landing Page
  if (!selectedCampus) {
    return <LandingPage onSelect={handleSelect} />;
  }

  // 2. If a campus is selected, show the Main App (CollegeHub)
  return <CollegeHub campus={selectedCampus} onBack={handleSwitch} />;
}