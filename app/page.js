'use client';

import { useState } from 'react';

const THEMES = ['midnight', 'dracula', 'light'];
const THEME_BG = { midnight: '#17171f', dracula: '#282a36', light: '#f6f6f4' };

export default function Home() {
  const [user, setUser] = useState('Hajar-ELHILALI');
  const [stack, setStack] = useState(
    'java,spring-boot,hibernate,rest-apis,jwt,maven,docker,git,github'
  );
  const [theme, setTheme] = useState('midnight');
  const [copied, setCopied] = useState('');

  const statsUrl = `/api/stats?user=${encodeURIComponent(user)}&theme=${theme}`;
  const stackUrl = `/api/stack?stack=${encodeURIComponent(stack)}&theme=${theme}`;
  const iconsUrl = `/api/icons?stack=${encodeURIComponent(stack)}&theme=${theme}`;
  const markdown = `![PixelStack stats](${statsUrl})\n![PixelStack icons](${iconsUrl})\n![PixelStack stack](${stackUrl})`;

  function copy(text, key) {
    navigator.clipboard?.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 1500);
  }

  return (
    <main className="min-h-screen bg-[#0f0f17] font-mono text-zinc-200">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <header className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            <span className="text-green-400">&#9654;</span> PixelStack
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Composants pixel-art pour ton README GitHub — stats &amp; tech stack, réutilisables par tous.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          <section className="space-y-5">
            <div>
              <label className="mb-1 block text-xs uppercase tracking-widest text-zinc-500">
                Username GitHub
              </label>
              <input
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="w-full border border-[#3a3a55] bg-[#1b1b2a] px-3 py-2 text-sm text-zinc-100 outline-none focus:border-green-400"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs uppercase tracking-widest text-zinc-500">
                Stack (séparé par des virgules)
              </label>
              <input
                value={stack}
                onChange={(e) => setStack(e.target.value)}
                className="w-full border border-[#3a3a55] bg-[#1b1b2a] px-3 py-2 text-sm text-zinc-100 outline-none focus:border-green-400"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs uppercase tracking-widest text-zinc-500">
                Thème
              </label>
              <div className="flex gap-2">
                {THEMES.map((th) => (
                  <button
                    key={th}
                    onClick={() => setTheme(th)}
                    className={`border px-4 py-2 text-sm capitalize transition-colors ${
                      theme === th
                        ? 'border-green-400 text-white'
                        : 'border-[#3a3a55] text-zinc-400 hover:border-zinc-500'
                    }`}
                  >
                    {th}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section>
            <label className="mb-1 block text-xs uppercase tracking-widest text-zinc-500">
              Aperçu
            </label>
            <div
              className="space-y-4 border border-[#3a3a55] p-4"
              style={{ background: THEME_BG[theme] }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={statsUrl} alt="stats" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={iconsUrl} alt="icons" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={stackUrl} alt="stack" />
            </div>
          </section>
        </div>

        <section className="mt-10">
          <div className="mb-2 flex items-center justify-between">
            <label className="text-xs uppercase tracking-widest text-zinc-500">
              Markdown à coller dans ton README
            </label>
            <button
              onClick={() => copy(markdown, 'md')}
              className="border border-[#3a3a55] px-3 py-1 text-xs text-zinc-300 hover:border-green-400"
            >
              {copied === 'md' ? 'copié ✓' : 'copier'}
            </button>
          </div>
          <pre className="overflow-x-auto border border-[#3a3a55] bg-[#1b1b2a] p-4 text-xs text-zinc-300">
            {markdown}
          </pre>
        </section>
      </div>
    </main>
  );
}
