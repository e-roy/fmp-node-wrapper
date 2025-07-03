---
name: API Issue
about: Report an issue related to the FMP API service or data
title: '[API] '
labels: ['api-issue', 'needs-triage']
assignees: ''
---

## API Issue Description

**Describe the issue**
A clear and concise description of the API-related issue you're experiencing.

**Is this related to:**

- [ ] Data accuracy or availability from FMP API
- [ ] API rate limiting or quota issues
- [ ] API endpoint changes or deprecation
- [ ] Authentication or API key issues
- [ ] Response format changes
- [ ] Other API service issue

## FMP API Information

**FMP API Endpoint:**

- Endpoint: [e.g., `/quote/AAPL`]
- Method: [GET/POST]
- API Plan: [Free/Basic/Premium/Enterprise]

**API Response:**

```json
// Paste the actual API response here
{
  "error": "API Error Message",
  "status": 429
}
```

## Reproduction Steps

**To Reproduce**

1. Call the FMP API endpoint directly: `curl "https://financialmodelingprep.com/stable/quote/AAPL?apikey=YOUR_KEY"`
2. Or use the wrapper: `await fmp.stock.getQuote({ symbol: 'AAPL' })`
3. See the issue

## Expected vs Actual API Response

**Expected API response:**

```json
[
  {
    "symbol": "AAPL",
    "price": 150.25,
    "change": 2.15
  }
]
```

**Actual API response:**

```json
{
  "Error Message": "API key limit reached"
}
```

## Environment Information

**Environment:**

- Node.js version: [e.g., 18.17.0]
- Library version: [e.g., 1.0.0]
- FMP API key type: [Free/Basic/Premium/Enterprise]
- API calls per day: [e.g., 100/1000]

## Code Example

**Code that reproduces the issue:**

```typescript
import { FMP } from 'fmp-node-api';

const fmp = new FMP({ apiKey: 'your-api-key' });

try {
  const result = await fmp.stock.getQuote({ symbol: 'AAPL' });
  console.log('API Response:', result);
} catch (error) {
  console.error('Error:', error);
}
```

## Direct API Test

**Direct API call result:**

```bash
curl "https://financialmodelingprep.com/stable/quote/AAPL?apikey=YOUR_KEY"
```

**Response:**

```json
// Paste the direct API response here
```

## Troubleshooting Steps Taken

**What have you tried?**

- [ ] Tested with a different API key
- [ ] Tested the endpoint directly via curl/browser
- [ ] Checked FMP API documentation
- [ ] Verified API key permissions
- [ ] Checked rate limits and quotas
- [ ] Tested with different symbols/parameters

## Additional Context

**Additional context:**

- When did this start happening?
- Does it happen with all symbols or specific ones?
- Are you hitting rate limits?
- Have you contacted FMP support about this?

## Checklist

Before submitting this API issue, please confirm:

- [ ] I have tested the FMP API endpoint directly
- [ ] I have verified my API key is valid and has proper permissions
- [ ] I have checked my API usage limits and quotas
- [ ] I have searched existing issues for similar problems
- [ ] I have provided the actual API response data
- [ ] I understand this may be an FMP service issue, not a wrapper issue

## Next Steps

**If this is confirmed to be an FMP API issue:**

- This issue will be documented for other users
- You should contact FMP support directly for resolution
- Consider checking FMP's status page for service issues

**FMP Support Resources:**

- [FMP API Documentation](https://site.financialmodelingprep.com/developer/docs/stable)
- [FMP Support](https://site.financialmodelingprep.com/developer/docs/stable)
- [FMP Status Page](https://status.financialmodelingprep.com) (if available)

---

**Important:** This template is for issues related to the underlying Financial Modeling Prep API service. For issues with this wrapper library itself, please use the "Bug Report" template instead.
