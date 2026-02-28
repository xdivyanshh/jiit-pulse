import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, course, semester, reason, contact, club, timestamp } = req.body;

    // Insert into Supabase
    const { error } = await supabase.from('club_applications').insert([
      {
        name,
        course,
        semester,
        reason,
        contact,
        club,
        submitted_at: timestamp
      }
    ]);

    if (error) {
      console.error('Supabase Error:', error);
      throw error;
    }

    return res.status(200).json({ success: true, message: 'Application received' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}