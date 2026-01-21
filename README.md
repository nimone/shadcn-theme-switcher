# shadcn-theme-switcher

A flexible, production-ready theme switcher for shadcn/ui with support for multiple themes options with light/dark theme mode.

## Usecases

**Perfect for:**
- 🎯 **User Personalization** - Allow your users to personalize their experience with multiple theme options.
- 🧪 **Design Exploration** - Quickly prototype and compare different themes before committing to a final one.
- 🏢 **Multi-Brand Apps** - Support different brands or clients within a single application by customizing to their color schemes dynamically.
- ♿ **Accessibility** - Provide theme variations optimized for different visual preferences and needs.

## Features

- 🎨 **Multiple Color Themes** - Switch between different color schemes seamlessly
- 🌓 **Light/Dark Mode** - Support for light, dark, and system preference modes
- 💾 **Persistent Storage** - Themes and modes persist across sessions using localStorage
- 🔄 **Cross-Tab Sync** - Theme changes sync automatically across browser tabs
- 🎭 **Custom Themes** - Easily create and use your own custom themes
- 🔤 **Google Fonts** - Automatic font loading for themed typography
- ⚡ **Zero Config** - Works out of the box with sensible defaults
- 🪝 **Headless Hooks** - Use the hooks directly for custom implementations
- 📦 **Tree-Shakeable** - Only import what you need

## Installation

```bash
npm install shadcn-theme-switcher
```

### Peer Dependencies

This package requires the following peer dependencies (which should already be installed in your shadcn/ui project):

```bash
npm install class-variance-authority clsx tailwind-merge tailwindcss
```

## Quick Start

Just add the **Theme Switcher** components and provide the themes.

```tsx
import { ThemeSwitcher, ModeSwitcher } from "shadcn-theme-switcher";
import { defaultThemes } from "shadcn-theme-switcher/themes";

function App() {
  return (
    <nav>
      <ThemeSwitcher themes={defaultThemes} defaultTheme="default" />
      <ModeSwitcher defaultMode="system" />
    </nav>
  );
}
```

That's it! Your app now has theme switching capabilities.

## Components

### `ModeSwitcher`

A dropdown component for switching between light, dark, and system modes.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultMode` | `"light" \| "dark" \| "system"` | `"system"` | Initial mode when no preference is stored |
| `className` | `string` | `undefined` | Additional CSS classes |

#### Example

```tsx
import { ModeSwitcher } from "shadcn-theme-switcher";

function Navigation() {
  return <ModeSwitcher defaultMode="dark" className="w-32" />;
}
```

### `ThemeSwitcher`

A dropdown component for switching between different color themes with theme palette previews.

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `themes` | `ThemeConfig[]` | Yes | Array of theme configurations |
| `defaultTheme` | `string` | No | Initial theme name (uses first theme if not provided) |
| `className` | `string` | No | Additional CSS classes |

#### Example

```tsx
import { ThemeSwitcher } from "shadcn-theme-switcher";
import { defaultThemes } from "shadcn-theme-switcher/themes";

function Navigation() {
  return (
    <ThemeSwitcher 
      themes={defaultThemes} 
      defaultTheme="violet-bloom"
      className="min-w-[200px]"
    />
  );
}
```

## Hooks

For more control or custom implementations, use the hooks directly.

### `useThemeMode`

Manages light/dark mode state and system preference detection.

#### Returns

| Property | Type | Description |
|----------|------|-------------|
| `mode` | `"light" \| "dark" \| "system"` | Current mode |
| `setMode` | `(mode: ThemeMode) => void` | Function to change mode |
| `effectiveMode` | `"light" \| "dark"` | Resolved mode (system → light/dark) |

#### Example

```tsx
import { useThemeMode } from "shadcn-theme-switcher";

