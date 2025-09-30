# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/267988c2-c26c-4b27-b902-7ab91375851f

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/267988c2-c26c-4b27-b902-7ab91375851f) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/267988c2-c26c-4b27-b902-7ab91375851f) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

💻 Frontend Application (ATSFrontend-main)
ATSFrontend-main/
├── public/
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── app/
│   │   └── layout.tsx
│   ├── components/
│   │   ├── auth/
│   │   │   ├── AuthenticatedApp.tsx
│   │   │   └── UnauthenticatedApp.tsx
│   │   ├── feedback/
│   │   │   └── FeedbackDialog.tsx
│   │   ├── ui/
│   │   │   ├── accordion.tsx
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── alert.tsx
│   │   │   ├── aspect-ratio.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── ... (many shadcn-ui components)
│   │   │   └── use-toast.ts
│   │   ├── ContactPopup.tsx
│   │   ├── Layout.tsx
│   │   └── Navbar.tsx
│   ├── config/
│   │   └── api.ts             // API URL configuration
│   ├── hooks/
│   │   ├── use-auth-token.ts  // Clerk authentication token hook
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── lib/
│   │   ├── api-utils.ts       // Authenticated fetch wrapper
│   │   ├── mock-data.ts       // Mock data and functions
│   │   └── utils.ts
│   ├── pages/
│   │   ├── CandidateDetail.tsx
│   │   ├── Candidates.tsx
│   │   ├── Dashboard.tsx      // Talent analytics dashboard
│   │   ├── Home.tsx
│   │   ├── Index.tsx
│   │   ├── NotFound.tsx
│   │   ├── Pricing.tsx
│   │   ├── Search.tsx         // Semantic search page
│   │   └── Upload.tsx         // Resume upload page
│   ├── App.css
│   ├── App.tsx                // Main app setup and routing
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .gitignore
├── bun.lockb
├── components.json
├── eslint.config.js
├── index.html
├── LICENSE
├── package.json
├── package-lock.json
├── postcss.config.js
├── README.md
├── tailwind.config.ts
├── TODO.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts