# GitHub Setup Guide

## Step 1: Install Git (if not installed)
Download and install Git from: https://git-scm.com/download/win

## Step 2: Initialize Git Repository
Open PowerShell or Command Prompt in this folder and run:

```bash
git init
```

## Step 3: Add All Files
```bash
git add .
```

## Step 4: Create Initial Commit
```bash
git commit -m "Initial commit: Mobile recharge website"
```

## Step 5: Create GitHub Repository
1. Go to https://github.com/new
2. Create a new repository (e.g., "mobile-recharge")
3. **DO NOT** initialize with README, .gitignore, or license
4. Copy the repository URL (e.g., https://github.com/yourusername/mobile-recharge.git)

## Step 6: Add Remote and Push
Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name:

```bash
git remote add origin https://YOUR_USERNAME:YOUR_PERSONAL_ACCESS_TOKEN@github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Alternative: Using Personal Access Token in URL
If you prefer, you can use this format:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

When prompted for password, use your Personal Access Token instead of your GitHub password.

## Creating Personal Access Token
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name (e.g., "Mobile Recharge Project")
4. Select scopes: `repo` (full control of private repositories)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again)

## Quick Commands (All at once)
After installing Git and creating the GitHub repository:

```bash
git init
git add .
git commit -m "Initial commit: Mobile recharge website"
git remote add origin https://YOUR_USERNAME:YOUR_TOKEN@github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

Replace:
- `YOUR_USERNAME` with your GitHub username
- `YOUR_TOKEN` with your Personal Access Token
- `YOUR_REPO_NAME` with your repository name

