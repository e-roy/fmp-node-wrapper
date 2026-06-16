import React from 'react';

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
    <div className="f-tablewrap" style={{ margin: '6px 0' }}>
      <table className="f-table">
        <thead>
          <tr>
            <th style={{ width: 72 }}>Method</th>
            <th>Endpoint</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {endpoints.map((endpoint, index) => (
            <tr key={index}>
              <td>
                <span className="f-method">{endpoint.method || 'GET'}</span>
              </td>
              <td className="mono">{endpoint.path}</td>
              <td>{endpoint.description}</td>
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
    <div className="f-tablewrap" style={{ margin: '6px 0' }}>
      <table className="f-table">
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Type</th>
            <th style={{ width: 92 }} />
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {parameters.map((param, index) => (
            <tr key={index}>
              <td className="mono">{param.name}</td>
              <td className="mono" style={{ color: 'var(--vio)' }}>
                {param.type}
              </td>
              <td>
                {param.required ? (
                  <span className="f-req">required</span>
                ) : (
                  <span className="f-opt">optional</span>
                )}
              </td>
              <td>{param.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
