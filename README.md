# 📋 Paste Scraper

A full-stack web application that scrapes paste websites via Tor, stores data in MongoDB, and provides a comprehensive GUI for data analysis and manipulation.

> **Project Context**: Developed as part of a bootcamp hackathon in collaboration with cybersecurity company [IntSights Rapid7](https://www.intsights.com/).

## 👁️ Overview

This project combines web scraping, cybersecurity research, and full-stack development. It connects through the Tor network to safely scrape paste websites, processes the collected data, stores it in MongoDB, and provides an interactive React-based interface for analysis.

## ✨ Features

- **Tor Integration**: Securely connects to Tor network for anonymous scraping
- **Web Scraping**: Automated data collection from paste websites
- **Data Storage**: MongoDB database for persistent data management
- **REST API**: Express-based backend API for data operations
- **Interactive UI**: React frontend with real-time data visualization
- **Docker Support**: Containerized deployment with Docker Compose
- **Data Manipulation**: Tools for filtering, searching, and analyzing scraped content

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (React)                       │
│                    Port 3000 | TypeScript                   │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────┴────────────────────────────────────┐
│                       Backend API                           │
│              Port 4000 | Express | TypeScript               │
├──────────────────────────────────────────────────────────────┤
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │   Scraper    │    │  Data Models │    │  API Routes  │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
   ┌────▼────┐      ┌────▼────┐      ┌───▼─────┐
   │  MongoDB │      │   Tor   │      │ Express │
   │ Port 27018     │ Port 9050│      │ Handler │
   └──────────┘      └─────────┘      └─────────┘
```

## 📦 Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) (for containerized setup)
- [Tor Browser](https://www.torproject.org/) or Tor daemon (for Tor functionality)

## 🚀 Installation

### Clone the Repository

```bash
git clone https://github.com/leopariente/intsights-project.git
cd intsights-project
```

### Option 1: Local Development Setup

**Backend Setup**

```bash
cd backend
npm ci
```

**Frontend Setup**

```bash
cd ../frontend
npm ci
```

### Option 2: Docker Setup (Recommended)

```bash
docker-compose up --build
```

This will automatically set up:
- **MongoDB** (Port 27017, accessible at 27018)
- **Mongo Express** (Web UI at http://localhost:8081)
- **Tor Proxy** (Ports 8118, 9050)
- **Backend API** (http://localhost:4000)
- **Frontend** (http://localhost:3000)

**Mongo Express Credentials:**
- Username: `admin`
- Password: `admin`

## ⚡ Quick Start

### Development Mode

**Terminal 1 - Backend:**

```bash
cd backend
npm start        # or 'npm run dev' for development with auto-reload
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm start
```

The frontend will open at `http://localhost:3000` and the backend API runs on `http://localhost:4000`.

### Production Build

**Backend:**

```bash
cd backend
npm run deploy
```

**Frontend:**

```bash
cd frontend
npm run build
```

## 🔧 Technology Stack

### Frontend

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.2.0 | UI framework |
| TypeScript | 4.8.3 | Type-safe JavaScript |
| Sass | 1.54.9 | Styling |
| Axios | 0.27.2 | HTTP client |

### Backend

| Technology | Version | Purpose |
|-----------|---------|---------|
| Express.js | Latest | Web framework |
| TypeScript | 4.7.4 | Type-safe JavaScript |
| MongoDB | Latest | NoSQL database |
| Axios | 0.27.2 | HTTP client |
| Node-Cron | 3.0.4+ | Scheduled tasks |
| bcryptjs | 2.4.3 | Password hashing |
| Jest | 28.1.3 | Testing framework |

### Infrastructure

| Tool | Purpose |
|------|---------|
| Docker | Containerization |
| Docker Compose | Multi-container orchestration |
| Tor | Anonymous network access |
| Gulp | Task runner |
| Webpack | Module bundler |
| Nodemon | Development server auto-reload |

## 👨‍💻 Development

### Available Scripts

**Backend:**

```bash
npm start              # Production mode
npm run dev           # Development with auto-reload
npm run lint          # Run ESLint
npm run lint-fix      # Fix linting issues
npm run jest          # Run unit tests
npm run deploy        # Production deployment
```

**Frontend:**

```bash
npm start             # Development server
npm run build         # Production build
npm test              # Run tests
npm run eject         # Eject from Create React App (irreversible)
```

### Testing

**Backend Tests:**

```bash
cd backend
npm run jest
```

## 🐳 Docker

### Build Images

```bash
docker-compose build
```

### Run Containers

```bash
docker-compose up
```

### View Logs

```bash
docker-compose logs -f [service-name]
```

### Stop Containers

```bash
docker-compose down
```

## 📄 License

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

**Created for IntSights Rapid7 Hackathon** | Built with ❤️ during bootcamp
