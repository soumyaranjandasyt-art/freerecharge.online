@echo off
REM Batch script to push code to GitHub
REM Replace the variables below with your information

set GITHUB_USERNAME=YOUR_USERNAME
set GITHUB_TOKEN=YOUR_PERSONAL_ACCESS_TOKEN
set REPO_NAME=YOUR_REPO_NAME

echo Initializing Git repository...
git init

echo Adding all files...
git add .

echo Creating commit...
git commit -m "Initial commit: Mobile recharge website"

echo Adding remote repository...
git remote add origin https://%GITHUB_USERNAME%:%GITHUB_TOKEN%@github.com/%GITHUB_USERNAME%/%REPO_NAME%.git

echo Setting main branch...
git branch -M main

echo Pushing to GitHub...
git push -u origin main

echo Done! Code pushed to GitHub successfully!
pause