function CustomModeSwitcher() {
  const { mode, setMode, effectiveMode } = useThemeMode({ 
    defaultMode: "system" 
  });

  return (
    <div>
      <p>Current Mode: {mode}</p>
      <p>Effective Mode: {effectiveMode}</p>
      <button onClick={() => setMode("light")}>Light</button>
      <button onClick={() => setMode("dark")}>Dark</button>
      <button onClick={() => setMode("system")}>System</button>
    </div>
  );
}
```

### `useTheme`

Manages color theme state and persistence.

#### Returns

| Property | Type | Description |
|----------|------|-------------|
| `theme` | `string` | Current theme name |
| `setTheme` | `(theme: string) => void` | Function to change theme |

> Note: 
> You have to handle the font loading yourself, use `applyThemeFonts`

#### Example

```tsx
import {useEffect} from "react"
import { useTheme, applyThemeFonts } from "shadcn-theme-switcher";
import { defaultThemes } from "shadcn-theme-switcher/themes";

function CustomThemeSwitcher() {
  const { theme, setTheme } = useTheme({ defaultTheme: "default" });

  const currentTheme = defaultThemes.find((t) => t.name === theme);

  useEffect(() => {
    const fonts = currentTheme?.fonts;
    if (fonts) applyThemeFonts(fonts);
  }, [currentTheme]);

  return (
    <div>
      <p>Current Theme: {theme}</p>
      <button onClick={() => setTheme("violet-bloom")}>Violet Bloom</button>
      <button onClick={() => setTheme("mocha-mousse")}>Mocha Mousse</button>
    </div>
  );
}
```

## Default Themes

The package includes 15 pre-built themes:

| Theme Name | Description |
|------------|-------------|
| `default` | The standard shadcn/ui theme |
| `modern-minimal` | Clean and modern minimalist design |
| `violet-bloom` | Vibrant violet and purple palette |
| `t3-chat` | Chat-inspired warm tones |
| `twitter` | Classic Twitter blue theme |
| `mocha-mousse` | Warm coffee-inspired browns |
| `bubblegum` | Playful pink and pastel colors |
| `amethyst-haze` | Mystical purple haze |
| `graphite` | Sleek graphite gray tones |
| `cosmic-night` | Deep cosmic purple palette |
| `mono` | Pure monochrome design |
| `notebook` | Paper-like notebook aesthetic |
| `doom-64` | Retro gaming-inspired colors |
| `catppuccin` | Pastel soothing color scheme |
| `perpetuity` | Terminal-style teal theme |
| `tangerine` | Warm tangerine orange accents |

Import them with:

```tsx
import { defaultThemes } from "shadcn-theme-switcher/themes";
```

## Creating Custom Themes

### Step 1: Define CSS Variables

Create a CSS file with your theme's color variables using OKLCH format:

```css
/* custom-themes.css */

/* Common settings for both light and dark modes */
:root[data-theme="forest-green"],
[data-theme="forest-green"] {
  /* Optional: Custom fonts */
  --font-sans: Poppins, sans-serif;
  --font-mono: Fira Code, monospace;
  --font-serif: Georgia, serif;
  
  /* Border radius */
  --radius: 0.5rem;
  
  /* Optional: Letter spacing adjustments */
  --tracking-normal: 0em;
}

/* Light mode colors */
:root[data-theme="forest-green"]:not(.dark),
/* This extra selector applies to non root elements such as theme palette preview */
[data-theme="forest-green"]:not(.dark) {
  --background: oklch(1 0 0);
  --foreground: oklch(0.3 0.08 145);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.3 0.08 145);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.3 0.08 145);
  --primary: oklch(0.5 0.15 145);
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.95 0.02 145);
  --secondary-foreground: oklch(0.3 0.08 145);
  --muted: oklch(0.97 0.01 145);
  --muted-foreground: oklch(0.5 0.03 145);
  --accent: oklch(0.92 0.04 145);
  --accent-foreground: oklch(0.35 0.1 145);
  --destructive: oklch(0.6 0.2 25);
  --destructive-foreground: oklch(1 0 0);
  --border: oklch(0.92 0.02 145);
  --input: oklch(0.92 0.02 145);
  --ring: oklch(0.5 0.15 145);
}

