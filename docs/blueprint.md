# **App Name**: Impostor Recibida Lucía

## Core Features:

- Player Input: Input fields for adding player names to a list before starting the game.
- Configuration Selection: Allow selection of number of impostors, number of rounds and categories
- Role Assignment: Assigns roles ('Impostor' or a secret word from chosen category) randomly to each player at the beginning of each round.
- Turn-Based Display: Shows the current player's turn and prompts them to view their assigned role.
- Role Reveal: Reveals the player's role (either the secret word or 'You are the Impostor') upon interaction (click/hold), then prompts to pass the device to the next player.
- Debate Timer: Presents a timer and a player list to facilitate the discussion phase once everyone has seen their role.
- Category Selection: Presents a set of options like 'Famosos Argentina', 'Películas', 'Famosos Mundial', 'Música', and 'Países'.

## Style Guidelines:

- Primary color: Pastel violet (#D8B4FE), fitting the playful aesthetic and pastel color theme.
- Background color: Very light pastel violet (#F5EEFF), same hue as primary but desaturated for a light scheme.
- Accent color: Pastel yellow (#FDE68A), a distinct hue providing a cheerful contrast.
- Headline font: 'Poppins', a geometric sans-serif font for the title.
- Body font: 'PT Sans', a humanist sans-serif font to be used for the turn selector and button.
- Floating icons: Graduation hats and diplomas floating around the main title on the homepage, adding a festive touch.
- Card Style: Use playing-card style for the turn selector, modern rounded borders (rounded-2xl) and subtle shadows for the general layout components to enhance the single-device UI experience.
- Confetti Animation: Implement a confetti animation using the canvas-confetti library to display on page load, creating a festive welcome.