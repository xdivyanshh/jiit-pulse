import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import { cookies } from 'next/headers';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export async function POST(req) {
  try {
    const body = await req.json();
    const { enrollment, password, captcha, hidden } = body;

    console.log(`🔹 Starting Login Flow for: ${enrollment}`);

    const jar = new CookieJar();
    const cookieStore = await cookies();
    cookieStore.getAll().forEach((c) => {
      jar.setCookieSync(`${c.name}=${c.value}`, 'https://webportal.jiit.ac.in:6011');
    });

    const client = wrapper(axios.create({
      jar,
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://webportal.jiit.ac.in:6011',
        'Referer': 'https://webportal.jiit.ac.in:6011/studentportal/'
      }
    }));

    // ---------------------------------------------------------
    // STEP 1: PRE-CHECK (Standard)
    // ---------------------------------------------------------
    console.log("🔹 Step 1: Pre-token Check...");
    await client.post('https://webportal.jiit.ac.in:6011/StudentPortalAPI/token/pretoken-check', {
        userid: enrollment, 
        captcha: captcha, 
        memberType: "S"
    });

    // ---------------------------------------------------------
    // STEP 2: LOGIN (Using Hidden ID - Validated Working)
    // ---------------------------------------------------------
    console.log("🔹 Step 2: Logging In...");
    
    const loginPayload = {
      userid: enrollment,
      password: password,
      captcha: captcha,
      memberType: "S",
      identifier: hidden 
    };

    const loginRes = await client.post('https://webportal.jiit.ac.in:6011/StudentPortalAPI/token/generate-token1', loginPayload);

    if (!loginRes.data || loginRes.data.responseStatus !== "Success") {
        throw new Error(loginRes.data?.msg || "Login Failed - Check Password/Captcha");
    }

    // 🛑 CRITICAL: EXTRACT DYNAMIC DATA
    // We stop hardcoding IDs. We use exactly what the server gives us.
    const regData = loginRes.data.response.regdata;
    const token = regData.token;
    const clientid = regData.clientid;
    const instituteid = regData.institutelist[0].value; // <--- This fixes the 404!
    const memberid = regData.memberid;
    
    console.log(`✅ Login Success! (Institute: ${instituteid})`);

    // ---------------------------------------------------------
    // STEP 2.5: WARM-UP (Personal Info)
    // ---------------------------------------------------------
    // The official app hits this first. We do too.
    console.log("🔹 Step 2.5: Warming up session...");
    await client.post(
        'https://webportal.jiit.ac.in:6011/StudentPortalAPI/studentpersinfo/getstudent-personalinformation',
        { clientid: "SOAU", instituteid: instituteid }, // Payload from jsjiit logs
        { headers: { 'Authorization': `Bearer ${token}` } }
    );

    // ---------------------------------------------------------
    // STEP 3: REGISTRATION (The 404 Fix)
    // ---------------------------------------------------------
    console.log("🔹 Step 3: Fetching Registration...");
    
    // Exact URL from jsjiit source (Note: 'attendence' spelling)
    const regUrl = 'https://webportal.jiit.ac.in:6011/StudentPortalAPI/StudentClassAttendance/getstudentInforegistrationforattendence';
    
    const regRes = await client.post(regUrl, 
        { clientid, instituteid, membertype: "S" },
        { headers: { 'Authorization': `Bearer ${token}` } }
    );
    
    const responseData = regRes.data.response || {};
    
    // Auto-find the list (Fixes crashes if key name changes)
    const listKey = Object.keys(responseData).find(key => Array.isArray(responseData[key]));
    if (!listKey) throw new Error("Semester List not found.");
    
    const regList = responseData[listKey];
    if (!regList || regList.length === 0) throw new Error("No enrollment found.");

    const { registrationid, registrationcode } = regList[0];
    const styNumber = responseData.headerlist?.[0]?.stynumber || "";

    console.log(`✅ ID Found: ${registrationcode}`);

    // ---------------------------------------------------------
    // STEP 4: FETCH ATTENDANCE
    // ---------------------------------------------------------
    console.log("🔹 Step 4: Fetching Attendance...");

    const attRes = await client.post(
        'https://webportal.jiit.ac.in:6011/StudentPortalAPI/StudentClassAttendance/getstudentattendancedetail', 
        {
            clientid,
            instituteid,
            registrationcode,
            registrationid,
            stynumber: styNumber
        },
        { headers: { 'Authorization': `Bearer ${token}` } }
    );

    return new Response(JSON.stringify({ success: true, data: attRes.data }), { status: 200 });

  } catch (error) {
    console.error("❌ Process Failed:", error.message);
    if (error.response) console.error("Server Error Data:", error.response.data);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}