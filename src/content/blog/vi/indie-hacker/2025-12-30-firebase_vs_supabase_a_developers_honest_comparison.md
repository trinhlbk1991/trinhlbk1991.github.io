---
title: "Firebase vs. Supabase: A Developer’s Honest Comparison"
date: 2025-12-30
categories: ["indie-hacker",]
tags: ["Indie Hacker", "Firebase", "Supabase"]
summary: "Honest take of a mobile developer on which you should choose: Firebase or Supabase"
toc: true
comments: true
image: "/assets/images/indie-hacker/firebase_supabase.jpeg"
---

If you’re a mobile developer like me (Android, iOS, Flutter 🙋‍♂️), you know the drill: 
1. You have a killer app idea. 
2. You open your IDE. 
3. And then you hit the wall: **The Backend.**

And the simpliest solution for this is: **"Just use Firebase."** It’s Google’s magic box. You throw JSON at it, and it syncs to everyone’s phone instantly.

But lately, there’s a new challenger on the block: **Supabase**. It calls itself the "Open Source Firebase Alternative," and it’s built on top of the mighty PostgreSQL.

So, for my next app (maybe a major update for [Buckist](https://buckist.app)?), which one am I picking? Let’s break down the **Firebase vs. Supabase** battle, just based on my personal needs and experience.

<img src="/assets/images/indie-hacker/firebase_supabase.jpeg"  alt="Who's gonna win my choice? Firebase or Supabase?"/>

## 1. The Database: Firestore (NoSQL) vs. PostgreSQL (SQL)
This is the biggest difference, and it changes how you code entirely.

**Firebase (Firestore)** is a NoSQL document store. Think of it like a giant, messy folder of JSON files.
*   **The Good:** It is incredibly fast to set up. You don't need to plan your schema.
*   **The Bad:** Querying is limited. Want to filter data by *"Users who bought shoes AND live in Vietnam AND signed up last week"*? Good luck! Also the supported queries are very limited.

**Supabase** is just **PostgreSQL** with a nice UI.
*   **The Good:** It’s standard SQL. You can use `JOINS`, foreign keys, and complex filters. If your app has related data (like *myMoney* has Categories -> Transactions), SQL keeps your data sane.
*   **The Bad:** You actually have to design your database schema upfront. Honestly I just put this to compare with Firestore, design database schema first is crucial skill, you should master it anyway.

**Verdict:** If you need relational data, Supabase wins. If you need unstructured logs, Firebase wins. I faced many problems with Firestore and querying data, so I'll pick Supabase.

## 2. Pricing: The "3AM Billing Anxiety"
This is the main reason I'm going to migrate from Firebase to Supabase.

**Firebase** charges based on **Reads and Writes**.
If you write a bad loop in your code that accidentally reads your database 10,000 times a second, you will wake up to a massive bill. It’s a pay-per-use model that punishes inefficient code.
Personal experience: I have to cache database on the client side and limit user interval requests to avoid exceed calls to Firestore - this cause bad experience to users to be honest.

**Supabase** charges based on **Storage Size**.
They generally don't care how many times you read the data. If your database fits in 500MB, the price is predictable, whether you have 10 users or 10,000 users.

<img src="/assets/images/indie-hacker/firebase_bill.jpeg"  alt="I do my best just to minimize number of calls to Firestore."/>

**Verdict:** I hate to sacrify user experience to save money. Supabase to go.

## 3. Realtime Capabilities: Magic vs. Sockets
If you are building a chat app, a live score tracker, or a multiplayer game, **Firebase** is still the king.
*   **Firebase:** Realtime is in its DNA. Data updates on the client side in milliseconds with zero configuration.
*   **Supabase:** Uses PostgreSQL's replication log to send updates via WebSockets. It works well, but you have to manually "subscribe" to tables. It feels slightly more "manual" than Firebase’s magic.

**Verdict:** This should be a tie. Choose based on your need.

## 4. Vendor Lock-In: Open Source vs. Google
*   **Firebase:** It is proprietary. You are locked into the Google Cloud ecosystem. If Google shuts down a feature (which, let’s be honest, [Google does often](https://killedbygoogle.com)), you are stuck.
*   **Supabase:** It is **Open Source**. You can self-host Supabase on your own server (DigitalOcean, AWS, or a Raspberry Pi) using Docker. You own your data.

## Final Verdict: Which Backend Should You Choose in 2025?

After building apps with both, here is my rule of thumb:

**Stick with Firebase if:**
*   You are building an MVP or a simple prototype this weekend.
*   You need the absolute best offline support for mobile apps.
*   You heavily rely on Google Analytics and Crashlytics.

**Switch to Supabase if:**
*   Your app relies on **relational data** (e.g., Customers, Orders, Inventory).
*   You are worried about unpredictable billing spikes.
*   You want the power of **SQL** to run complex queries without hacking your code.

## What I’m Using
For my simple tools, I still love Firebase. But for my more complex personal finance apps like **myMoney**, I’m finding myself reaching for Supabase. The peace of mind of having a structured SQL database—and a predictable bill—is worth the switch.

What about you? Let me know in the comments!
