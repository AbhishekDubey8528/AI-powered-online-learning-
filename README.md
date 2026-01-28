# Online Learning Platform

An AI-powered online learning platform built with Next.js, Clerk, Drizzle ORM, and Neon Database.

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/)
- **Authentication:** [Clerk](https://clerk.com/)
- **Database:** [Neon (PostgreSQL)](https://neon.tech/)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Components:** [Radix UI](https://www.radix-ui.com/)
- **AI:** Google GenAI

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd online-learning-main
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up Environment Variables:**

    Create a `.env` file in the root directory and add your required environment variables (Clerk keys, Database URL, etc.).

    ```env
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
    CLERK_SECRET_KEY=...
    DATABASE_URL=...
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

- `npm run dev`: Runs the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Lints the codebase.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deployment to Render

1.  **Create a New Web Service** on [Render](https://render.com/).
2.  **Connect your GitHub repository**.
3.  **Use the following settings:**

    | Field | Value |
    | :--- | :--- |
    | **Build Command** | `npm install; npm run build` |
    | **Start Command** | `npm start` |

4.  **Add Environment Variables:**
    
    You must add the following environment variables in the Render Dashboard (use values from your local `.env`):
    
    - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
    - `CLERK_SECRET_KEY`
    - `NEXT_PUBLIC_CLERK_SIGN_IN_URL` (`/sign-in`)
    - `NEXT_PUBLIC_CLERK_SIGN_UP_URL` (`/sign-up`)
    - `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL` (`/workspace`)
    - `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL` (`/workspace`)
    - `DATABASE_URL`
    - `NEXT_PUBLIC_DATABASE_URL`
    - `GEMINI_API_KEY`
    - `IMAGE_API_KEY`
    - `YT_API_KEY`
    - `NEXT_PUBLIC_HOST` (`https://ai-powered-online-learning.onrender.com`)
    - `NEXT_PUBLIC_APP_URL` (`https://ai-powered-online-learning.onrender.com`)

