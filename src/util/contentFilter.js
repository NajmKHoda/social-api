import fs from 'fs';
import path from 'path';

const configPath = path.resolve(__dirname, '../../config/disallowedWords.txt');
const disallowedWords = fs.readFileSync(configPath, 'utf-8')
    .split('\n') // Split newlines
    .filter(Boolean) // Remove empty lines
    .map(word => word.toLowerCase()); // Case insensitivity

export function isContentAllowed(content) {
    const contentWords = content.toLowerCase().split(/\s+/);
    return !disallowedWords.some(word => contentWords.includes(word));
};