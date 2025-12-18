🛡️ Cybersecurity Portfolio (HubSpot CMS)

Student Name: ElSayed Elkholy
Project Type: Option A: Build a Landing Page/Website Template
Tech Stack: HubSpot CMS, HubL, HTML5, Tailwind CSS, JavaScript

📖 Project Overview

This project converts a static HTML cybersecurity portfolio into a fully dynamic, editable HubSpot CMS Template.

The goal was to demonstrate technical execution by breaking down a hardcoded design into reusable Custom Modules using HubSpot's Design Manager and HubL (HubSpot Markup Language).

🚀 Live Demo

[INSERT YOUR HUBSPOT LIVE PAGE URL HERE]

🛠️ Technical Implementation

1. Custom Modules (Drag-and-Drop)

I created 5 Custom Modules to ensure 100% editability without touching code:

Hero Section: Fully editable headline, bio, and typing animation text.

Toolkit Section: Uses a Repeater Group to add/remove unlimited security tools and icons.

Projects Section: A dynamic grid using Repeater Groups where I can add Case Studies, Modal popups, and Tags dynamically.

Experience Section: Timeline and Certification badges managed via repeating fields.

Contact Section: Editable contact info and social links.

2. Assets & Performance

Tailwind CSS: Integrated via CDN for responsive styling.

Custom CSS/JS: Separated into custom-style.css and custom-script.js and linked via HubL require_css / require_js for optimized loading.

Smooth Scroll: Implemented strictly via CSS and JS for a "Single Page App" feel.

📂 File Structure

original_design.html - The initial static HTML prototype.

custom-style.css - Global styling including the "Scanner/Terminal" effects.

custom-script.js - Logic for the Typing Animation, Live Clock, and Particle Background.

💡 How to Edit (CMS Standards)

Navigate to Marketing > Landing Pages in HubSpot.

Edit the "My Portfolio" page.

Click on any module on the left sidebar.

Update text, images, or add new items to the Repeaters.

Changes reflect instantly on the page.

Built for the Final Project E-Commerce Assessment.
