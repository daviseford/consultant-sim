# Consultant Simulator

## Project Commands

- Install dependencies with `npm ci`.
- Run the development server with `npm run dev`. Set `PORT` when port 3000 is occupied.
- Create the production bundle with `npm run deploy`.
- `npm test` is a historical lint command that currently references an uninstalled `standard` binary.

## Implementation Notes

- This is a Phaser CE 2 game built with Babel 6 and Webpack 1.
- Pass the actual `Phaser.Game` instance (`this.game`) to sprite constructors; Phaser CE 2.12 rejects `Phaser.State` objects.
- Keep gameplay coordinates independent from display scaling. Landscape uses a 1280×704 logical viewport and portrait uses 704×704.
- Preserve keyboard and touch input parity when changing controls.

## Design Context

### Users
Casual browser-game players on desktop, tablet, and mobile. They should be able to start playing immediately with a keyboard or direct touch controls, in either portrait or landscape orientation.

### Brand Personality
Playful, nostalgic, and irreverent. The consulting satire and handmade pixel-art character should remain the focus.

### Aesthetic Direction
Preserve the existing retro pixel-art assets, warm tile palette, and lightweight arcade presentation. Scale the complete game uniformly within the available viewport instead of stretching or cropping it. Keep touch controls visually distinct but quiet enough not to obscure gameplay.

### Design Principles

- Preserve gameplay geometry: never distort, crop, or independently scale the game axes.
- Keep the game as large as the safe viewport allows, centered with intentional letterboxing when aspect ratios differ.
- Maintain input parity: every keyboard action must have an obvious touch equivalent.
- Respect phone safe areas, orientation changes, and coarse-pointer touch targets.
- Add as little interface chrome as possible so the original game remains visually dominant.
