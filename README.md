# Personal Assistant
---

The **Personal Assistant** is an API created to store and retrieve my daily life personal information such as, *Contacts, Projects, Calendar, To-do's and Notes* among others.

This project has been created with Docker to eliminate any possible incompatibility, with that said, if you want to try this project yourself you'll need a PostgreSQL instance running and ready to use (locally or remotely).

## Installation
---

1. Copy this repository.
2. Change the name *.env_example* file to *.env*.
3. Populate your new *.env* file with your own **environment variables**.
4. Run `yarn dev` or `docker-compose up` to build the image and initialize the project.

## Features
---

- **CRUD** across every DB model.
- 👦 Manage **users** & create isolated environments for each one of them.
- Store your 👥 **Contacts** and every aspect related with them (*Bank Accounts, Money Transfers, Vehicles, Addresses, Social Media, etc*)
- 📚️ **Inventory**: Store all the data related with the things you already have, so you can compare specs with similar products in your **Wishlist**, save the relevant documents, and find all the info you need in one place.
- 📓 **Projects**: Remember every aspect of your past, present and future projects, attach important **Project Resources** so you can have a clear idea about what's happening, even if you left an idea for later on.
- 🧠 **Tasks**: Unify your *Calendar, To-do's and Notes* apps in one place so you can make them interact with each other and create powerful reminders.