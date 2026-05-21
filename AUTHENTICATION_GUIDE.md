# 🔐 KiranaCloud Authentication Guide

## Login Options

### 1. **Email + Password Login**
- Enter valid email (e.g., `test@example.com`)
- Click "अगाडि बढ्नुस्" (Next)
- Verification code will appear in **Browser Console (F12)**
- Enter the code from console
- Enter password (min 6 characters)
- Setup store name (optional) or skip

### 2. **Google Sign-In** ⭐ (NOW WORKING!)
- Click "Google सँग साइन गर्नुस्" button
- Demo accounts available:
  - `ramesh@gmail.com` (Ramesh Poudel)
  - `anita@gmail.com` (Anita Sharma)
  - `demo@gmail.com` (Demo User)
- First account (Ramesh) auto-selected for demo
- Setup store name (optional) or skip
- Dashboard opens with your profile

## Key Features

✅ **Email Validation** - Valid email format required
✅ **Email Verification** - 6-digit code verification
✅ **Secure Password** - Minimum 6 characters
✅ **Google Sign-In** - One-click authentication (demo mode)
✅ **Store Setup** - Optional store name and location
✅ **User Profile** - Name shown in avatar (first letter)
✅ **Logout** - Click avatar to logout with confirmation

## Testing Credentials

**Email Login:**
- Email: any valid email
- Password: any 6+ characters
- Verification Code: Check browser console (F12)

**Google Sign-In:**
- Just click "Google सँग साइन गर्नुस्"
- Auto-login with demo account

## Browser Console Debug

When you send verification email in demo mode, open:
- **F12** → Console tab
- You'll see: `Verification code (demo): 123456`
- Use that code in the verification form

## Production Setup

To enable real Google Sign-In:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials (Web application type)
3. Add your domain to **Authorized JavaScript origins** (e.g., `http://localhost:5500` for local dev, or your live domain)
4. Copy the **Client ID**
5. Open `login.html` and replace the value of `GOOGLE_CLIENT_ID` at line 119 with your actual Client ID:

```javascript
const GOOGLE_CLIENT_ID = 'your-actual-client-id.apps.googleusercontent.com';
```

The Google Identity Services (GIS) library is already loaded and the `handleCredentialResponse()` callback is ready. When a real Client ID is set and the user clicks "Google सँग साइन गर्नुस्", the One Tap/account picker will appear. Once the user selects their account, the JWT is decoded and the user is authenticated automatically.

If no real Client ID is configured, it falls back to demo accounts automatically.

## Database Structure

All user data stored in `localStorage` with `kc_` prefix:
- `kc_userEmail` - User email
- `kc_userName` - User name
- `kc_storeInfo` - Store details (name, location)
- `kc_loginMethod` - 'email' or 'google'
- `kc_isGoogleSignIn` - Boolean flag for Google login

## Security Notes

⚠️ **Demo Only** - This is for development/demo purposes
- Passwords stored in localStorage (never do in production)
- No backend validation
- No real email verification

**For Production:**
- Use secure backend API
- Hash passwords with bcrypt
- Send real emails for verification
- Use OAuth 2.0 properly with backend exchange
- Implement HTTPS only
- Use secure session management

---

**Enjoy using KiranaCloud!** 🛒
