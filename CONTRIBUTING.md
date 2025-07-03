# Contributing to FMP Node Wrapper

Thank you for your interest in contributing to the FMP Node Wrapper! This document provides detailed guidelines for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Code Quality](#code-quality)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Release Process](#release-process)

## Code of Conduct

This project is committed to providing a welcoming and inclusive environment for all contributors. Please be respectful and constructive in all interactions.

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Git
- A Financial Modeling Prep API key (for testing)

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/fmp-node-wrapper.git
   cd fmp-node-wrapper
   ```
3. Add the upstream remote:
   ```bash
   git remote add upstream https://github.com/e-roy/fmp-node-wrapper.git
   ```

## Development Setup

### Install Dependencies

```bash
# Install all workspace dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Add your FMP_API_KEY to .env for testing
```

### Build the Project

```bash
# Build all packages
pnpm build

# Or build individual packages
pnpm api:build
pnpm docs:build
```

### Verify Setup

```bash
# Run all tests
pnpm test

# Check code quality
pnpm lint
pnpm type-check
```

## Making Changes

### Branch Naming

Create feature branches with descriptive names:

```bash
# Good branch names
git checkout -b feature/add-new-endpoint
git checkout -b fix/stock-quote-validation
git checkout -b docs/update-api-examples

# Avoid generic names
git checkout -b feature
git checkout -b fix
```

### Code Style

#### TypeScript Guidelines

- Use strict TypeScript settings
- Prefer `interface` over `type` for object shapes
- Use `const` assertions for readonly data
- Avoid `any` - use proper types or `unknown`
- Use union types for multiple possible values
- Prefer optional properties over union with `undefined`

#### Naming Conventions

- **Files**: kebab-case (`stock-endpoints.ts`)
- **Functions**: camelCase (`getStockQuote`)
- **Classes**: PascalCase (`StockEndpoints`)
- **Interfaces**: PascalCase with `I` prefix for complex ones (`IStockQuote`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Types**: PascalCase (`StockQuoteResponse`)

#### Code Organization

```typescript
// 1. Imports (external first, then internal)
import axios from 'axios';
import { FMPClient } from '../client';
import { StockQuote } from '../types/stock';

// 2. Constants
const ENDPOINT = '/quote';

// 3. Types/Interfaces
interface QuoteParams {
  symbol: string;
}

// 4. Main class/function
export class StockEndpoints {
  constructor(private client: FMPClient) {}

  async getQuote(params: QuoteParams): Promise<APIResponse<StockQuote[]>> {
    // Implementation
  }
}
```

### Adding New Endpoints

When adding new endpoints, follow this structure:

1. **Add types** in the appropriate type file (`src/types/stock.ts`, etc.)
2. **Add endpoint method** in the appropriate endpoint class
3. **Add validation** in `src/utils/validation.ts`
4. **Add tests** in the corresponding test file
5. **Update documentation** in README files

Example endpoint addition:

```typescript
// 1. Add to types/stock.ts
export interface NewEndpointResponse {
  field1: string;
  field2: number;
}

// 2. Add to endpoints/stock.ts
async getNewEndpoint(params: NewEndpointParams): Promise<APIResponse<NewEndpointResponse[]>> {
  const validatedParams = validateNewEndpointParams(params);
  return this.client.get('/new-endpoint', validatedParams);
}

// 3. Add to utils/validation.ts
export function validateNewEndpointParams(params: NewEndpointParams): ValidatedParams {
  // Validation logic
}

// 4. Add tests
describe('getNewEndpoint', () => {
  it('should return valid data', async () => {
    // Test implementation
  });
});
```

## Testing

### Test Structure

Tests are organized as follows:

```
src/__tests__/
├── client.test.ts           # HTTP client tests
├── fmp.test.ts             # Main FMP class tests
├── integration.test.ts      # Integration tests
├── endpoints/              # Endpoint-specific tests
│   ├── stock.test.ts
│   ├── financial.test.ts
│   └── ...
├── types/                  # Type definition tests
└── utils/                  # Utility function tests
```

### Writing Tests

#### Unit Tests

```typescript
describe('StockEndpoints', () => {
  let endpoints: StockEndpoints;
  let mockClient: jest.Mocked<FMPClient>;

  beforeEach(() => {
    mockClient = createMockClient();
    endpoints = new StockEndpoints(mockClient);
  });

  describe('getQuote', () => {
    it('should return stock quote data', async () => {
      const mockResponse = { success: true, data: [mockQuoteData] };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getQuote({ symbol: 'AAPL' });

      expect(result.success).toBe(true);
      expect(result.data).toEqual([mockQuoteData]);
      expect(mockClient.get).toHaveBeenCalledWith('/quote/AAPL');
    });

    it('should handle API errors', async () => {
      const mockError = { success: false, error: 'API Error' };
      mockClient.get.mockResolvedValue(mockError);

      const result = await endpoints.getQuote({ symbol: 'INVALID' });

      expect(result.success).toBe(false);
      expect(result.error).toBe('API Error');
    });
  });
});
```

#### Integration Tests

```typescript
describe('Integration Tests', () => {
  let fmp: FMP;

  beforeAll(() => {
    fmp = new FMP({ apiKey: process.env.FMP_API_KEY! });
  });

  it('should fetch real stock data', async () => {
    const result = await fmp.stock.getQuote({ symbol: 'AAPL' });

    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data![0]).toHaveProperty('symbol', 'AAPL');
  });
});
```

### Running Tests

```bash
# All tests
pnpm test

