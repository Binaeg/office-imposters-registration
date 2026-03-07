# Copilot Instructions – Office Imposter Website

This repository contains the landing page for the game **Office Imposter**.

Copilot should follow the rules and architecture described in this document when generating code.

---

# Project Overview

Office Imposter is a social deduction game set in a modern office environment.

This repository contains a **landing page where users can sign up for early access**.

The site is a **German one-page website** built with modern web technologies.

---

# Tech Stack

Always prefer these technologies when generating code.

Framework:
- Next.js
- App Router

Language:
- TypeScript

Styling:
- TailwindCSS

Backend:
- Supabase (database)

Email:
- Nodemailer (for confirmation emails)

Architecture:
- Component-based
- Clean folder structure
- Reusable UI components

---

# Project Structure

Use the following structure when creating new files.
/app
layout.tsx
page.tsx

/components
Hero.tsx
VideoSection.tsx
SignupForm.tsx
FAQ.tsx
Container.tsx

/lib
supabase.ts
mailer.ts

/app/api/signup
route.ts


Do not place business logic inside UI components.

Database and email logic should be inside `/lib`.

---

# Website Structure

The website is a **single-page landing page** with the following sections.

1. Hero Section
2. Video Section (placeholder)
3. Signup Form
4. FAQ

All sections should be implemented as reusable components.

---

# Hero Section

Contains:

- Title: "Office Imposter"
- Short teaser text
- Call to action button: "Jetzt anmelden"
- Button scrolls to signup form

Tone:
- playful
- game-like
- simple German wording

---

# Video Section

Contains:

- Responsive 16:9 video container
- Placeholder message:

"Gameplay Video folgt bald"

The video will be embedded later.

---

# Signup Form

Fields:

- Name (text)
- Email (email)
- Anzahl Personen (select 1–5)
- Werbemails erhalten (checkbox)

Submit button text:

"Jetzt anmelden"

On submit:

- Send POST request to `/api/signup`

---

# Supabase Database

Use Supabase for storing signups.

Table name:

`signups`

Columns:
id (uuid primary key)
name (text)
email (text)
people_count (integer)
marketing_opt_in (boolean)
created_at (timestamp)


All inserts should be done through the API route.

---

# API Route

File:
/app/api/signup/route.ts

Responsibilities:

1. Validate request data
2. Insert signup into Supabase
3. Send confirmation email

---

# Email Confirmation

Use Nodemailer.

Create helper:
/lib/mailer.ts


Email content example:

Subject:
Willkommen bei Office Imposter

Body:

Danke für deine Anmeldung!

Wir informieren dich, sobald Office Imposter spielbar ist.

---

# Supabase Client

Create helper:
/lib/supabase.ts

Use environment variables:
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY


Never hardcode credentials.

---

# UI Style

The UI should look **playful and cartoonish**, similar to party game landing pages.

Design rules:

- Rounded elements
- Bold typography
- Strong contrast
- Large buttons
- Soft shadows

---

# Color Palette

Use colors similar to the following palette.

Primary colors:
#233D4D


Accent colors:
#FFCC00
#806600


Guidelines:

- Dark blue backgrounds
- Yellow accent buttons
- High contrast text

---

# Button Style

Prefer buttons similar to:
Prefer buttons similar to:


bg-primary
text-black
font-bold
rounded-xl
px-6
py-3
shadow-lg
hover:scale-105
transition


---

# Responsiveness

The site must:

- work on mobile first
- scale to desktop
- keep readable typography
- maintain proper spacing

---

# Accessibility

Always include:

- form labels
- button text
- semantic HTML
- alt text for images

---

# Coding Style

Prefer:

- small reusable components
- descriptive variable names
- simple logic
- clear comments explaining sections

Avoid:

- large monolithic components
- inline business logic
- duplicated styles

---

# Language

The UI text should be written in **German**.

Example tone:

Short, clear, playful.
