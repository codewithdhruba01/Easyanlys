import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  FileText, 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  RotateCcw, 
  SlidersHorizontal, 
  Eye, 
  Code2, 
  Layers, 
  ShieldCheck, 
  AlignLeft, 
  AlignCenter, 
  Terminal, 
  CheckCircle2, 
  Info,
  Wand2,
  FolderGit2
} from 'lucide-react';
import { toast } from 'sonner';

// Popular tech stack options with Shields.io badges
const TECH_OPTIONS: { name: string; badge: string; color: string }[] = [
  { name: 'React', badge: 'https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB', color: '#61DAFB' },
  { name: 'Next.js', badge: 'https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white', color: '#000000' },
  { name: 'TypeScript', badge: 'https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white', color: '#007ACC' },
  { name: 'JavaScript', badge: 'https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black', color: '#F7DF1E' },
  { name: 'Tailwind CSS', badge: 'https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white', color: '#38B2AC' },
  { name: 'Node.js', badge: 'https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white', color: '#43853D' },
  { name: 'Python', badge: 'https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white', color: '#3776AB' },
  { name: 'PostgreSQL', badge: 'https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white', color: '#316192' },
  { name: 'MongoDB', badge: 'https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white', color: '#4EA94B' },
  { name: 'Supabase', badge: 'https://img.shields.io/badge/Supabase-181818?style=flat&logo=supabase&logoColor=3ECF8E', color: '#3ECF8E' },
  { name: 'Docker', badge: 'https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white', color: '#2496ED' },
  { name: 'Vite', badge: 'https://img.shields.io/badge/Vite-B73BFE?style=flat&logo=vite&logoColor=FFD62E', color: '#B73BFE' },
  { name: 'GraphQL', badge: 'https://img.shields.io/badge/GraphQL-E10098?style=flat&logo=graphql&logoColor=white', color: '#E10098' },
  { name: 'Redis', badge: 'https://img.shields.io/badge/Redis-DC382D?style=flat&logo=redis&logoColor=white', color: '#DC382D' },
  { name: 'FastAPI', badge: 'https://img.shields.io/badge/FastAPI-005571?style=flat&logo=fastapi', color: '#005571' },
];

// Presets for one-click jumpstart
const PRESETS = [
  {
    id: 'fullstack',
    title: 'Full-Stack Web App',
    badge: 'Next.js + Node',
    text: `DocuPulse
A modern, open-source real-time developer documentation platform with AI search.

Features:
- Instant semantic code & doc search with Algolia
- Collaborative live markdown editor with split preview
- Built-in analytics & reader feedback collection
- Dark and light mode out of the box with custom themes
- Fast static site generation with edge caching

Tech Stack: Next.js, TypeScript, Tailwind CSS, Node.js, PostgreSQL, Docker

Prerequisites:
- Node.js >= 18.0.0
- Docker and Docker Compose
- PostgreSQL database

Installation:
git clone https://github.com/your-username/docupulse.git
cd docupulse
npm install
cp .env.example .env.local
npm run dev

Environment Variables:
DATABASE_URL=postgresql://user:password@localhost:5432/docupulse
NEXT_PUBLIC_APP_URL=http://localhost:3000
JWT_SECRET=your_jwt_super_secret_key

Usage:
Visit http://localhost:3000 in your browser. Log in as an admin or create a new workspace to start writing documentation.

Contributing:
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

License: MIT
Author: Dhrubaraj Pati (@codewithdhruba)`,
  },
  {
    id: 'cli-package',
    title: 'NPM / CLI Tool',
    badge: 'TypeScript Library',
    text: `git-pulse
Lightweight command line tool to visualize contributor velocity and branch health right in your terminal.

Features:
- Real-time git commit metrics with ASCII charts
- Identify abandoned branches and stale PRs
- Export summaries to Markdown, JSON, or HTML
- Zero dependencies outside the Node.js standard runtime

Tech Stack: TypeScript, Node.js

Installation:
npm install -g git-pulse
# Or run directly with npx
npx git-pulse

Usage:
# Run in any git repository
git-pulse
# Analyze specific date range
git-pulse --since="2026-01-01" --author="codewithdhruba"

License: MIT`,
  },
  {
    id: 'ai-tool',
    title: 'AI / Python Project',
    badge: 'PyTorch / FastAPI',
    text: `VisionSift
High-performance visual embedding search and zero-shot image classification engine.

Features:
- Sub-millisecond vector similarity search powered by FAISS
- Multi-modal embeddings with CLIP and OpenCLIP models
- REST API and WebSocket interfaces with FastAPI
- Production-ready Docker container with GPU acceleration

Tech Stack: Python, FastAPI, Docker

Prerequisites:
- Python 3.10+
- NVIDIA GPU with CUDA 12+ (optional for CPU mode)

Installation:
git clone https://github.com/your-username/visionsift.git
cd visionsift
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py

Usage:
curl -X POST http://localhost:8000/api/v1/search -F "image=@photo.jpg"

License: Apache-2.0`,
  },
  {
    id: 'minimal',
    title: 'Minimal Clean Project',
    badge: 'Minimalist',
    text: `MicroCache
Ultra-fast in-memory LRU key-value cache with TTL expiration.

Features:
- O(1) read and write operations
- Automatic time-to-live (TTL) expiration sweep
- Type-safe TypeScript generic interfaces
- Zero external dependencies (< 2KB minified)

Tech Stack: TypeScript

Installation:
npm install microcache-core

Usage:
import { MicroCache } from 'microcache-core';

const cache = new MicroCache({ maxSize: 1000, ttlMs: 60000 });
cache.set('user:123', { name: 'Alice' });
const user = cache.get('user:123');

License: MIT`,
  },
];

