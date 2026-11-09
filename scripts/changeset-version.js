// Runs `changeset version` only when there is something to version.
//
// Changesets 3 exits 1 when it finds no unreleased changesets, which would stop
// `publish-packages` (and the CI publish job) when the version bump was already
// committed. This mirrors the check in Changesets' `version` command: changeset
// files in `.changeset/` and `.changeset/pre/`, or a pre-mode exit in progress.
// Any real `changeset version` failure still fails the release.
import { execSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const changesetDir = join(import.meta.dirname, '..', '.changeset');
const ignoredFiles = [/^README\.md$/i, 'AGENTS.md', 'CLAUDE.md', 'GEMINI.md'];

function listChangesets(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter(
    name =>
      !name.startsWith('.') &&
      name.endsWith('.md') &&
      !ignoredFiles.some(pattern =>
        typeof pattern === 'string' ? pattern === name : pattern.test(name),
      ),
  );
}

const changesets = [...listChangesets(changesetDir), ...listChangesets(join(changesetDir, 'pre'))];

const prePath = join(changesetDir, 'pre.json');
const exitingPreMode =
  existsSync(prePath) && JSON.parse(readFileSync(prePath, 'utf8')).mode === 'exit';

if (changesets.length === 0 && !exitingPreMode) {
  console.log('No unreleased changesets; skipping `changeset version`.');
} else {
  try {
    execSync('pnpm exec changeset version', { stdio: 'inherit' });
  } catch (error) {
    process.exit(error.status ?? 1);
  }
}
