// CONFIGURATION
const USERNAME = "xdivyanshh";
const REPO = "jiit-pulse";
const BRANCH = "main";

// Helper to generate a URL with a timestamp to prevent caching
const getUrl = (file) => 
  `https://raw.githubusercontent.com/${USERNAME}/${REPO}/${BRANCH}/${file}?v=${new Date().getTime()}`;

export async function fetchDatabase() {
  try {
    const classesUrl = getUrl("src/data/classes.json");
    const metadataUrl = getUrl("metadata.json");

    console.log("Fetching Classes:", classesUrl);
    console.log("Fetching Metadata:", metadataUrl);

    // Fetch both files in parallel
    const [classesRes, metadataRes] = await Promise.all([
      fetch(classesUrl),
      fetch(metadataUrl)
    ]);

    // Check for HTTP errors (like 404)
    if (!classesRes.ok) throw new Error(`Classes.json failed: ${classesRes.status}`);
    if (!metadataRes.ok) throw new Error(`Metadata.json failed: ${metadataRes.status}`);

    // Parse JSON
    const classes = await classesRes.json();
    const metadata = await metadataRes.json();

    return { classes, metadata };
  } catch (error) {
    console.error("DATABASE ERROR:", error);
    return null;
  }
}