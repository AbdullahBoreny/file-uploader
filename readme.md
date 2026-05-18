# You can access the app here:

[File Uploader](https://file-uploader-mvdc.onrender.com/)
# 📁 File Uploader App

A simple full-stack file upload application deployed on Render with CI/CD automation from GitHub Actions.

---

## 🌐 Live Demo

 https://file-uploader-mvdc.onrender.com/

---

## 📊 Project Status

![Build](https://img.shields.io/badge/build-passing-brightgreen)
![Deployment](https://img.shields.io/badge/deployment-live-success)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## 📌 Overview

This project allows users to upload files through a web interface.  
It demonstrates a complete deployment pipeline using GitHub Actions and Render.

Key focus areas:
- Continuous Integration (CI)
- Automated deployment (CD)
- Basic file handling backend

---

## 🚀 Features

- Upload files via browser
- Simple and responsive UI
- Backend file processing
- Automatic deployment via GitHub Actions
- Skip deployment option using commit message (`#skip`)

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- HTML / CSS / JavaScript
- GitHub Actions (CI/CD)
- Render (Hosting)

---

## 🔄 CI/CD Pipeline

The workflow includes:

1. Install dependencies
2. Run linting (`eslint`)
3. Run tests (if configured)
4. Deploy to Render (on push to `main`)
5. Optional skip: commit message contains `#skip`

---

## 📦 Usage

1. Open the app:
   👉 https://file-uploader-mvdc.onrender.com/

2. Choose a file
3. Upload it
4. Receive confirmation

---

## ⚙️ Deployment

Deployment is handled automatically:

- Trigger: push to `main`
- GitHub Actions runs CI checks
- If successful → deployment hook triggers Render

---

## 🧪 Testing

If tests are configured:

```bash
npm test