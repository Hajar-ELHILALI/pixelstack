// Maps a tech name to a real brand logo (via simple-icons) + a brand color.
// Unknown techs still render: they fall back to a pixel square + the name.
//
// To add a tech: add an entry below. `slug` is the simple-icons slug
// (https://simpleicons.org). Use slug:null when no logo exists (the badge
// then shows a colored pixel square instead).

import * as si from 'simple-icons';

// Custom logos (24x24 fill paths) for techs that have no simple-icons logo.
const COFFEE =
  'M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.9 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z';
const DATABASE =
  'M12 2C7.58 2 4 3.34 4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5c0-1.66-3.58-3-8-3zm6 16c0 .22-2.13 1-6 1s-6-.78-6-1v-2.23c1.61.78 3.72 1.23 6 1.23s4.39-.45 6-1.23V18zm0-4c0 .22-2.13 1-6 1s-6-.78-6-1v-2.23C7.61 12.55 9.72 13 12 13s4.39-.45 6-1.23V14zM12 6c-3.87 0-6-.78-6-1s2.13-1 6-1 6 .78 6 1-2.13 1-6 1z';

const TECH = {
  // languages
  java:              { name: 'Java',            slug: null,            color: '#E8843C', customPath: COFFEE },
  javascript:        { name: 'JavaScript',      slug: 'javascript',    color: '#E4C81E' },
  js:                { alias: 'javascript' },
  typescript:        { name: 'TypeScript',      slug: 'typescript',    color: '#3178C6' },
  ts:                { alias: 'typescript' },
  dart:              { name: 'Dart',            slug: 'dart',          color: '#54C5F8' },
  python:            { name: 'Python',          slug: 'python',        color: '#6d8bff' },
  sql:               { name: 'SQL',             slug: null,            color: '#6d8bff', customPath: DATABASE },

  // backend / spring
  spring:            { name: 'Spring',          slug: 'spring',        color: '#7ec452' },
  'spring-boot':     { name: 'Spring Boot',     slug: 'springboot',    color: '#7ec452' },
  'spring-security': { name: 'Spring Security', slug: 'spring',        color: '#7ec452' },
  'spring-data-jpa': { name: 'Spring Data JPA', slug: 'spring',        color: '#7ec452' },
  hibernate:         { name: 'Hibernate',       slug: 'hibernate',     color: '#9aa0b5' },
  'rest-apis':       { name: 'REST APIs',       slug: null,            color: '#56c5d4' },
  rest:              { alias: 'rest-apis' },
  jwt:               { name: 'JWT',             slug: 'jsonwebtokens', color: '#e88ab5' },
  maven:             { name: 'Maven',           slug: 'apachemaven',   color: '#e8615a' },
  node:              { name: 'Node.js',         slug: 'nodedotjs',     color: '#7ec452' },

  // frontend
  react:             { name: 'React',           slug: 'react',         color: '#61DAFB' },
  flutter:           { name: 'Flutter',         slug: 'flutter',       color: '#54C5F8' },
  html:              { name: 'HTML5',           slug: 'html5',         color: '#E8843C' },
  html5:             { alias: 'html' },
  css:               { name: 'CSS3',            slug: 'css3',          color: '#56a3c5' },
  css3:              { alias: 'css' },

  // databases
  postgres:          { name: 'PostgreSQL',      slug: 'postgresql',    color: '#6d8bff' },
  postgresql:        { alias: 'postgres' },
  mysql:             { name: 'MySQL',           slug: 'mysql',         color: '#56a3c5' },
  redis:             { name: 'Redis',           slug: 'redis',         color: '#e8615a' },
  oracle:            { name: 'Oracle',          slug: 'oracle',        color: '#e8615a' },

  // devops / tools
  docker:            { name: 'Docker',          slug: 'docker',        color: '#3aa0f0' },
  grafana:           { name: 'Grafana',         slug: 'grafana',       color: '#e8a23c' },
  git:               { name: 'Git',             slug: 'git',           color: '#f0613f' },
  github:            { name: 'GitHub',          slug: 'github',        color: '#e6e6ea', mono: true },
};

function deref(key) {
  let e = TECH[key];
  const seen = new Set();
  while (e && e.alias && !seen.has(e.alias)) {
    seen.add(e.alias);
    e = TECH[e.alias];
  }
  return e && !e.alias ? e : null;
}

function iconBySlug(slug) {
  if (!slug) return null;
  const key = 'si' + slug.charAt(0).toUpperCase() + slug.slice(1);
  const ic = si[key];
  return ic && ic.path ? ic : null;
}

// Resolve a user-supplied tech name into { name, color, path }.
// `path` is the 24x24 SVG path for the logo, or null (render a pixel square).
export function resolveTech(input) {
  const raw = String(input || '').trim();
  const key = raw.toLowerCase().replace(/\s+/g, '-');
  const entry = deref(key) || deref(key.replace(/-/g, '')) || null;
  const name = entry ? entry.name : raw;
  const color = entry ? entry.color : '#9aa0b5';
  const icon = entry ? iconBySlug(entry.slug) : null;
  const path = icon ? icon.path : (entry && entry.customPath) || null;
  return { name, color, path, mono: !!(entry && entry.mono) };
}
