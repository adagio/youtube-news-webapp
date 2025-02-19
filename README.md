# YouTube News Client

A React-based web application that provides personalized YouTube news content for authenticated users.

## Features

- User authentication with Supabase
- Personalized news feed
- Infinite scroll video grid
- Responsive design

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Supabase account with configured authentication

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd client-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```properties
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_KEY=your_supabase_anon_key
VITE_SITE_URL=http://localhost:5173
VITE_BACKEND_BASE_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier

## Tech Stack

- React 19
- Vite
- React Router DOM
- Supabase Authentication
- Material-UI (MUI)
- TailwindCSS
- ESLint & Prettier

## Project Structure

```
client-app/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/         # Page components
│   ├── services/      # API services
│   ├── lib/           # Utility functions
│   ├── types/         # TypeScript types
│   ├── App.jsx        # Main application component
│   └── main.jsx       # Application entry point
├── public/            # Static assets
└── package.json       # Project dependencies
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

This project is private and confidential.
