# GitHub Repositories Explorer

## Description

GitHub Repositories Explorer is a React application that integrates with the GitHub API. It allows users to search for up to 5 GitHub users with usernames similar to the value entered in the text input. Upon selecting a user, the application displays all repositories associated with the chosen GitHub user.

## Features

- Search for up to 5 GitHub users based on a username query.
- Display repositories of a selected GitHub user without limitations.
- Built using Vite, Tailwind CSS, and TypeScript.

## Installation

Follow these steps to install and run the project locally:

1. Clone the repository:
   ```sh
   git clone https://github.com/AlfaSakan/github-repositories-explorer.git
   cd github-repositories-explorer
   ```
2. Install dependencies using Yarn:
   ```sh
   yarn install
   ```
3. Start the development server:
   ```sh
   yarn dev
   ```

## Folder Structure

```
src/
│-- components/
│   │-- atoms/
│   │-- molecules/
│   │-- organisms/
│-- models/
│-- routes/
│-- services/
│-- pages/
```

## Usage

1. Enter a username in the search bar.
2. The application fetches and displays up to 5 matching GitHub users.
3. Click on a user to view their repositories.
