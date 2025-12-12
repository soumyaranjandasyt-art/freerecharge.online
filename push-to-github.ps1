# PowerShell script to push code to GitHub
# Replace the variables below with your information

$GITHUB_USERNAME = "YOUR_USERNAME"
$GITHUB_TOKEN = "YOUR_PERSONAL_ACCESS_TOKEN"
$REPO_NAME = "YOUR_REPO_NAME"

Write-Host "Initializing Git repository..." -ForegroundColor Green
git init

Write-Host "Adding all files..." -ForegroundColor Green
git add .

Write-Host "Creating commit..." -ForegroundColor Green
git commit -m "Initial commit: Mobile recharge website"

Write-Host "Adding remote repository..." -ForegroundColor Green
git remote add origin "https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"

Write-Host "Setting main branch..." -ForegroundColor Green
git branch -M main

Write-Host "Pushing to GitHub..." -ForegroundColor Green
git push -u origin main

Write-Host "Done! Code pushed to GitHub successfully!" -ForegroundColor Green



