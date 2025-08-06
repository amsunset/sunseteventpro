{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 :root \{\
  /* Core Brand Colors */\
  --background: #f6f6f6;\
  --foreground: #182e47;\
  --card: #ffffff;\
  --card-foreground: #182e47;\
  --popover: #f3f6f9;\
  --popover-foreground: #182e47;\
  --primary: #fba954;            /* Brand orange */\
  --primary-foreground: #182e47; /* High contrast for legibility */\
  --secondary: #0897b6;          /* Brand teal */\
  --secondary-foreground: #ffffff;\
  --accent: #bb3208;             /* Deep orange-brown, better contrast than orange */\
  --accent-foreground: #ffffff;\
  --destructive: #c3254b;\
  --destructive-foreground: #ffffff;\
  --muted: #f3f6f9;\
  --muted-foreground: #495466;\
  --border: #0897b6;\
  --input: #ffffff;\
  --ring: #0897b6;\
  --sidebar: #f4f6f8;\
  --sidebar-foreground: #182e47;\
  --sidebar-primary: #fba954;\
  --sidebar-primary-foreground: #182e47;\
  --sidebar-accent: #0897b6;\
  --sidebar-accent-foreground: #ffffff;\
  --sidebar-border: #0897b6;\
  --sidebar-ring: #c2d9e5;\
  --chart-1: #fba954;\
  --chart-2: #bb3208;\
  --chart-3: #0897b6;\
  --chart-4: #3fa7f6;\
  --chart-5: #c3254b;\
  --radius: 14px;\
\
  /* Shadows (Light Mode) */\
  --shadow-md: 0 2px 8px 0px rgba(24,46,71,0.10), 0 1px 2px 0px rgba(8,151,182,0.06);\
\}\
\
.dark \{\
  --background: #15181c; /* Closer to true black for dark mode, less blue */\
  --foreground: #fafafa;\
  --card: #21242a;\
  --card-foreground: #fafafa;\
  --popover: #23252a;\
  --popover-foreground: #fafafa;\
  --primary: #fba954;\
  --primary-foreground: #15181c;\
  --secondary: #0897b6;\
  --secondary-foreground: #ffffff;\
  --accent: #bb3208;\
  --accent-foreground: #ffffff;\
  --destructive: #c3254b;\
  --destructive-foreground: #ffffff;\
  --muted: #23252a;\
  --muted-foreground: #a1a1a1;\
  --border: #0897b6;\
  --input: #2a2d33;\
  --ring: #3fa7f6;\
  --sidebar: #181a1f;\
  --sidebar-foreground: #fafafa;\
  --sidebar-primary: #fba954;\
  --sidebar-primary-foreground: #181a1f;\
  --sidebar-accent: #0897b6;\
  --sidebar-accent-foreground: #ffffff;\
  --sidebar-border: #0897b6;\
  --sidebar-ring: #3fa7f6;\
  --chart-1: #fba954;\
  --chart-2: #bb3208;\
  --chart-3: #0897b6;\
  --chart-4: #3fa7f6;\
  --chart-5: #c3254b;\
  --radius: 14px;\
\
  /* Shadows (Dark Mode, using brand teal) */\
  --shadow-md: -3.5px 12px 23px -2px rgba(8,151,182,0.27), 0 1.5px 4px 0px rgba(8,151,182,0.10);\
\}\
\
/* Shadow applied ONLY to major UI elements */\
.card,\
.popover,\
.dashboard-panel,\
.modal,\
.sheet \{\
  box-shadow: var(--shadow-md);\
  border-radius: var(--radius);\
\}\
\
/* Optional: Sidebar/inputs have no shadow for flat, minimal look */\
.sidebar, .input \{\
  box-shadow: none;\
\}\
\
/* General Typography */\
body, .app-root \{\
  font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, 'Noto Sans', sans-serif;\
  color: var(--foreground);\
  background: var(--background);\
\}\
\
/* Buttons */\
.button-primary \{\
  background: var(--primary);\
  color: var(--primary-foreground);\
  border-radius: var(--radius);\
\}\
.button-secondary \{\
  background: var(--secondary);\
  color: var(--secondary-foreground);\
  border-radius: var(--radius);\
\}\
\
/* Inputs */\
.input, .input:focus \{\
  background: var(--input);\
  color: var(--foreground);\
  border: 1.5px solid var(--border);\
  border-radius: var(--radius);\
\}\
\
/* Borders for cards, panels, etc */\
.card, .popover, .dashboard-panel, .modal, .sheet \{\
  border: 1.5px solid var(--border);\
\}}