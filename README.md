## YRfilms Studio – Full-Stack Application

This repository contains the **YRfilms** studio application:

- `client/`: React + TypeScript + Vite frontend (shadcn-ui + Tailwind CSS)
- `server/`: Node.js + Express + MongoDB backend

### Development

- **Server**
  - `cd server`
  - `npm install`
  - Create a `.env` file (see notes below)
  - `npm run dev`
- **Client**
  - `cd client`
  - `npm install`
  - Create a `.env` file with `VITE_API_URL=http://localhost:5000`
  - `npm run dev`

### Environment variables (server)

Create `server/.env` with at least:

- `MONGODB_URI=<your-mongodb-connection-string>`
- `JWT_SECRET=<strong-random-secret>`
- `CLOUDINARY_CLOUD_NAME=<cloudinary-cloud-name>`
- `CLOUDINARY_API_KEY=<cloudinary-api-key>`
- `CLOUDINARY_API_SECRET=<cloudinary-api-secret>`
- `FRONTEND_URL=http://localhost:5173` (or your deployed URL)

### Build & production

- From `client/`: `npm run build` to produce the production bundle.
- Deploy the frontend (e.g. to Vercel/Netlify) and backend (e.g. to a Node host) separately.
- Ensure `VITE_API_URL` on the client and `FRONTEND_URL` on the server are set to your production URLs.