/* Dark mode colors */
:root[data-theme="forest-green"].dark,
[data-theme="forest-green"].dark {
  --background: oklch(0.2 0.02 145);
  --foreground: oklch(0.95 0.01 145);
  --card: oklch(0.25 0.02 145);
  --card-foreground: oklch(0.95 0.01 145);
  --popover: oklch(0.25 0.02 145);
  --popover-foreground: oklch(0.95 0.01 145);
  --primary: oklch(0.6 0.15 145);
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.3 0.03 145);
  --secondary-foreground: oklch(0.95 0.01 145);
  --muted: oklch(0.3 0.03 145);
  --muted-foreground: oklch(0.7 0.02 145);
  --accent: oklch(0.4 0.1 145);
  --accent-foreground: oklch(0.85 0.05 145);
  --destructive: oklch(0.6 0.2 25);
  --destructive-foreground: oklch(1 0 0);
  --border: oklch(0.35 0.03 145);
  --input: oklch(0.35 0.03 145);
  --ring: oklch(0.6 0.15 145);
}
```

### Step 2: Define Theme Configuration

```tsx
import type { ThemeConfig } from "shadcn-theme-switcher";
import "./custom-themes.css"; 

export const myCustomThemes: ThemeConfig[] = [
  {
    name: "forest-green",
    title: "Forest Green",
    description: "Inspired by nature",
    fonts: [
      { name: "Poppins", weights: [400, 600, 700] },
      { name: "Fira Code" }
    ]
  }
];
```

### Step 3: Import and Use

```tsx
import { ThemeSwitcher } from "shadcn-theme-switcher";
import { myCustomThemes } from "./custom-themes";

// Not required if already imported in your custom-themes file
import "./custom-themes.css"; 

function App() {
  return <ThemeSwitcher themes={myCustomThemes} />;
}
```

## API Reference

### Utility Functions

#### `applyMode(mode: ThemeMode): void`

Manually apply a theme mode to the document.

```tsx
import { applyMode } from "shadcn-theme-switcher";

applyMode("dark"); // Adds 'dark' class to document.documentElement
```

#### `applyTheme(themeName: string): void`

Manually apply a theme to the document.

```tsx
import { applyTheme } from "shadcn-theme-switcher";

applyTheme("violet-bloom"); // Sets data-theme="violet-bloom" on document.documentElement
```

#### `applyThemeFonts(fonts: ThemeFont[]): void`

Manually load Google Fonts.

```tsx
import { applyThemeFonts } from "shadcn-theme-switcher";

applyThemeFonts([
  { name: "Inter", weights: [400, 600] },
  { name: "Fira Code" }
]); // Smartly handles font link tags
```

#### `getSystemTheme(): "light" | "dark"`

Get the current system color scheme preference.

```tsx
import { getSystemTheme } from "shadcn-theme-switcher";

const systemPreference = getSystemTheme();
console.log(systemPreference); // "light" or "dark"
```

#### `getEffectiveMode(mode: ThemeMode): "light" | "dark"`

Resolve "system" mode to actual light/dark value.

```tsx
import { getEffectiveMode } from "shadcn-theme-switcher";

const effective = getEffectiveMode("system");
console.log(effective); // "light" or "dark" based on system preference
```

## Advanced Usage

### Headless Implementation

Create completely custom UI using the hooks:

```tsx
import { useTheme, useThemeMode } from "shadcn-theme-switcher";
import { Sun, Moon, Laptop } from "lucide-react";
import "your-custom-themes.css"

function CustomThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const { mode, setMode, effectiveMode } = useThemeMode();

  const themes = [
    { id: "default", name: "Default" },
    { id: "violet-bloom", name: "Violet" }
  ];

  return (
    <div className="flex gap-4">
      {/* Mode Buttons */}
      <div className="flex gap-2">
        <button 
          onClick={() => setMode("light")}
          className={mode === "light" ? "active" : ""}
        >
          <Sun size={20} />
        </button>
        <button 
          onClick={() => setMode("dark")}
          className={mode === "dark" ? "active" : ""}
        >
          <Moon size={20} />
        </button>
        <button 
          onClick={() => setMode("system")}
          className={mode === "system" ? "active" : ""}
        >
          <Laptop size={20} />
        </button>
      </div>

      {/* Theme Buttons */}
      <div className="flex gap-2">
        {themes.map(t => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={theme === t.id ? "active" : ""}
          >
            {t.name}
          </button>
        ))}
      </div>
    </div>
  );
}
```

### SSR/SSG Support

For Next.js or other SSR frameworks, prevent hydration mismatches:

```tsx
"use client"; // For Next.js App Router

import { useEffect, useState } from "react";
import { ModeSwitcher } from "shadcn-theme-switcher";

function Navigation() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-32 h-10" />; // Placeholder
  }

  return <ModeSwitcher />;
}
```

### Cross-Tab Synchronization

Theme changes automatically sync across tabs. You can also listen to changes:

```tsx
import { useEffect } from "react";
import { useTheme, useThemeMode } from "shadcn-theme-switcher";

function SyncedComponent() {
  const { theme } = useTheme();
  const { mode } = useThemeMode();

  useEffect(() => {
    console.log("Theme changed:", theme);
    // React to theme changes from other tabs
  }, [theme]);

  useEffect(() => {
    console.log("Mode changed:", mode);
    // React to mode changes from other tabs
  }, [mode]);

  return <div>Current: {theme} ({mode})</div>;
}
```

### Programmatic Theme Loading

Load themes dynamically based on user preferences or API data:

```tsx
import { useState, useEffect } from "react";
import { ThemeSwitcher } from "shadcn-theme-switcher";
import type { ThemeConfig } from "shadcn-theme-switcher";

