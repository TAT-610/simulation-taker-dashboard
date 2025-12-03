# Simulation Management App

This project is built with **Next.js + TypeScript + TailwindCSS + shadcn/ui**.
Currently, it uses **mock data** for simulations and skills.

---

## 1. Clone the repository

```bash
git clone [your_repository_link]
cd [your_project_folder]
```

---

## 2. Install dependencies (Required)

You must install dependencies before running the project:

```bash
npm install
```

Or use another package manager if you prefer:

```bash
yarn install
# or
pnpm install
# or
bun install
```

---

## 3. Run the project

After installing packages, start the development server:

```bash
npm run dev
```

Open your browser and go to:

```
http://localhost:3000
```

---

## 4. If you get dependency errors

Try one of these commands:

```bash
npm install --legacy-peer-deps
```

or

```bash
npm install --force
```

Then run again:

```bash
npm run dev
```

---

## 5. Mock data location

Mock data for simulations & skills is located in:

```
src/
  services/
    mock-data/
      simulation.ts
      skill.ts
```

---

## 6. (Optional) Run unit tests

Install testing libraries:

```bash
npm install -D jest @testing-library/react @testing-library/jest-dom
```

Run tests:

```bash
npm run test
```

---

✅ **That’s all – only 3 required steps:**

1. `git clone`
2. `npm install`
3. `npm run dev`
