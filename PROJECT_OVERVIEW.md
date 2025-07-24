# Project Overview: parkplan-capstone

## 1. Project Purpose
A React + Vite application for national park trip planning, featuring modular, reusable components, state management, and integration with a local json-server database.

## 2. Key Features
- Modular React components (auth, forms, nav, parks, templates, trips)
- Data access via service modules in `src/services/`
- Responsive layouts using CSS Grid
- Reusable modal and icon button components
- Local API/data via `json-server` and `database.json`
- Static assets in `public/images/`
- Design system CSS in `src/styles-system/`
- Prettier for JS/JSX/CSS/HTML formatting, Black for Python
- No TypeScript

##  Folder/File Tree
```
parkplan-capstone/
├── README.md
├── database.json
├── package.json
├── vite.config.js
├── public/
│   ├── images/
│   │   ├── (various park and icon images, e.g. acadia-1.jpg, add-icon.svg, etc.)
│   └── videos/
│       └── bg-video-2.mp4
├── src/
│   ├── index.css
│   ├── main.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── variables.css
│   ├── components/
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   └── Login.css
│   │   ├── forms/
│   │   │   ├── CreateNewTripForm.jsx
│   │   │   ├── TripEditForm.jsx
│   │   │   ├── NewTripModal.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── Form.css
│   │   ├── nav/
│   │   │   ├── NavBar.jsx
│   │   │   └── NavBar.css
│   │   ├── parks/
│   │   │   ├── ParkDetails.jsx
│   │   │   ├── ParkDetails.css
│   │   │   ├── HomePage.jsx
│   │   │   ├── HomePage.css
│   │   │   ├── CampgroundSelector.jsx
│   │   │   └── (other park-related components)
│   │   ├── trips/
│   │   │   ├── TripDashboard.jsx
│   │   │   ├── TripCard.jsx
│   │   │   ├── TripDetails.jsx
│   │   │   ├── TripList.css
│   │   │   ├── InfoIconHover.jsx
│   │   │   └── (other trip-related components)
│   │   ├── templates/
│   │   │   └── IconTooltipButton.jsx
│   │   └── (other feature folders)
│   ├── services/
│   │   ├── npsService.js
│   │   ├── parkService.js
│   │   ├── tripService.js
│   │   └── userService.js
│   ├── styles-system/
│   │   ├── variables.css
│   │   ├── utilities.css
│   │   └── components.css
│   └── views/
│       └── ApplicationViews.jsx
├── .github/
│   └── copilot-instructions.md
└── (other config/scripts as needed)
```

## 3. Folder/File Structure
```
backup.css
.database.json
ERD.dbml
eslint.config.js
index.html
my-templates/
package.json
plan-icon.ai
README.md
setup-auth.sh
spring-weather-data.json
vite.config.js
public/
  vite.svg
  images/
    ...park and icon images...
  videos/
    bg-video-2.mp4
src/
  App.css
  App.jsx
  index.css
  main.jsx
  variables.css
  assets/
    react.svg
    yosemite_bg.jpg
  components/
    auth/
    forms/
    nav/
    parks/
    templates/
    trips/
  services/
    npsService.js
    parkService.js
    tripService.js
    userService.js
  styles-system/
    components.css
    utilities.css
    variables.css
  views/
    ApplicationViews.jsx
    ...
```

## 4. Project Conventions
- All data access is abstracted in `src/services/`.
- Components are organized by feature in `src/components/`.
- Static assets (images, videos) are in `public/`.
- Design system and utility CSS in `src/styles-system/`.
- Formatting enforced with Prettier (JS/JSX/CSS/HTML) and Black (Python).
- No TypeScript; all code is JavaScript/JSX.

## 5. Unused or Irrelevant Files (as of July 2025)
- `spring-weather-data.json`: Empty, can be removed if not needed.
- `backup.css`: If not referenced, can be deleted.
- `.ai` files: Archive or remove if not editing vector assets.
- `my-templates/`: Ignored by git, likely personal/legacy.
- `setup-auth.sh`: Remove if not used for auth setup.
- `ERD.dbml`: For documentation only unless updating schema.
- Unused images in `public/images/`: Remove if not referenced.
- Unused service/component files: Remove if not imported anywhere.

## 6. Documentation & Onboarding
- See `README.md` for dev workflows and database launch command.
- See `.github/copilot-instructions.md` for AI agent guidance.

---
_Last updated: July 23, 2025_
