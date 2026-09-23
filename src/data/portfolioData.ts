export interface Project {
  id: string;
  title: string;
  category: 'AI Agents & Systems' | 'Developer Tools & IDEs' | 'Data Science & Analytics' | 'Video & Motion Eng';
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  architectureDetails: string[];
  metrics: { label: string; value: string }[];
  technologies: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  featured: boolean;
  systemDiagram?: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    surname: string;
    title: string;
    tagline: string;
    status: string;
    isAvailable: boolean;
    location: string;
    email: string;
    github: string;
    linkedin: string;
    kaggle: string;
    university: string;
    yearOfStudy: string;
    targetRole: string;
    photoUrl: string;
    bio: {
      lead: string;
      full: string[];
    };
  };
  metrics: {
    label: string;
    value: string;
    description: string;
  }[];
  projects: Project[];
}

export const portfolioData: PortfolioData = {
  personal: {
    name: 'Soham',
    surname: 'Bhagat',
    title: 'B.Sc. Data Science Student (2nd Year) & AI Systems Developer',
    tagline: 'Undergraduate Data Science student at SPPU building multi-agent developer tools (Forge Studio), autonomous video pipelines, and full-stack AI applications.',
    status: '2nd Year B.Sc. Data Science @ SPPU • Open for AI Engineering Internships',
    isAvailable: true,
    location: 'Pune, Maharashtra, India • Open to Remote',
    email: 'soham.ai.research@gmail.com',
    github: 'https://github.com',
    linkedin: 'https://www.linkedin.com/in/soham-bhagat-0132b33a0/',
    kaggle: 'https://kaggle.com',
    university: 'Savitribai Phule Pune University (SPPU), Department of Technology',
    yearOfStudy: '2nd Year (Semester 3 / 4)',
    targetRole: 'AI Software Engineering / Data Science Intern',
    photoUrl: '/images/soham.png',
    bio: {
      lead: '2nd-year B.Sc. Data Science undergraduate at Savitribai Phule Pune University (SPPU) building multi-agent developer tools, token-optimized local knowledge systems, and statistical machine learning pipelines.',
      full: [
        'Currently in my 2nd year of B.Sc. Data Science at SPPU Department of Technology (2024–2028), having completed FY Semester 1 & 2 covering Python, R, Statistical Analytics, Data Visualization, and Database Management Systems.',
        'I build production-grade developer tools—including Forge Studio (a multi-agent parallel IDE orchestrating Claude Code and Antigravity CLI with Git worktree isolation) and Verica Agentic OS (a zero-token SQLite local brain with screen awareness).',
        'Passionate about bridging practical machine learning theory with robust full-stack software engineering, terminal PTY multiplexing, and automated media generation workflows.'
      ]
    }
  },
  metrics: [
    {
      label: 'Academic Standing',
      value: '2nd Year (SY)',
      description: 'B.Sc. Data Science @ SPPU Dept of Technology'
    },
    {
      label: 'Flagship Systems',
      value: '4 Shipped',
      description: 'Forge Studio, Verica OS, HyperFrames Engine, DragonHomie'
    },
    {
      label: 'Local Brain Context',
      value: '<200 Tokens',
      description: 'Zero-token SQLite graph memory replacing bloated prompt dumps'
    },
    {
      label: 'Core Languages',
      value: 'Python, R, TS',
      description: 'Statistical modeling, full-stack Next.js, FastAPI & SQL'
    }
  ],
  projects: [
    {
      id: 'forge-studio',
      title: 'Forge Studio (ForgeADE): Multi-Agent Parallel IDE & CLI Orchestrator',
      category: 'Developer Tools & IDEs',
      tagline: 'Desktop orchestration IDE running multiple AI coding agents side-by-side in isolated Git worktrees.',
      description: 'An open-source desktop app that launches and orchestrates multiple AI coding CLIs (Claude Code, Antigravity CLI, Codex) in terminal grids with zero-collision Git worktree isolation.',
      problem: 'Running multiple autonomous coding agents simultaneously in a single workspace causes git collisions, merge conflicts, and unreadable terminal outputs.',
      solution: 'Engineered a 3-layer launch wizard, ConPTY/node-pty terminal streaming grid with xterm.js, and per-session Git worktree isolation under .worktrees/<sessionId>.',
      architectureDetails: [
        'Multi-pane terminal grid (2/4/6/8 panes) with real-time xterm.js GPU-accelerated rendering',
        'Git worktree sandbox manager isolating branches per terminal session',
        'Electron desktop packaging with Vite, React, TypeScript, and Tailwind CSS'
      ],
      metrics: [
        { label: 'Worktree Isolation', value: '100% Collision-Free' },
        { label: 'Terminal Panes', value: 'Up to 8 Parallel' },
        { label: 'Supported CLIs', value: 'Claude, AGY, Codex' }
      ],
      technologies: ['React', 'TypeScript', 'Node.js', 'ConPTY', 'xterm.js', 'Electron', 'Git Worktrees'],
      githubUrl: 'https://github.com/example/forge-studio',
      featured: true,
      systemDiagram: 'User Launch Wizard -> Git Worktree Fork -> ConPTY Node Backend -> xterm.js Terminal Grid -> Parallel Agent Execution'
    },
    {
      id: 'verica-agentic-os',
      title: 'Verica: Agentic OS with Token-Optimized Knowledge Graph & Screen Vision',
      category: 'AI Agents & Systems',
      tagline: 'Autonomous personal operating assistant with zero-token SQLite memory and screen awareness.',
      description: 'An autonomous personal operating assistant built for local desktop integration, screen capture diagnostics, and voice push-to-talk.',
      problem: 'Conventional LLM agents waste tens of thousands of tokens dumping raw conversation transcripts on every prompt, leading to high cost and slow responses.',
      solution: 'Created an on-demand SQLite entity & relationship knowledge graph that extracts compact ~200 token context slices, plus a human-in-the-loop file modification gatekeeper.',
      architectureDetails: [
        'Zero-token SQLite entity/relationship knowledge graph extraction (<200 tokens)',
        'On-demand desktop screen capture with crop, resize, and image compression',
        'Local voice daemon powered by faster-whisper STT and edge-tts (0 API cost)'
      ],
      metrics: [
        { label: 'Context Size', value: '~200 Tokens' },
        { label: 'Voice API Cost', value: '$0.00 (Local)' }
      ],
      technologies: ['FastAPI', 'Python', 'SQLite', 'Next.js', 'faster-whisper', 'edge-tts', 'Tailwind CSS'],
      githubUrl: 'https://github.com/example/agentic-os',
      featured: true
    },
    {
      id: 'hyperframes-motion',
      title: 'HyperFrames: Autonomous Motion Graphics & Video Agent',
      category: 'Video & Motion Eng',
      tagline: 'Automated video composition engine with 32 visual identities and kinetic typography.',
      description: 'A modular video synthesis pipeline that converts raw text into designed, animated motion graphics cards, lower-thirds, audio-reactive waveforms, and full MP4 videos.',
      problem: 'Manual video editing for educational and technical content takes hours per clip with repetitive keyframing.',
      solution: 'Built an autonomous HTML/CSS/GSAP composition framework utilizing HyperFrames and Remotion to render deterministic, frame-accurate motion graphics via FFmpeg.',
      architectureDetails: [
        '32 cataloged visual design identities (editorial, terminal, neon, dossier, matte)',
        'Whisper transcription with word-level timing synchronization'
      ],
      metrics: [
        { label: 'Visual Identities', value: '32 Styles' },
        { label: 'Workflow Boost', value: '10x Faster' }
      ],
      technologies: ['HyperFrames', 'Remotion', 'GSAP', 'FFmpeg', 'Node.js', 'Whisper'],
      githubUrl: 'https://github.com/example/hyperframes-agent',
      featured: true
    }
  ]
};
