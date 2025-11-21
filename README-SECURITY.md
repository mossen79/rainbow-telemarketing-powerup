# 🔒 Security Guidelines - Rainbow Telemarketing Power-Up

## ⚠️ IMPORTANT: API Key Management

### Problem
Previous versions (< 1.1.0) had hardcoded Trello API keys in source files. This is a **security risk** when deploying to public GitHub repositories.

### Solution (v1.1.0+)

#### Option 1: Use config.js (Recommended for GitHub Pages)

1. **Create `config.js`** in project root:
```javascript
const CONFIG = {
    TRELLO_APP_KEY: 'YOUR_ACTUAL_API_KEY_HERE',
    APP_NAME: 'Rainbow Telemarketing Scripts',
    APP_VERSION: '1.1.0'
};
```

2. **Add to .gitignore** (already done):
```
config.js
```

3. **Deploy**:
   - GitHub Pages: Upload config.js separately (not via git)
   - Or use GitHub Secrets + Actions to inject at build time

#### Option 2: Use Environment Variables (Recommended for CI/CD)

1. **Create `.env`** file:
```bash
TRELLO_APP_KEY=your_key_here
```

2. **Build script** (if using bundler):
```javascript
// webpack.config.js or similar
plugins: [
  new webpack.DefinePlugin({
    'process.env.TRELLO_APP_KEY': JSON.stringify(process.env.TRELLO_APP_KEY)
  })
]
```

#### Option 3: Runtime Configuration (Advanced)

Load config from secure backend:
```javascript
const response = await fetch('https://your-secure-backend.com/api/config');
const config = await response.json();
const APP_KEY = config.TRELLO_APP_KEY;
```

---

## 🚨 What NOT to Commit to Git

### ❌ NEVER commit:
- `config.js` with real API keys
- `.env` files
- Any file containing:
  - API keys
  - Access tokens
  - Passwords
  - Customer personal data (RODO/GDPR)

### ✅ SAFE to commit:
- `config.js.example` (with placeholder values)
- `.env.example` (template)
- Documentation about configuration

---

## 🛡️ Security Best Practices

### 1. API Key Scope Limitation

In Trello Developer Portal:
- ✅ Limit to specific boards
- ✅ Set read-only where possible
- ✅ Use token expiration
- ❌ Avoid "write" scope if not needed

### 2. HTTPS Only

GitHub Pages uses HTTPS automatically ✅

For custom domains:
```html
<!-- Force HTTPS redirect -->
<script>
  if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
    location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
  }
</script>
```

### 3. Content Security Policy (CSP)

Add to HTML `<head>`:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' https://p.trellocdn.com; 
               connect-src 'self' https://api.trello.com;
               style-src 'self' 'unsafe-inline';">
```

### 4. Input Validation

Already implemented in v1.1.0:
- ✅ Date validation (no past dates)
- ✅ Date range limits (3 months)
- ✅ Type checking for user inputs

### 5. Error Handling

Never expose sensitive info in errors:
```javascript
// ❌ BAD
catch (error) {
  alert('Error: ' + error.message); // May expose internals
}

// ✅ GOOD
catch (error) {
  console.error('Internal error:', error); // Log for debugging
  showNotification('Wystąpił błąd. Spróbuj ponownie.', 'error'); // User-friendly message
}
```

---

## 🔍 Security Checklist for Deployment

### Before pushing to GitHub:

- [ ] No hardcoded API keys in any file
- [ ] `config.js` is in `.gitignore`
- [ ] `.env` is in `.gitignore`
- [ ] Checked all `.html`, `.js` files for secrets
- [ ] Used `git grep -i "api.*key"` to search

### Before deploying to production:

- [ ] API keys are stored securely (not in git)
- [ ] HTTPS is enforced
- [ ] CSP headers are set (optional but recommended)
- [ ] Error messages don't expose internals
- [ ] Trello API scope is minimal (read/write only what's needed)

### Regular maintenance:

- [ ] Rotate API keys every 6 months
- [ ] Review Trello app permissions
- [ ] Check for dependency vulnerabilities (if using npm)
- [ ] Monitor GitHub Security Advisories

---

## 📞 Reporting Security Issues

If you find a security vulnerability:

**DO NOT** open a public GitHub issue.

Instead:
1. Email: [your-security-email@example.com]
2. Or use GitHub Security Advisories (Private)
3. Include:
   - Description of vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

We'll respond within 48 hours.

---

## 🔗 Resources

- [Trello API Authentication Guide](https://developer.atlassian.com/cloud/trello/guides/rest-api/authorization/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [GitHub Security Best Practices](https://docs.github.com/en/code-security)
- [RODO/GDPR Compliance](https://gdpr.eu/)

---

## 📜 Compliance

### RODO/GDPR

This app:
- ✅ Does NOT store personal data on servers
- ✅ Processes data only in browser (client-side)
- ✅ Saves to Trello (user's own workspace)
- ✅ No third-party data sharing
- ✅ User can delete comments in Trello anytime

### Data Processing:
- Conversation history: Stored in Trello comments (user's control)
- No analytics tracking (unless explicitly added)
- No cookies (except Trello's own)

---

**Last Updated**: 2025-11-21  
**Security Version**: 1.1.0  
**Maintainer**: [Your Name/Team]

