import crypto from 'crypto';

// --- CONSTANTS FROM PYJIIT ---
const IV = Buffer.from("dcek9wb8frty1pnm", "utf-8");
const KEY_PREFIX = "qa8y";
const KEY_SUFFIX = "ty1pn";

/**
 * 1. TIMEZONE FIX (Crucial)
 * Returns the current time in Indian Standard Time (IST).
 * Without this, the server key will be wrong if your PC/Server isn't in India.
 */
function getISTDate() {
  const date = new Date();
  const utcOffset = date.getTime() + (date.getTimezoneOffset() * 60000);
  const istOffset = 5.5 * 60 * 60 * 1000; // +5:30 UTC
  return new Date(utcOffset + istOffset);
}

/**
 * 2. DATE SEQUENCE GENERATOR (The "Secret Sauce")
 * Replicates `pyjiit.utils.generate_date_seq` exactly.
 */
function generateDateSeq() {
  const now = getISTDate();

  const day = String(now.getDate()).padStart(2, '0');        // Python "i"
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Python "a"
  const year = String(now.getFullYear()).slice(2);           // Python "r"

  // FIX: Convert JS Day (Sun=0) to Python Day (Mon=0)
  const jsDay = now.getDay();
  const pyDay = jsDay === 0 ? 6 : jsDay - 1; 
  const weekday = String(pyDay);                             // Python "t"

  // Python logic: i[0] + a[0] + r[0] + t + i[1] + a[1] + r[1]
  return (
    day[0] + 
    month[0] + 
    year[0] + 
    weekday + 
    day[1] + 
    month[1] + 
    year[1]
  );
}

function getRandomCharSeq(length) {
  const charset = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}

/**
 * 3. KEY GENERATION
 * Replicates `pyjiit.encryption.generate_key`
 */
function generateKey() {
  const dateSeq = generateDateSeq();
  const keyString = `${KEY_PREFIX}${dateSeq}${KEY_SUFFIX}`; // qa8y + date + ty1pn
  return Buffer.from(keyString, "utf-8");
}

/**
 * 4. AES ENCRYPTION
 * Replicates `pyjiit.encryption.encrypt`
 */
function encryptAES(text) {
  const key = generateKey();
  const cipher = crypto.createCipheriv('aes-128-cbc', key, IV);
  
  // Python uses standard padding (PKCS7) which Node.js does by default.
  let encrypted = cipher.update(text, 'utf-8', 'base64');
  encrypted += cipher.final('base64');
  
  return encrypted;
}

// --- PUBLIC EXPORTS (Use these in your route) ---

export function generateLocalName() {
  const dateSeq = generateDateSeq();
  const rand4 = getRandomCharSeq(4);
  const rand5 = getRandomCharSeq(5);
  
  // Python: base64(encrypt(rand4 + date + rand5))
  // JS encryptAES returns Base64, so we are good.
  return encryptAES(`${rand4}${dateSeq}${rand5}`);
}

export function serializePayload(payload) {
  // Python: json.dumps(separators=(',', ':')) -> Compact JSON with no spaces
  const jsonString = JSON.stringify(payload); 
  return encryptAES(jsonString);
}