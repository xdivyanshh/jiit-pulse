import { NextResponse } from 'next/server';
import { serializePayload, generateLocalName } from '@/lib/jiit-crypto';

export async function POST(request) {
  try {
    const body = await request.json();
    const { admissionNo, password } = body;

    // --- STEP 1: GET SESSION COOKIE ---
    // Mimic the browser visiting the homepage first.
    const initResponse = await fetch("https://webportal.jiit.ac.in:6011/studentportal/", {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });

    const cookies = initResponse.headers.get("set-cookie");
    if (!cookies) throw new Error("Could not connect to JIIT Server.");

    // --- STEP 2: PREPARE PAYLOAD ---
    // I grabbed these from your "pretoken_check" screenshot.
    // Use this EXACT pair. Do not change it.
    const MAGIC_CAPTCHA = "bgwy2"; 
    const MAGIC_HIDDEN_TOKEN = "gMWqdbxEjE8="; // Common token. If login fails, this is the only thing to change.

    const rawPayload = {
      username: admissionNo,
      password: password,
      captcha: {
        captcha: MAGIC_CAPTCHA,
        hidden: MAGIC_HIDDEN_TOKEN
      }
    };

    const encryptedPayload = serializePayload(rawPayload);
    const localName = generateLocalName();

    // --- STEP 3: SEND LOGIN ---
    const loginResponse = await fetch("https://webportal.jiit.ac.in:6011/studentportal/student/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "LocalName": localName,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Cookie": cookies, 
        "Referer": "https://webportal.jiit.ac.in:6011/studentportal/",
        "Origin": "https://webportal.jiit.ac.in:6011"
      },
      body: JSON.stringify({
        "payload": encryptedPayload
      })
    });

    const responseText = await loginResponse.text();

    try {
        const data = JSON.parse(responseText);
        // Add the cookie to the response so your frontend can use it
        const res = NextResponse.json(data);
        res.headers.set('Set-Cookie', cookies); 
        return res;
    } catch (e) {
        console.error("Login Failed. Raw Response:", responseText);
        return NextResponse.json({ error: "Login failed (Invalid Response)" }, { status: 401 });
    }

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}