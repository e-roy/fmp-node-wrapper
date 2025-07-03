---
name: Bug Report
about: Create a report to help us improve the library
title: '[BUG] '
labels: ['bug', 'needs-triage']
assignees: ''
---

## Bug Description

**Describe the bug**
A clear and concise description of what the bug is.

## Reproduction Steps

**To Reproduce**
Steps to reproduce the behavior:

1. Install the library: `npm install fmp-node-api`
2. Import and initialize: `import { FMP } from 'fmp-node-api'`
3. Call the method: `const result = await fmp.stock.getQuote({ symbol: 'AAPL' })`
4. See error

## Expected vs Actual Behavior

**Expected behavior**
A clear and concise description of what you expected to happen.

**Actual behavior**
A clear and concise description of what actually happened.

## Environment Information

**Environment:**

- Node.js version: [e.g. 18.17.0]
- OS: [e.g. macOS, Windows, Linux]
- Library version: [e.g. 1.0.0]
- FMP API key: [Yes/No]

## Code Example

**Code to reproduce the issue:**

```typescript
import { FMP } from 'fmp-node-api';

const fmp = new FMP({ apiKey: 'your-api-key' });

try {
  const result = await fmp.stock.getQuote({ symbol: 'AAPL' });
  console.log(result);
} catch (error) {
  console.error('Error:', error);
}
```

## Error Information

**Error messages or stack traces:**

```
Paste any error messages or stack traces here
```

**Console output:**

```
Paste any console output here
```

## Additional Context

**Additional context**
Add any other context about the problem here, such as:

- When did this start happening?
- Does it happen with all symbols or specific ones?
- Are you using any specific configuration?
- Have you tried with a different API key?

## Checklist

Before submitting this bug report, please confirm:

- [ ] I have searched existing issues to avoid duplicates
- [ ] I have tested with the latest version of the library
- [ ] I have provided a minimal reproduction of the problem
- [ ] I have included all relevant environment information
- [ ] I have included code examples that reproduce the issue
- [ ] I have checked that this is not an issue with the underlying FMP API service

## Related Issues

**Related issues:**

- Link to any related issues here

---

**Note:** If this appears to be an issue with the underlying Financial Modeling Prep API service (not this wrapper), please contact FMP directly at their [official support channels](https://site.financialmodelingprep.com/developer/docs/stable).