# Specific test categories
pnpm test:unit
pnpm test:integration
pnpm test:endpoints
pnpm test:stock

# Watch mode
pnpm test:watch

# Coverage
pnpm test:coverage

# Manual API tests
pnpm test:manual
```

### Test Requirements

- **Coverage**: Aim for >90% test coverage
- **Unit Tests**: Test all public methods
- **Integration Tests**: Test with real API (when possible)
- **Error Cases**: Test error handling and edge cases
- **Type Tests**: Verify TypeScript types work correctly

## Code Quality

### Linting

```bash
# Check for issues
pnpm lint

# Auto-fix issues
pnpm lint:fix
```

### Type Checking

```bash
# Check TypeScript types
pnpm type-check
```

### Formatting

```bash
# Format code
pnpm format

# Check formatting
pnpm format:check
```

### Pre-commit Checklist

Before committing, ensure:

- [ ] All tests pass (`pnpm test`)
- [ ] No linting errors (`pnpm lint`)
- [ ] TypeScript compilation succeeds (`pnpm type-check`)
- [ ] Code is formatted (`pnpm format`)
- [ ] New features include tests
- [ ] Documentation is updated

## Pull Request Process

### Before Creating a PR

1. **Update your fork**:

   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Rebase your feature branch**:

   ```bash
   git checkout feature/your-feature
   git rebase main
   ```

3. **Run all checks**:
   ```bash
   pnpm test
   pnpm lint
   pnpm type-check
   pnpm build
   ```

### Creating the PR

1. Push your branch to your fork
2. Create a Pull Request on GitHub
3. Use the PR template and fill out all sections
4. Link any related issues
5. Request review from maintainers

### PR Requirements

- **Title**: Clear, descriptive title
- **Description**: Detailed description of changes
- **Tests**: Include tests for new functionality
- **Documentation**: Update README/docs if needed
- **Breaking Changes**: Clearly mark and document
- **Screenshots**: Include for UI changes (if applicable)

### PR Review Process

1. **Automated Checks**: Must pass CI/CD pipeline
2. **Code Review**: At least one maintainer approval
3. **Testing**: All tests must pass
4. **Documentation**: Updates must be included
5. **Merge**: Squash and merge when approved

## Issue Reporting

### Before Creating an Issue

1. **Search existing issues** to avoid duplicates
2. **Check documentation** for solutions
3. **Test with latest version** of the library
4. **Try to reproduce** the issue locally

### Issue Templates

#### Bug Report

````markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:

1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Environment:**

- Node.js version: [e.g. 18.17.0]
- OS: [e.g. macOS, Windows, Linux]
- Library version: [e.g. 1.0.0]
- FMP API key: [Yes/No]

**Code example**

```typescript
const fmp = new FMP({ apiKey: 'your-key' });
const result = await fmp.stock.getQuote({ symbol: 'AAPL' });
```
````

**Error messages**
Include any error messages or stack traces.

**Additional context**
Add any other context about the problem here.

````

#### Feature Request

```markdown
**Is your feature request related to a problem? Please describe.**
A clear and concise description of what the problem is.

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions.

**Additional context**
Add any other context or screenshots about the feature request here.
````

### Issue Guidelines

- **Be specific**: Provide clear, actionable information
- **Include examples**: Code examples help reproduce issues
- **Check versions**: Mention Node.js and library versions
- **Separate concerns**: Don't mix multiple issues in one report
- **Be patient**: Maintainers are volunteers

## Release Process

### Version Management

This project uses [Changesets](https://github.com/changesets/changesets) for version management.

### Creating a Release

1. **Create changeset**:

   ```bash
   pnpm changeset
   ```

2. **Update version**:

   ```bash
   pnpm changeset version
   ```

3. **Build and test**:

   ```bash
   pnpm build
   pnpm test
   ```

4. **Publish**:
   ```bash
   pnpm publish-packages
   ```

### Release Checklist

- [ ] All tests pass
- [ ] Documentation is updated
- [ ] Changelog is generated
- [ ] Version is bumped
- [ ] Packages are published
- [ ] Release notes are created

## Getting Help

### Support Channels

- **GitHub Issues**: For bug reports and feature requests
- **FMP Official Support**: For issues with the underlying FMP API

### Community Guidelines

- Be respectful and constructive
- Help others when possible
- Follow the project's coding standards
- Report issues promptly
- Contribute back when you can

## Recognition

Contributors will be recognized in:

- GitHub contributors list
- Release notes
- Project documentation
- Community acknowledgments

Thank you for contributing to the FMP Node Wrapper! Your contributions help make this project better for everyone.
