
---

## ⚙️ Tech Stack

* **Next.js 15** – For building the React fullstack app with server components
* **Prisma** – For database ORM and relations
* **PostgreSQL** – As the relational database
* **TailwindCSS** – For styling with utility-first CSS
* **React Hooks** – For managing client-side state & interactivity
* **TypeScript** – Type safety and tooling
* **NextAuth** or custom session handling – For user authentication (depending on your implementation)

---

## ⚡️ Features

* 📝 **Post Job Offers**
  Authenticated users can post new job offers with title, description, type, and location.

* 🔍 **Advanced Search**
  Filter jobs by **keyword**, **type** (Full-time, Part-time, Contract), and **location** — all with Prisma query filters.

* 👤 **User Dashboard**
  Users can view their posted jobs and see how many applicants each job has received.

* ✅ **Job Applications**
  Users can apply for any job. The dashboard lists all applications with statuses.

* 🔄 **Dynamic Routes & Pages**
  Each job has its own dynamic detail page with full information and "Apply" button.

* 🔐 **Authentication & Authorization**
  Users must be signed in to post jobs or apply for them.

---

## 👌 Quick Start

### Prerequisites

* [Node.js](https://nodejs.org/)
* [PostgreSQL Database](https://www.postgresql.org/)
* [Prisma CLI](https://www.prisma.io/docs/getting-started)
* [Next.js](https://nextjs.org/)

### Clone and Run

```bash
git clone https://github.com/yourusername/job-board-next-prisma.git
cd job-board-next-prisma
npm install

# Configure your database in .env
npx prisma generate
npx prisma migrate dev

npm run dev
```

Your app will be available at: [http://localhost:3000](http://localhost:3000)

---

## 🖼️ Screenshots
<img width="1347" alt="Home" src="https://github.com/user-attachments/assets/dcde382d-f842-4493-af5e-0b956cb89b46" />
<img width="1243" alt="Dashboard" src="https://github.com/user-attachments/assets/29da6fbc-6b8c-4475-88ad-a9b700461401" />

---

## ☁️ Deployment

### Deploy on Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/)
3. Import your repository
4. Set up your database connection in Vercel Environment Variables
5. Click **Deploy**

Your live app will be hosted on a custom subdomain (e.g. `https://your-job-board.vercel.app`)

---

## 🔗 Useful Links

* [Next.js Documentation](https://nextjs.org/docs)
* [PostgreSQL Docs](https://www.postgresql.org/docs/)
* [Tailwind CSS Docs](https://tailwindcss.com/)

---
