import { NextResponse } from 'next/server';
import axios from 'axios';
import https from 'https';

export async function GET() {
  try {
    const agent = new https.Agent({ rejectUnauthorized: false });

    // 1. Fetch from JIIT
    const response = await axios.get('https://webportal.jiit.ac.in:6011/StudentPortalAPI/token/getcaptcha', {
      httpsAgent: agent,
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });

    // 2. Safe Extraction (Don't crash if 'hidden' is missing)
    const data = response.data?.response?.captcha;
    
    if (!data || !data.image) {
        throw new Error("Invalid Captcha Response from JIIT");
    }

    const base64Image = data.image;
    const hiddenId = data.hidden || ""; // Use empty string if missing

    // 3. Convert Image
    const imageBuffer = Buffer.from(base64Image, 'base64');

    // 4. Send Cookies + Hidden ID to Frontend
    const rawCookies = response.headers['set-cookie'];
    const headers = new Headers();
    headers.set('Content-Type', 'image/jpeg');
    headers.set('Cache-Control', 'no-store, max-age=0');
    
    // Send the ID if we found it
    if (hiddenId) {
        headers.set('X-Captcha-Hidden-Id', hiddenId); 
    }

    if (rawCookies) {
      headers.set('Set-Cookie', rawCookies.map(c => c.split(';')[0]).join('; ')); 
    }

    return new NextResponse(imageBuffer, { status: 200, headers: headers });

  } catch (error) {
    console.error("Captcha Error:", error.message);
    return NextResponse.json({ error: 'Failed to load image' }, { status: 500 });
  }
}