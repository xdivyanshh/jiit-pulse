// app/schedule/page.jsx

import { getBatchSchedule } from '@/lib/fetchSchedule';

export default async function SchedulePage() {
  // Hardcoded for testing. Later, you can let users select these dynamically!
  const course = "BTech";
  const semester = "6";
  const phase = "P2";
  const batch = "B1";

  // Call the function from your lib folder
  const mySchedule = await getBatchSchedule(course, semester, phase, batch);

  if (!mySchedule) {
    return <div>Could not load schedule for {course} - {batch}.</div>;
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">My Class Schedule</h1>
      
      {/* Simple rendering of the raw data to see if it works */}
      <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
        {JSON.stringify(mySchedule, null, 2)}
      </pre>
    </main>
  );
}