function DynamicThemeSwitcher() {
  const [themes, setThemes] = useState<ThemeConfig[]>([]);

  useEffect(() => {
    // Fetch themes from API
    fetch("/api/themes")
      .then(res => res.json())
      .then(data => setThemes(data));
  }, []);

  useEffect(() => {
    // Load the theme css file dynamically
    const link = document.createElement("link");

    link.type = "text/css";
    link.rel = "stylesheet";
    // Your theme css file destination
    link.href = `/api/themes/${theme}/styles.css`;

    document.head.appendChild(link);
    return () => { document.head.removeChild(link); }
  }, [theme])

  if (themes.length === 0) {
    return <div>Loading themes...</div>;
  }

  return <ThemeSwitcher themes={themes} />;
}
```

## Troubleshooting

### CSS Not Loading

**Problem:** Theme colors aren't being applied.

**Solutions:**

1. **Ensure CSS is imported** - In some rare cases you might have to import the themes.css file in your entry point:
   ```tsx
   import "shadcn-theme-switcher/themes.css";
   ```

2. **Verify data-theme attribute** - Check that `data-theme` is set on the root element:
   ```tsx
   // Open DevTools and inspect <html> element
   // Should see: <html data-theme="violet-bloom">
   ```

3. **Check CSS specificity** - Ensure theme styles aren't being overridden:
   ```css
   /* Your theme CSS should target the data-theme attribute */
   [data-theme="my-theme"] {
     --primary: oklch(0.6231 0.188 259.8145);
   }
   ```

### Theme Flash on Load (FOUC)

**Problem:** You see a brief flash of the wrong theme when the page loads.

**Solutions:**

1. **Add inline script** - Prevent flash by setting theme before React hydrates:
   ```html
   <!-- In your index.html -->
   <script>
     try {
       const theme = localStorage.getItem('app-theme') || 'default';
       const mode = localStorage.getItem('app-theme-mode') || 'system';
       document.documentElement.setAttribute('data-theme', theme);
       
       if (mode === 'dark' || (mode === 'system' && 
           window.matchMedia('(prefers-color-scheme: dark)').matches)) {
         document.documentElement.classList.add('dark');
       }
     } catch (e) {}
   </script>
   ```

2. **For Next.js**, use the `next-themes` pattern:
   ```tsx
   // app/layout.tsx
   export default function RootLayout({ children }) {
     return (
       <html suppressHydrationWarning>
         <head>
           <script dangerouslySetInnerHTML={{
             __html: `
               try {
                 const theme = localStorage.getItem('app-theme') || 'default';
                 const mode = localStorage.getItem('app-theme-mode') || 'system';
                 document.documentElement.setAttribute('data-theme', theme);
                 if (mode === 'dark' || (mode === 'system' && 
                     window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                   document.documentElement.classList.add('dark');
                 }
               } catch (e) {}
             `
           }} />
         </head>
         <body>{children}</body>
       </html>
     );
   }
   ```

### Fonts Not Loading

**Problem:** Google Fonts specified in theme config aren't loading.

**Solutions:**

1. **Check font names** - Ensure font names match Google Fonts exactly:
   ```tsx
   // ✅ Correct
   fonts: [{ name: "Plus Jakarta Sans" }]
   
   // ❌ Incorrect
   fonts: [{ name: "Plus-Jakarta-Sans" }]
   ```

2. **Apply fonts manually** if needed:
   ```tsx
   import { applyThemeFonts } from "shadcn-theme-switcher";
   
   useEffect(() => {
     applyThemeFonts([
       { name: "Inter", weights: [400, 600, 700] }
     ]);
   }, []);
   ```

3. **Use CSS font-family** - Reference the loaded font in your CSS:
   ```css
   [data-theme="my-theme"] {
     font-family: "Inter", sans-serif;
   }
   ```

### Theme Not Persisting

**Problem:** Theme resets on page reload.

**Solutions:**

1. **Check localStorage access** - Ensure localStorage is available:
   ```tsx
   // Test in browser console
   localStorage.setItem('test', 'value');
   console.log(localStorage.getItem('test')); // Should log 'value'
   ```

2. **Verify storage keys** - Check that the correct keys are being used:
   ```tsx
   // Theme key: 'app-theme'
   // Mode key: 'app-theme-mode'
   console.log(localStorage.getItem('app-theme'));
   console.log(localStorage.getItem('app-theme-mode'));
   ```

3. **Private/Incognito mode** - localStorage may be disabled in private browsing.

### Styles Conflict with shadcn/ui

**Problem:** Theme switcher styles conflict with your shadcn/ui components.

**Solutions:**

1. **Namespace conflict** - The package uses `.shadcn-theme-switcher` class:
   ```tsx
   // All components are wrapped with this class
   <div className="shadcn-theme-switcher">...</div>
   ```

2. **Override styles** - Use higher specificity if needed:
   ```css
   .my-app .shadcn-theme-switcher {
     /* Your overrides */
   }
   ```

3. **Use custom implementation** - Build your own UI with the hooks:
   ```tsx
   import { useTheme } from "shadcn-theme-switcher";
   // Build custom component without using pre-built components
   ```

### Cross-Tab Sync Not Working

**Problem:** Theme changes don't sync across browser tabs.

**Solutions:**

1. **Check if using same origin** - Cross-tab sync only works on same domain/port.

2. **Test storage events** - Verify events are firing:
   ```tsx
   useEffect(() => {
     const handler = (e: StorageEvent) => {
       console.log("Storage changed:", e.key, e.newValue);
     };
     window.addEventListener("storage", handler);
     return () => window.removeEventListener("storage", handler);
   }, []);
   ```

3. **Same tab updates** - Use custom events for updates in the same tab (already handled by the package).

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern mobile browsers

Requires support for:
- CSS custom properties
- `prefers-color-scheme` media query
- localStorage API
- CustomEvent API

## Contributing

Contributions are welcome! Please check the [GitHub repository](https://github.com/nimone/shadcn-theme-switcher) for guidelines.

## License

MIT © [Nishant Mogha](https://github.com/nimone)

## Credits

Built with:
- [tweakcn Themes](https://github.com/jnsahaj/tweakcn)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

---

**Need help?** [Open an issue](https://github.com/nimone/shadcn-theme-switcher/issues) or check existing discussions.