export default function TextToReadme() {
  const [inputText, setInputText] = useState(PRESETS[0].text);
  const [selectedTechs, setSelectedTechs] = useState<string[]>([
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'Node.js',
    'PostgreSQL',
    'Docker',
  ]);
  const [centerHeader, setCenterHeader] = useState(true);
  const [includeBadges, setIncludeBadges] = useState(true);
  const [includeTOC, setIncludeTOC] = useState(true);
  const [includeEmojis, setIncludeEmojis] = useState(true);
  const [licenseType, setLicenseType] = useState('MIT');
  const [activeTab, setActiveTab] = useState<'preview' | 'markdown'>('preview');
  const [copied, setCopied] = useState(false);

  // Sync tech selections when user clicks a preset
  const handleSelectPreset = (preset: typeof PRESETS[0]) => {
    setInputText(preset.text);
    // Auto-detect tech from preset text
    const matched = TECH_OPTIONS.filter((t) =>
      preset.text.toLowerCase().includes(t.name.toLowerCase())
    ).map((t) => t.name);
    setSelectedTechs(matched);
    toast.success(`Loaded "${preset.title}" preset`);
  };

  const toggleTech = (name: string) => {
    setSelectedTechs((prev) =>
      prev.includes(name) ? prev.filter((t) => t !== name) : [...prev, name]
    );
  };

  // Smart Parser & Markdown Generator
  const generatedMarkdown = useMemo(() => {
    if (!inputText.trim()) {
      return '# Your Project Title\n\nEnter some text on the left to generate your README.md.';
    }

    const lines = inputText.split('\n');
    let title = '';
    let description = '';
    const sections: { title: string; lines: string[] }[] = [];
    let currentSection: { title: string; lines: string[] } | null = null;

    // Line parser
    let lineIdx = 0;
    while (lineIdx < lines.length) {
      const line = lines[lineIdx].trimEnd();
      const trimmed = line.trim();

      if (!trimmed) {
        if (currentSection) currentSection.lines.push('');
        lineIdx++;
        continue;
      }

      // Title detection (First non-empty line)
      if (!title) {
        title = trimmed.replace(/^#\s*/, '').replace(/:\s*$/, '');
        lineIdx++;
        // Check next line for description if not a section header
        if (lineIdx < lines.length && !lines[lineIdx].includes(':') && !lines[lineIdx].startsWith('#')) {
          description = lines[lineIdx].trim();
          lineIdx++;
        }
        continue;
      }

      // Section Header detection (e.g., "Features:", "## Features", "Installation:")
      const sectionMatch = trimmed.match(/^(?:#{1,3}\s*)?([A-Za-z0-9\s/&_-]+):?$/);
      const isKnownSection =
        sectionMatch &&
        /features|tech stack|installation|prerequisites|getting started|usage|environment|env|contributing|license|author|roadmap|overview/i.test(
          sectionMatch[1]
        );

      if (isKnownSection && sectionMatch) {
        currentSection = {
          title: sectionMatch[1].trim(),
          lines: [],
        };
        sections.push(currentSection);
        lineIdx++;
        continue;
      }

      // Content inside a section or general description
      if (currentSection) {
        currentSection.lines.push(line);
      } else if (!description) {
        description = trimmed;
      }
      lineIdx++;
    }

    // Build the final Markdown
    let md = '';

    // Header block
    if (centerHeader) {
      md += `<div align="center">\n\n`;
      md += `# ${title || 'Project Title'}\n\n`;
      if (description) {
        md += `> **${description}**\n\n`;
      }
      if (includeBadges) {
        md += `[![License: ${licenseType}](https://img.shields.io/badge/License-${licenseType}-blue.svg)](https://opensource.org/licenses/${licenseType})\n`;
        md += `[![Version](https://img.shields.io/badge/version-1.0.0-emerald.svg)](#)\n`;
        md += `[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing)\n`;
        md += `[![Stars](https://img.shields.io/badge/dynamic/json?color=gold&label=stars&query=stargazers_count&url=https%3A%2F%2Fapi.github.com%2Frepos%2Fexpressjs%2Fexpress)](https://github.com)\n\n`;
      }
      md += `</div>\n\n---\n\n`;
    } else {
      md += `# ${title || 'Project Title'}\n\n`;
      if (includeBadges) {
        md += `[![License: ${licenseType}](https://img.shields.io/badge/License-${licenseType}-blue.svg)](https://opensource.org/licenses/${licenseType}) `;
        md += `[![Version](https://img.shields.io/badge/version-1.0.0-emerald.svg)](#) `;
        md += `[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing)\n\n`;
      }
      if (description) {
        md += `${description}\n\n`;
      }
      md += `---\n\n`;
    }

    // Table of Contents
    if (includeTOC && sections.length > 0) {
      const e = includeEmojis;
      md += `## ${e ? '📖 ' : ''}Table of Contents\n\n`;
      if (selectedTechs.length > 0) {
        md += `- [${e ? '🛠️ ' : ''}Tech Stack](#tech-stack)\n`;
      }
      sections.forEach((sec) => {
        const anchor = sec.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        md += `- [${sec.title}](#${anchor})\n`;
      });
      md += `\n---\n\n`;
    }

    // Tech Stack Badges
    if (selectedTechs.length > 0) {
      const e = includeEmojis;
      md += `## ${e ? '🛠️ ' : ''}Tech Stack\n\n`;
      selectedTechs.forEach((t) => {
        const found = TECH_OPTIONS.find((opt) => opt.name === t);
        if (found) {
          md += `![${t}](${found.badge}) `;
        } else {
          md += `\`${t}\` `;
        }
      });
      md += `\n\n---\n\n`;
    }

    // Helper to format section content
    const formatSectionBody = (titleStr: string, bodyLines: string[]) => {
      const lower = titleStr.toLowerCase();
      const content = bodyLines.join('\n').trim();

      // Check for code-like installation/usage/env commands
      if (
        lower.includes('install') ||
        lower.includes('prerequisite') ||
        lower.includes('usage') ||
        lower.includes('getting started')
      ) {
        // If content already contains backticks, return raw
        if (content.includes('```')) return content;
        
        // Split bullet points or commands
        const cmdLines = bodyLines.filter((l) => l.trim().length > 0);
        const isShellCommands = cmdLines.some((l) =>
          /^(npm|pnpm|yarn|git|cd|docker|pip|python|source|curl)\b/.test(l.trim())
        );

        if (isShellCommands) {
          return `\`\`\`bash\n${cmdLines.join('\n')}\n\`\`\``;
        }
      }

      if (lower.includes('env') || lower.includes('environment')) {
        if (!content.includes('```')) {
          return `\`\`\`env\n${content}\n\`\`\``;
        }
      }

      // Features or list items
      if (lower.includes('feature')) {
        return bodyLines
          .map((l) => {
            const tr = l.trim();
            if (!tr) return '';
            if (tr.startsWith('-') || tr.startsWith('*') || tr.startsWith('•')) {
              return `- ${tr.replace(/^[-*•]\s*/, '')}`;
            }
            return `- ${tr}`;
          })
          .filter(Boolean)
          .join('\n');
      }

      return content;
    };

    // Render parsed sections
    sections.forEach((sec) => {
      const lower = sec.title.toLowerCase();
      // Skip tech stack if handled above
      if (lower.includes('tech stack')) return;

      const e = includeEmojis;
      let icon = '';
      if (e) {
        if (lower.includes('feature')) icon = '✨ ';
        else if (lower.includes('install') || lower.includes('setup') || lower.includes('started')) icon = '🚀 ';
        else if (lower.includes('usage')) icon = '💻 ';
        else if (lower.includes('prereq')) icon = '📋 ';
        else if (lower.includes('env')) icon = '⚙️ ';
        else if (lower.includes('contribut')) icon = '🤝 ';
        else if (lower.includes('license')) icon = '📝 ';
        else if (lower.includes('author') || lower.includes('contact')) icon = '👤 ';
        else icon = '📌 ';
      }

      md += `## ${icon}${sec.title}\n\n`;
      const body = formatSectionBody(sec.title, sec.lines);
      md += `${body}\n\n`;
    });

    // Add License if not in sections
    const hasLicense = sections.some((s) => s.title.toLowerCase().includes('license'));
    if (!hasLicense && licenseType !== 'None') {
      const e = includeEmojis;
      md += `## ${e ? '📝 ' : ''}License\n\n`;
      md += `Distributed under the ${licenseType} License. See \`LICENSE\` file for more information.\n\n`;
    }

    return md.trim();
  }, [inputText, selectedTechs, centerHeader, includeBadges, includeTOC, includeEmojis, licenseType]);

  // Statistics
  const stats = useMemo(() => {
    const words = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
    const chars = inputText.length;
    const lines = inputText.split('\n').length;
    const readingTime = Math.max(1, Math.ceil(words / 200));
    return { words, chars, lines, readingTime };
  }, [inputText]);

  // Copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedMarkdown);
    setCopied(true);
    toast.success('README.md copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  // Download README.md
  const handleDownload = () => {
    const blob = new Blob([generatedMarkdown], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'README.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('README.md downloaded successfully!');
  };

  // Clear all
  const handleClear = () => {
    setInputText('');
    setSelectedTechs([]);
    toast.info('Editor cleared');
  };

  // Convert raw HTML preview from generated markdown
  const renderedHtml = useMemo(() => {
    let html = generatedMarkdown;
    // Replace headings
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-base font-bold mt-4 mb-2 text-foreground">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-lg font-bold mt-6 mb-3 pb-1 border-b border-border text-foreground">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-2 mb-4 text-foreground">$1</h1>');
    // Badges & Images: ![alt](url)
    html = html.replace(/!\[(.*?)\]\((.*?)\)/gim, '<img alt="$1" src="$2" class="inline-block my-1 mr-1.5 h-5 align-middle" />');
    // Links: [text](url)
    html = html.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" class="text-blue-500 hover:underline">$1</a>');
    // Bold & Italic
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong class="text-foreground">$1</strong>');
    html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');
    // Blockquote
    html = html.replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-primary/40 pl-3 py-1 my-2 text-muted-foreground italic bg-muted/20 rounded-r">$1</blockquote>');
    // Horizontal rule
    html = html.replace(/^---$/gim, '<hr class="my-5 border-border" />');
    // Code blocks: ```lang ... ```
    html = html.replace(/```(?:[a-z]*)\n([\s\S]*?)```/gim, '<pre class="bg-muted/80 p-3.5 rounded-lg overflow-x-auto text-xs font-mono text-foreground my-3 border border-border"><code>$1</code></pre>');
    // Inline code: `code`
    html = html.replace(/`([^`]+)`/gim, '<code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono text-foreground border border-border/50">$1</code>');
    // Unordered list: - item
    html = html.replace(/^- (.*$)/gim, '<li class="ml-4 list-disc text-sm text-foreground/90 my-1">$1</li>');
    // Line breaks
    html = html.replace(/\n\n/gim, '<p class="my-2"></p>');
    return html;
  }, [generatedMarkdown]);

  return (
    <div className="min-h-screen bg-background text-foreground pt-20 pb-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-card/60 text-xs font-medium text-muted-foreground backdrop-blur-sm mb-1">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Smart Markdown Generator</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            Text to README Converter
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Turn plain text notes, project drafts, or quick specs into a minimal, production-grade GitHub <code className="text-foreground text-xs font-mono bg-muted px-1.5 py-0.5 rounded">README.md</code>.
          </p>
        </motion.div>

        {/* Quick Jumpstart Presets */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto"
        >
          <span className="text-xs font-medium text-muted-foreground mr-1 flex items-center gap-1">
            <FolderGit2 className="w-3.5 h-3.5" /> Presets:
          </span>
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className="text-xs font-medium px-3 py-1.5 rounded-lg border border-border bg-card/70 hover:bg-muted text-foreground transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <span>{preset.title}</span>
              <span className="text-[10px] text-muted-foreground bg-muted/80 px-1.5 py-0.5 rounded">
                {preset.badge}
              </span>
            </button>
          ))}
          <button
            onClick={handleClear}
            className="text-xs font-medium px-2.5 py-1.5 rounded-lg border border-border/60 hover:bg-destructive/10 hover:text-destructive text-muted-foreground transition-all flex items-center gap-1"
            title="Clear editor"
          >
            <RotateCcw className="w-3 h-3" /> Clear
          </button>
        </motion.div>

        {/* Customization Drawer / Controls Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="w-fit max-w-full mx-auto px-4 py-3 rounded-xl border border-border bg-card/60 backdrop-blur-md shadow-sm overflow-x-auto"
        >
          <div className="flex items-center gap-4 sm:gap-5 text-xs whitespace-nowrap">
            <div className="flex items-center space-x-2 shrink-0">
              <Switch 
                id="center-header" 
                checked={centerHeader} 
                onCheckedChange={setCenterHeader} 
              />
              <Label htmlFor="center-header" className="cursor-pointer flex items-center gap-1">
                {centerHeader ? <AlignCenter className="w-3.5 h-3.5" /> : <AlignLeft className="w-3.5 h-3.5" />}
                <span>Center Header</span>
              </Label>
            </div>

            <div className="h-3.5 w-px bg-border/60 shrink-0" />

            <div className="flex items-center space-x-2 shrink-0">
              <Switch 
                id="include-badges" 
                checked={includeBadges} 
                onCheckedChange={setIncludeBadges} 
              />
              <Label htmlFor="include-badges" className="cursor-pointer flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Status Badges</span>
              </Label>
            </div>

            <div className="h-3.5 w-px bg-border/60 shrink-0" />

            <div className="flex items-center space-x-2 shrink-0">
              <Switch 
                id="include-toc" 
                checked={includeTOC} 
                onCheckedChange={setIncludeTOC} 
              />
              <Label htmlFor="include-toc" className="cursor-pointer">
                <span>Table of Contents</span>
              </Label>
            </div>

            <div className="h-3.5 w-px bg-border/60 shrink-0" />

            <div className="flex items-center space-x-2 shrink-0">
              <Switch 
                id="include-emojis" 
                checked={includeEmojis} 
                onCheckedChange={setIncludeEmojis} 
              />
              <Label htmlFor="include-emojis" className="cursor-pointer">
                <span>Section Emojis</span>
              </Label>
            </div>

            <div className="h-3.5 w-px bg-border/60 shrink-0" />

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-muted-foreground">License:</span>
              <select
                value={licenseType}
                onChange={(e) => setLicenseType(e.target.value)}
                className="bg-background border border-border rounded-md px-2 py-0.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="MIT">MIT</option>
                <option value="Apache-2.0">Apache 2.0</option>
                <option value="GPL-3.0">GPL v3</option>
                <option value="BSD-3-Clause">BSD 3-Clause</option>
                <option value="None">None</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Tech Stack Chips Selector */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-3.5 rounded-xl border border-border bg-card/40 flex flex-col gap-2"
        >
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5 font-medium text-foreground">
              <Layers className="w-3.5 h-3.5 text-primary" /> Tech Stack Shields:
            </span>
            <span>Click to add or remove badges from the README</span>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {TECH_OPTIONS.map((tech) => {
              const active = selectedTechs.includes(tech.name);
              return (
                <button
                  key={tech.name}
                  onClick={() => toggleTech(tech.name)}
                  className={`text-xs px-2.5 py-1 rounded-md border transition-all flex items-center gap-1.5 ${
                    active
                      ? 'border-primary/50 bg-primary/10 text-primary font-medium'
                      : 'border-border bg-background/50 hover:bg-muted text-muted-foreground'
                  }`}
                >
                  {tech.name}
                  {active && <Check className="w-3 h-3 text-primary ml-0.5" />}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Main Work Area: 2 Columns (Input & Live Output) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Left Column: Raw Text Editor */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                <h2 className="text-sm font-semibold text-foreground">Text / Notes Input</h2>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>{stats.words} words</span>
                <span>•</span>
                <span>{stats.lines} lines</span>
              </div>
            </div>

            <div className="relative rounded-xl border border-border bg-card/60 backdrop-blur-md overflow-hidden focus-within:border-primary/50 transition-colors">
              <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type or paste your project details, features, installation commands, tech stack, and notes here..."
                rows={22}
                className="w-full resize-y min-h-[460px] bg-transparent border-0 p-4 font-mono text-xs sm:text-sm text-foreground focus-visible:ring-0 leading-relaxed"
              />
              <div className="px-4 py-2 bg-muted/40 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Wand2 className="w-3.5 h-3.5 text-primary" />
                  <span>Auto-parses titles, features, bash commands & env vars</span>
                </div>
                <span>Reading time: ~{stats.readingTime} min</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Live Output (Preview & Markdown Code) */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center justify-between px-1">
              {/* Tab Switcher */}
              <div className="flex items-center p-0.5 rounded-lg border border-border bg-card/60">
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                    activeTab === 'preview'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Rendered Preview</span>
                </button>
                <button
                  onClick={() => setActiveTab('markdown')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                    activeTab === 'markdown'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Raw Markdown</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopy}
                  className="h-8 text-xs flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </Button>
                <Button
                  size="sm"
                  onClick={handleDownload}
                  className="h-8 text-xs flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .md</span>
                </Button>
              </div>
            </div>

            {/* Output Container */}
            <div className="rounded-xl border border-border bg-card/60 backdrop-blur-md min-h-[500px] flex flex-col overflow-hidden">
              {activeTab === 'preview' ? (
                <ScrollArea className="h-[500px] p-6 text-foreground">
                  <div
                    className="prose prose-sm dark:prose-invert max-w-none text-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: renderedHtml }}
                  />
                </ScrollArea>
              ) : (
                <ScrollArea className="h-[500px] p-4 bg-muted/20">
                  <pre className="font-mono text-xs sm:text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed select-all">
                    {generatedMarkdown}
                  </pre>
                </ScrollArea>
              )}
            </div>
          </motion.div>
        </div>

        {/* Helpful Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-border pt-8"
        >
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-1.5 text-left">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-primary" /> Auto-Formatting
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Commands like <code className="font-mono text-[11px] bg-muted px-1 rounded">npm install</code>, <code className="font-mono text-[11px] bg-muted px-1 rounded">git clone</code> are automatically recognized and wrapped into code blocks.
              </p>
            </div>

            <div className="flex flex-col gap-1.5 text-left">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-primary" /> Dynamic Badges
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Select your tech stack chips above to automatically inject official Shields.io vector badges into your README header.
              </p>
            </div>

            <div className="flex flex-col gap-1.5 text-left">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" /> GitHub Ready
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Click "Download .md" to save a clean <code className="font-mono text-[11px] bg-muted px-1 rounded">README.md</code> ready to commit directly into your repository.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
