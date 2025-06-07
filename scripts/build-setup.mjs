#!/usr/bin/env node
import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

// Create dist directory if it doesn't exist
if (!existsSync('dist')) {
  mkdirSync('dist');
}

// Copy _redirects file
copyFileSync(
  join('client', 'public', '_redirects'),
  join('dist', '_redirects')
);

console.log('✓ Build setup completed');
