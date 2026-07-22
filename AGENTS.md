# Consultant Simulator

## Commands

- Install dependencies with `npm ci`.
- Run the development server with `npm run dev`. Set `PORT` when port 3000 is occupied.
- Create the production bundle with `npm run deploy`.
- `npm test` is a historical lint command that currently references an uninstalled `standard` binary.

## Architecture

- This is a Phaser CE 2 browser game built with Babel 6 and Webpack 1.
- Game states live in `src/states`, levels live in `src/levels`, and shared UI/game helpers live in `src/helpers`.
- Pass the actual `Phaser.Game` instance (`this.game`) to sprite constructors. Phaser CE 2.12 rejects `Phaser.State` objects.
- Keep gameplay coordinates independent from display scaling. Landscape uses a 1280x704 logical viewport and portrait uses 704x704.

## Interface Guidelines

- Preserve the existing pixel art, warm palette, playful consulting satire, and lightweight arcade presentation.
- Scale the complete game uniformly within the available viewport. Do not stretch, crop, or independently scale the axes.
- Preserve keyboard and touch input parity when changing controls.
- Respect phone safe areas, orientation changes, and coarse-pointer touch targets.
- Keep interface chrome quiet enough that gameplay remains visually dominant.

## Working Agreements

- Keep changes compatible with the existing Babel 6/Webpack 1 toolchain unless an upgrade is explicitly requested.
- Run `npm run deploy` after source changes and check the affected flow in Chrome at desktop and mobile viewport sizes.
- Do not edit generated files in `dist` by hand; rebuild them with `npm run deploy`.
