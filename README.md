# ASE Roleplay Network — Three-App Launcher

This project contains the original three-card ASE Roleplay launcher design, configured to open the official roleplay websites:

- ASE RP: https://ase17.onrender.com
- Police RP: https://police4.onrender.com/
- Border Patrol RP: https://patrol4.onrender.com

## Deploy using GitHub + Render (Web Service)

1. Extract the ZIP download.
2. Create a new GitHub repository (such as `ase-rp-launcher`).
3. In GitHub select **Add file > Upload files**, select **all the extracted files and the `public` folder** (NOT the ZIP), and commit. `package.json`, `server.js` and `render.yaml` must be in the repository root.
4. In Render, select **New > Web Service**, connect the GitHub repository, and use:
   - Language/Runtime: **Node**
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Root Directory: leave blank
   - Free plan if available
5. Deploy to get your launcher `onrender.com` website.

The included `render.yaml` also defines a Web Service for Render Blueprint deployments if you prefer that approach.

## Run locally

Node.js 18 or newer required:

```sh
npm start
```

Visit http://localhost:3000

## Change your links or button descriptions

Edit `role-config.json` and redeploy. The original links are also included as fallbacks in `public/index.html`, so the buttons work even if the config fetch fails.

This project is ONLY the launcher. It links to the existing game websites; it does not replace or modify them. No extra dependencies or secret keys are needed.
