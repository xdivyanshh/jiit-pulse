const PROFILE_KEY = 'jiit_pulse_student_profile';

export const getStudentProfile = () => {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(PROFILE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error("Error reading profile", e);
    return null;
  }
};

export const saveStudentProfile = (profile) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error("Error saving profile", e);
  }
};
