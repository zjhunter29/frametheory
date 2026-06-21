/**
 * Centralized plugin catalog.
 *
 * ── ADDING A NEW PLUGIN ──────────────────────────────────────────
 * 1. Add a new entry to the PLUGINS array below.
 * 2. Drop an image into /Plugin Display Images/ named plugin{id}.png
 *    (matching the id field, e.g. id: 7 -> plugin7.png).
 * 3. Set payhipLink to your Payhip URL. While it is the literal string
 *    "PAYHIP_LINK_HERE", the Buy button stays disabled with a tooltip.
 *
 * The plugin will automatically appear on the homepage Featured Plugins
 * section (if `featured: true`), in the Plugins catalog, in the
 * Marketplace, and have its own detail page at /plugin.html?id={id}.
 */
window.PLUGINS = [
  {
    id: 1,
    name: 'FrameTheory Cinematic Color',
    tagline: 'Cinematic color grading, reimagined.',
    description: 'Pro-grade color science, before/after split, LUT library, and AI-assisted suggestions — built natively into Premiere Pro.',
    category: 'Video Editing',
    version: '1.0.0',
    price: '$49',
    rating: 4.9,
    reviews: 312,
    released: '2026-05-01',
    featured: true,
    features: [
      'Industry-standard color wheels (Lift / Gamma / Gain)',
      'Curated LUT library across 14 styles',
      'AI-assisted suggestions on-device',
      'Before/After split slider with histogram',
      'One-click cinematic presets'
    ],
    payhipLink: 'PAYHIP_LINK_HERE'
  },
  {
    id: 2,
    name: 'Aperture Sound',
    tagline: 'Cinematic audio post in a single panel.',
    description: 'Adaptive noise reduction, dialogue leveling, and room-tone matching for fast, broadcast-ready mixes.',
    category: 'Productivity',
    version: '0.9.2',
    price: '$29',
    rating: 4.7,
    reviews: 88,
    released: '2026-04-12',
    featured: true,
    features: [
      'Adaptive noise reduction',
      'Auto dialogue leveling',
      'Room-tone match & fill',
      'Loudness normalization (EBU R128)'
    ],
    payhipLink: 'PAYHIP_LINK_HERE'
  },
  {
    id: 3,
    name: 'Title Forge',
    tagline: 'Kinetic titles, zero keyframes.',
    description: 'A library of 80+ motion title presets with editable text, color, and timing — drag, drop, done.',
    category: 'Design',
    version: '1.3.1',
    price: '$19',
    rating: 4.8,
    reviews: 154,
    released: '2026-03-20',
    featured: true,
    features: [
      '80+ animated title presets',
      'Editable text, color, timing',
      'Type-on, slide, mask, glitch styles',
      'Synced to your project frame rate'
    ],
    payhipLink: 'PAYHIP_LINK_HERE'
  },
  {
    id: 4,
    name: 'Lens Library',
    tagline: 'Analog flares, halations, bloom — done right.',
    description: 'A curated library of real lens flares, halations, and bloom passes scanned from vintage cinema glass.',
    category: 'Utilities',
    version: '1.1.0',
    price: '$24',
    rating: 4.6,
    reviews: 71,
    released: '2026-02-08',
    featured: false,
    features: [
      '40+ real anamorphic flare scans',
      'Halation and bloom passes',
      'GPU-accelerated compositing',
      'Color-matched per shot'
    ],
    payhipLink: 'PAYHIP_LINK_HERE'
  },
  {
    id: 5,
    name: 'AutoCut AI',
    tagline: 'Rough cuts in seconds, not hours.',
    description: 'On-device AI that watches your footage, finds the best takes, and assembles a rough cut you can refine.',
    category: 'AI Tools',
    version: '0.6.0',
    price: '$59',
    rating: 4.5,
    reviews: 42,
    released: '2026-05-22',
    featured: false,
    features: [
      'On-device shot detection',
      'Take selection from multi-cam',
      'Auto-marker beats for music sync',
      'Refinable assembly, never destructive'
    ],
    payhipLink: 'PAYHIP_LINK_HERE'
  },
  {
    id: 6,
    name: 'ColorMatch',
    tagline: 'Match any two shots, instantly.',
    description: 'Pick a reference clip, pick your shot — ColorMatch reads both and applies a faithful grade in one pass.',
    category: 'Video Editing',
    version: '2.0.0',
    price: '$34',
    rating: 4.8,
    reviews: 197,
    released: '2026-01-15',
    featured: false,
    features: [
      'Reference / target shot picker',
      'Perceptual color matching',
      'Skin-tone protection',
      'Exports as a .cube LUT'
    ],
    payhipLink: 'PAYHIP_LINK_HERE'
  }
];

window.CATEGORIES = [
  'Video Editing',
  'AI Tools',
  'Productivity',
  'Design',
  'Utilities'
];
