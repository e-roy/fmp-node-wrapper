import * as fs from 'fs';
import * as path from 'path';

const REQUIRED_VERSION = '0.1.0';

/**
 * Gets the actual installed version of a package
 */
function getInstalledPackageVersion(packageName: string): string | null {
  try {
    const packagePath = path.dirname(require.resolve(packageName));
    const packageJsonPath = path.join(packagePath, '..', 'package.json');

    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      return packageJson.version;
    }
  } catch (_error) {
    // Package not found or other error
    return null;
  }
  return null;
}

/**
 * Compares two semantic versions
 * Returns: -1 if v1 < v2, 0 if v1 === v2, 1 if v1 > v2
 */
function compareVersions(v1: string, v2: string): number {
  const parseVersion = (version: string): number[] => {
    return version.split('.').map(num => parseInt(num, 10) || 0);
  };

  const v1Parts = parseVersion(v1);
  const v2Parts = parseVersion(v2);

  const maxLength = Math.max(v1Parts.length, v2Parts.length);

  for (let i = 0; i < maxLength; i++) {
    const v1Part = v1Parts[i] || 0;
    const v2Part = v2Parts[i] || 0;

    if (v1Part < v2Part) return -1;
    if (v1Part > v2Part) return 1;
  }

  return 0;
}

/**
 * Checks if the installed version is less than the required version
 */
function isVersionLessThan(installedVersion: string, requiredVersion: string): boolean {
  return compareVersions(installedVersion, requiredVersion) < 0;
}

/**
 * Checks if the installed version of @openai/agents is compatible
 * with this package. Throws an error if incompatible.
 */
export function checkOpenAIAgentsVersion(): void {
  const installedVersion = getInstalledPackageVersion('@openai/agents');

  if (!installedVersion) {
    throw new Error(
      `@openai/agents package not found. ` +
        `This package requires @openai/agents to be installed. ` +
        `Please install with: npm install @openai/agents`,
    );
  }

  if (isVersionLessThan(installedVersion, REQUIRED_VERSION)) {
    console.warn(
      `Incompatible @openai/agents version detected. ` +
        `Installed version: ${installedVersion}, Required: ${REQUIRED_VERSION} or higher.`,
    );
  }
}
