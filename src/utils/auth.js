// Simple client-side JWT utility (no backend needed)
// In production, JWT should be generated server-side. This demonstrates JWT structure understanding.

const JWT_SECRET = 'neutrino-veda-legacy-secret-key-2026';

function base64UrlEncode(str) {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  return atob(str);
}

// Create a simple hash for password (not cryptographically secure, but demonstrates the concept)
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

// Create a JWT-like token
export function createToken(payload) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const tokenPayload = {
    ...payload,
    iat: now,
    exp: now + 86400, // 24 hours
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(tokenPayload));
  const signature = base64UrlEncode(simpleHash(encodedHeader + '.' + encodedPayload + '.' + JWT_SECRET));

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

// Decode and validate a JWT token
export function verifyToken(token) {
  try {
    if (!token) return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = JSON.parse(base64UrlDecode(parts[1]));

    // Check expiration
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return null; // Token expired
    }

    return payload;
  } catch {
    return null;
  }
}

// Register a new user (stores in localStorage)
export function registerUser(name, email, password) {
  const users = JSON.parse(localStorage.getItem('nv_users') || '[]');

  // Check if email already exists
  if (users.find(u => u.email === email)) {
    return { success: false, error: 'An account with this email already exists.' };
  }

  const hashedPassword = simpleHash(password + JWT_SECRET);
  const user = { id: Date.now(), name, email, password: hashedPassword };
  users.push(user);
  localStorage.setItem('nv_users', JSON.stringify(users));

  const token = createToken({ id: user.id, name: user.name, email: user.email });
  localStorage.setItem('nv_token', token);

  return { success: true, token, user: { id: user.id, name: user.name, email: user.email } };
}

// Login an existing user
export function loginUser(email, password) {
  const users = JSON.parse(localStorage.getItem('nv_users') || '[]');
  const hashedPassword = simpleHash(password + JWT_SECRET);

  const user = users.find(u => u.email === email && u.password === hashedPassword);

  if (!user) {
    return { success: false, error: 'Invalid email or password.' };
  }

  const token = createToken({ id: user.id, name: user.name, email: user.email });
  localStorage.setItem('nv_token', token);

  return { success: true, token, user: { id: user.id, name: user.name, email: user.email } };
}

// Get current authenticated user from stored token
export function getCurrentUser() {
  const token = localStorage.getItem('nv_token');
  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload) {
    localStorage.removeItem('nv_token');
    return null;
  }

  return { id: payload.id, name: payload.name, email: payload.email };
}

// Logout
export function logoutUser() {
  localStorage.removeItem('nv_token');
}
