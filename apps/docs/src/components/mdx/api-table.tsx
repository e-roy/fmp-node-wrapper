'use client';

export interface ApiEndpoint {
  method: string;
  path: string;
  description: string;
  parameters?: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
  }>;
  returns?: string;
}

export interface ApiTableProps {
  endpoints: ApiEndpoint[];
}

export function ApiTable({ endpoints }: ApiTableProps) {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="min-w-full border border-neutral-300 dark:border-neutral-600 rounded-lg">
        <thead>
          <tr className="bg-neutral-50 dark:bg-neutral-800">
            <th className="px-4 py-3 text-left text-sm font-medium text-neutral-900 dark:text-white border-b border-neutral-300 dark:border-neutral-600">
              Method
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-neutral-900 dark:text-white border-b border-neutral-300 dark:border-neutral-600">
              Endpoint
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-neutral-900 dark:text-white border-b border-neutral-300 dark:border-neutral-600">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {endpoints.map((endpoint, index) => (
            <tr key={index} className="hover:bg-neutral-50 dark:hover:bg-neutral-700">
              <td className="px-4 py-3 text-sm border-b border-neutral-300 dark:border-neutral-600">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    endpoint.method === 'GET'
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      : endpoint.method === 'POST'
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                        : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200'
                  }`}
                >
                  {endpoint.method}
                </span>
              </td>
              <td className="px-4 py-3 text-sm font-mono text-neutral-900 dark:text-neutral-100 border-b border-neutral-300 dark:border-neutral-600">
                {endpoint.path}
              </td>
              <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-300 border-b border-neutral-300 dark:border-neutral-600">
                {endpoint.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export interface ParameterTableProps {
  parameters: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
  }>;
}

export function ParameterTable({ parameters }: ParameterTableProps) {
  return (
    <div className="my-6 overflow-x-auto">
      <h4 className="text-lg font-semibold mb-3 text-neutral-900 dark:text-white">Parameters</h4>
      <table className="min-w-full border border-neutral-300 dark:border-neutral-600 rounded-lg">
        <thead>
          <tr className="bg-neutral-50 dark:bg-neutral-800">
            <th className="px-4 py-3 text-left text-sm font-medium text-neutral-900 dark:text-white border-b border-neutral-300 dark:border-neutral-600">
              Parameter
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-neutral-900 dark:text-white border-b border-neutral-300 dark:border-neutral-600">
              Type
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-neutral-900 dark:text-white border-b border-neutral-300 dark:border-neutral-600">
              Required
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-neutral-900 dark:text-white border-b border-neutral-300 dark:border-neutral-600">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {parameters.map((param, index) => (
            <tr key={index} className="hover:bg-neutral-50 dark:hover:bg-neutral-700">
              <td className="px-4 py-3 text-sm font-mono text-neutral-900 dark:text-neutral-100 border-b border-neutral-300 dark:border-neutral-600">
                {param.name}
              </td>
              <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-300 border-b border-neutral-300 dark:border-neutral-600">
                {param.type}
              </td>
              <td className="px-4 py-3 text-sm border-b border-neutral-300 dark:border-neutral-600">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    param.required
                      ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                      : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200'
                  }`}
                >
                  {param.required ? 'Yes' : 'No'}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-300 border-b border-neutral-300 dark:border-neutral-600">
                {param.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
