// src/lib/fetchSchedule.js
const CDN_URL = "https://raw.githubusercontent.com/codelif/jiit-planner-cdn/refs/heads/main/classes.json";

export async function getAllClasses() {
  try {
    const response = await fetch(CDN_URL);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch all classes:", error);
    return null;
  }
}

export async function getScheduleData(course, semester, phase, batch) {
  try {
    const allData = await getAllClasses();
    if (!allData) return null;
    const key = `${course}_${semester}_${phase}_${batch}`;
    return allData[key] || null;
  } catch (error) {
    console.error("Failed to fetch schedule:", error);
    return null;
  }
}