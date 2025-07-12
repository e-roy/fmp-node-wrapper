# FMP Node Wrapper Documentation

This is the documentation site for the FMP Node Wrapper, built with Next.js 15 and MDX. The documentation site uses the `fmp-node-api` package as a workspace dependency.

## Structure

The documentation is organized using MDX files for easy content management and editing:

```
src/
├── app/
│   ├── docs/                    # Main documentation pages
│   │   ├── getting-started/     # Getting started guide
│   │   ├── api/                 # API reference
│   │   │   ├── stock/          # Stock endpoints
│   │   │   ├── financial/      # Financial endpoints
│   │   │   ├── forex/          # Forex endpoints
│   │   │   ├── crypto/         # Cryptocurrency endpoints
│   │   │   ├── etf/            # ETF endpoints
│   │   │   ├── market/         # Market data endpoints
│   │   │   ├── economic/       # Economic indicators
│   │   │   ├── mutual-fund/    # Mutual fund endpoints
│   │   │   ├── list/           # List and screening endpoints
│   │   │   ├── calendar/       # Calendar and events endpoints
│   │   │   └── company/        # Company information endpoints
│   │   ├── examples/           # Code examples
│   │   ├── layout.tsx          # Documentation layout
│   │   └── page.mdx            # Main docs page
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Homepage
├── components/
│   ├── mdx/                    # MDX-specific components
│   │   ├── code-block.tsx      # Syntax highlighting
│   │   └── api-table.tsx       # API endpoint and parameter tables
│   ├── layout/                 # Layout components
│   │   ├── header.tsx          # Site header
│   │   └── footer.tsx          # Site footer
│   ├── theme/                  # Theme components
│   │   ├── theme-provider.tsx  # Theme context provider
│   │   └── theme-toggle.tsx    # Dark/light mode toggle
│   └── ui/                     # UI components
│       ├── button.tsx          # Button component
│       └── card.tsx            # Card component
├── hooks/                      # Custom React hooks
└── lib/                        # Utility functions
    └── utils.ts                # Common utilities
```

## MDX Components

The documentation uses custom MDX components for consistent styling:

### CodeBlock

Provides syntax highlighting for code examples with copy functionality:

```mdx
<CodeBlock language="typescript" filename="example.ts">
  const example = "code here";
</CodeBlock>
```

**Props:**

- `language`: Programming language for syntax highlighting (default: "typescript")
- `filename`: Optional filename to display in header
- `showCopyButton`: Whether to show copy button (default: true)

### ApiTable

Displays API endpoint information in a table format:

```mdx
<ApiTable
  endpoints={[
    {
      method: 'GET',
      path: '/endpoint',
      description: 'Description',
    },
  ]}
/>
```

### ParameterTable

Shows parameter documentation (included in the same file as ApiTable):

```mdx
<ParameterTable
  parameters={[
    {
      name: 'param',
      type: 'string',
      required: true,
      description: 'Description',
    },
  ]}
/>
```

## Navigation

The documentation uses a grouped sidebar navigation system defined in `src/app/docs/layout.tsx`:

### Documentation

- Getting Started
- API Reference

### Asset Classes

- Stock Endpoints
- Financial Endpoints
- ETF Endpoints
- Mutual Fund Endpoints

### Market Data

- Market Endpoints
- Economic Endpoints

### Information

- List Endpoints
- Calendar Endpoints
- Company Endpoints

### Resources

- Examples

## Adding New Documentation

### 1. Create a new MDX file

Create a new `.mdx` file in the appropriate directory under `src/app/docs/`.

### 2. Import components

Import the MDX components you need:

```mdx
import { CodeBlock, ApiTable, ParameterTable } from '@/components/mdx';

;
```

### 3. Write content

Write your documentation using standard Markdown with the custom components:

```mdx
# Page Title

## Section

Regular markdown content here.

<CodeBlock language="typescript">const example = "code";</CodeBlock>
```

### 4. Update navigation

Add the new page to the appropriate group in the navigation in `src/app/docs/layout.tsx`.

## API Endpoint Categories

The documentation covers comprehensive financial data across multiple asset classes:

### Asset Classes

- **Stock Endpoints**: Real-time and historical stock data, company profiles, market information
- **Financial Endpoints**: Financial statements, ratios, income statements, balance sheets
- **ETF Endpoints**: ETF quotes, profiles, holdings, and fund information
- **Mutual Fund Endpoints**: Mutual fund data, NAV, profiles, and performance

### Market Data

- **Market Endpoints**: Market performance, trading hours, sector data, gainers/losers
- **Economic Endpoints**: Economic indicators, calendar, treasury rates, inflation data

### Information

- **List Endpoints**: Stock listings, screening, and filtering capabilities
- **Calendar Endpoints**: Earnings calendar, economic calendar, and event scheduling
- **Company Endpoints**: Company profiles, executive information, and corporate data

## Development

### Running the development server

```bash
pnpm dev
```

### Building for production

```bash
pnpm build
```

### Type checking

```bash
pnpm type-check
```

### Linting

```bash
pnpm lint
```

### Formatting

```bash
pnpm format
```

## Styling

The documentation uses Tailwind CSS v4 for styling with the following features:

- Responsive design with mobile-first approach
- Dark mode support with theme toggle
- Consistent typography and spacing
- Grouped navigation sidebar with sticky positioning
- Card-based content layout
- Syntax highlighting with One Dark theme
- Copy-to-clipboard functionality for code blocks
- Visual grouping of related endpoints in navigation

## Dependencies

Key dependencies include:

- **Next.js 15**: React framework with App Router
- **React 19**: Latest React version
- **MDX**: Markdown with JSX support
- **Tailwind CSS 4**: Utility-first CSS framework
- **next-themes**: Dark mode support
- **react-syntax-highlighter**: Code syntax highlighting
- **prism-react-renderer**: Additional syntax highlighting
- **lucide-react**: Icon library
- **Radix UI**: Accessible UI primitives
- **fmp-node-api**: Workspace dependency for the main API package

## Content Guidelines

### Writing Style

- Use clear, concise language
- Include practical examples
- Provide code samples for all API endpoints
- Use consistent formatting

### Code Examples

- Always include TypeScript examples
- Show both success and error handling
- Use realistic data in examples
- Include comments for complex code
- Use the new `FMP` class structure: `fmp.stock.getQuote()` instead of `fmp.getQuote()`

### API Documentation

- Document all parameters
- Show example requests and responses
- Include error codes and handling
- Provide best practices
- Include multi-asset examples where relevant

### API Structure

The documentation reflects the updated API structure:

```typescript
// New structure (current)
import { FMP } from 'fmp-node-api';
const fmp = new FMP({ apiKey: 'your-key' });
const quote = await fmp.stock.getQuote({ symbol: 'AAPL' });

// Old structure (deprecated)
import { FMPClient, FMPEndpoints } from 'fmp-node-api';
const client = new FMPClient({ apiKey: 'your-key' });
const fmp = new FMPEndpoints(client);
const quote = await fmp.getQuote({ symbol: 'AAPL' });
```

## Deployment

The documentation is deployed as part of the monorepo build process using Turbo. The build output is optimized for production with:

- Static generation for all pages
- Optimized images and assets
- SEO-friendly metadata
- Fast loading times
- Dark mode support

## Contributing

To contribute to the documentation:

1. Create a new branch
2. Make your changes to the MDX files
3. Test locally with `pnpm dev`
4. Submit a pull request

The documentation is designed to be easy to edit and maintain, making it simple for anyone to contribute improvements.
