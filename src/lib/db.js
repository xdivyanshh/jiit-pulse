// src/lib/db.js

// REPLACE the top line with this:
const REPO_BASE = "https://raw.githubusercontent.com/xdivyanshh/jiit-pulse/refs/heads/main/classes.json";

// The rest of your code in that file looks correct!

export async function fetchDatabase() {
  // Timestamp to prevent caching
  const time = Date.now();

  try {
    console.log("Fetching database from:", REPO_BASE);
    
    // Fetch both files in parallel
    const [metadataRes, classesRes] = await Promise.all([
      fetch(`${REPO_BASE}/metadata.json?t=${time}`),
      fetch(`${REPO_BASE}/classes.json?t=${time}`)
    ]);

    if (!metadataRes.ok || !classesRes.ok) {
      console.error("Fetch failed:", metadataRes.status, classesRes.status);
      throw new Error("Failed to fetch database files");
    }

    const metadata = await metadataRes.json();
    const classes = await classesRes.json();

    return { metadata, classes };
  } catch (error) {
    console.error("Database Error:", error);
    return null;
  }
}