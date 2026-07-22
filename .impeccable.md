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
