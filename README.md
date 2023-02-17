# cards-of-carousal

Be sure to check the package.json on the top level to see all commands.


## Live link

https://www.cardsofcarousal.com/

## **Getting Started**

1. Be sure you are on Node version 14 LTS

### Installations

1. Run `npm run install-all` on the top level (directory with both frontend and backend directories)

### Backend

1. Navigate to the /backend directory
2. Create a `.env` file
3. Copy contents of `sample.env` to `.env`
4. Edit environment variables within `.env` to fit your needs

### Frontend

1. Navigate to the /frontend directory
2. Create a `.env` file
3. Copy contents of `sample.env` to `.env`
4. Edit environment variables within `.env` to fit your needs

### Running

1. Run `npm run dev:backend` to start the websocket and express server
2. Run `npm run dev:frontend` to start the React dev server.

### Debugging

#### Backend

There is a debugger setup for VSCode, instead of starting the backend with `npm run dev:backend`:

- Click the "debugger" icon on the left panel
- Be sure the menu at the top says "Debug Backend"
- Click the green arrow, or press `f5` to start the backend

#### Frontend

There is a debugger setup for VSCode, to use it:

- Start the frontend application like normal
- Close the react tab that automatically opens
- Click the "debugger" icon on the left panel
- Be sure the menu at the top says "Debug Frontend"
- Click the green arrow, or press `f5` to launch a debugging window for chrome

## Testing

### Backend

run `npm run test:backend`, observe the output.

### Frontend

To be setup

## **ESLint rules**

- Based on the Airbnb style guide
  - Removed rule disallowing .js extensions for files with jsx
  - eslint.rc file lives at the root of the repo
  - Husky and lint-staged will not allow you to push un-linted commits. Look out for errors when you commit.

Created by Odin Students
