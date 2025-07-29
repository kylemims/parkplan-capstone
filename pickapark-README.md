
This is a React + Vite national park trip planning app with a **hybrid data approach**:
- **Local JSON-server** (`database.json`) for user trips, static park data, and trip items
- **External APIs**: National Park Service API for activities/campgrounds, Open-Meteo API for weather data
- **Service-oriented architecture** with all data access abstracted in `src/services/`

## Critical Development Workflow
```bash
# Start the local database (REQUIRED for app to function)
npx json-server --watch database.json --port 8088

# Start dev server
npm run dev
```
**Note**: The app will break without the json-server running - it's not just a development convenience.

## Service Layer Patterns
All data access goes through service modules. **Never** write direct fetch calls in components:

### Local Data Services (database.json)
- `tripService.js`: User trips with park relationships via `_expand=park`
- `parkService.js`: Static park data, images, and local park lookup
- `itineraryService.js`: Trip items (activities/campgrounds added to trips)

### External API Services  
- `npsService.js`: National Park Service activities via `thingstodo` endpoint
- `weatherService.js`: Open-Meteo daily weather aggregated to monthly averages
- **API Keys**: Required in `.env` as `VITE_NPS_API_KEY` and `VITE_NPS_API_BASE`

## Key Component Patterns

### Data Flow: User Preferences → Park Matching
1. `PreferencesForm` collects season/weather/interests → localStorage + navigate to results
2. `ParkResults` filters local parks against preferences with **flexible scoring** (1+ criteria match)
3. Users select parks → create trips → add activities from NPS API

### Trip Management Lifecycle
```
TripDashboard → CreateNewTripForm → TripDetails (add activities) → TripSummary
```
- **TripDetails**: Fetches NPS activities, allows filtering/sorting, adds to itinerary
- **Activity Integration**: NPS API data transformed to local `tripItems` format
- **State Management**: localStorage for auth (`parkplan_user`), preferences, React state for UI

### Navigation Architecture
- **Desktop**: `NavBar` with slide-out drawer for professional links (portfolio, GitHub, etc.)
- **Mobile**: `BottomTabNav` with profile dropdown showing developer info
- **Layout**: Fixed nav containers with `.main-content` as scrollable flex-grow area

## Data Transformation Patterns

### Weather Service Integration
```javascript
// Daily weather data → monthly averages with fallback handling
getMonthlyWeatherAverages(lat, lon) // Open-Meteo API
```

### NPS Activity Processing
```javascript
// Raw NPS data → standardized trip items
const tripItem = {
  tripId: parseInt(tripId),
  type: "activity", 
  title: activity.title,
  activityData: { location, fees, reservationRequired, petFriendly }
}
```

## Component Communication Patterns
- **Route Parameters**: `/trips/:tripId/details/:parkCode` for context passing
- **React Router State**: Preferences passed via `navigate("/parks/results", { state: { preferences } })`
- **localStorage**: User auth and trip preferences persistence
- **Props**: Form components take `onSuccess` callbacks for modal workflows

## Styling System
- **CSS Custom Properties**: `--color-accent: #ffe28a`, `--color-primary: #c29059`, etc.
- **Component-scoped CSS**: Each component has its own `.css` file
- **Responsive Strategy**: CSS Grid layouts with mobile-first approach
- **Mobile Navigation**: Bottom tabs with sticky positioning and proper padding for content

## Common Debugging Points
- **Missing json-server**: App will show network errors on all local data
- **API Rate Limits**: NPS API has usage limits; implement loading states
- **Weather API Coordinates**: Ensure park data has valid lat/lng for weather integration
- **Authentication**: Check `localStorage.getItem("parkplan_user")` for auth state

## Development Conventions
- **No TypeScript**: Pure JavaScript/JSX throughout
- **Service Pattern**: Always use service modules, never inline fetch calls
- **Component Structure**: Feature-based folders under `/components/`
- **Error Handling**: Graceful degradation for external API failures
- **Loading States**: Always provide loading feedback for async operations

---------------------------------
# Extra overview information to ensure you have as much context as possible when creating the final READ.md file!


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

## 3. Folder/File Tree
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
│   ├── variables.css 
│   ├── components/
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   └── Login.css
│   │   │   └── Register.jsx
│   │   ├── forms/
│   │   │   ├── CreateNewTripForm.jsx
│   │   │   ├── FormInput.jsx
│   │   │   ├── HoverReveal.jsx
│   │   │   ├── NewTripButtonModal.jsx
│   │   │   ├── TripEditForm.jsx
│   │   │   ├── NewTripModal.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── Form.css
│   │   │   └── Modal.css
│   │   ├── nav/
│   │   │   ├── NavBar.jsx
│   │   │   ├── BottomTabNav.jsx
│   │   │   ├── BottomTabNav.css
│   │   │   └── NavBar.css
│   │   ├── onboarding/
│   │   │   ├── PreferencesForm.jsx
│   │   │   └── PreferencesForm.css
│   │   ├── parks/
│   │   │   ├── ParkDetails.jsx
│   │   │   ├── ParkDetails.css
│   │   │   ├── ImageCarousel.jsx
│   │   │   ├── ParkResults.jsx
│   │   │   ├── ParkResults.css
│   │   │   ├── HomePage.jsx
│   │   │   ├── HomePage.css
│   │   │   ├── CampgroundSelector.jsx
│   │   │   ├── CampgroundSelector.css
│   │   │   └── (other park-related components)
│   │   ├── trips/
│   │   │   ├── TripDashboard.jsx
│   │   │   ├── TripCard.jsx
│   │   │   ├── TripDetails.jsx
│   │   │   ├── TripSummary.jsx
│   │   │   ├── TripSummary.css
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
│   │   ├── variables.css ≈
│   │   ├── utilities.css ≈
│   │   └── components.css ≈
│   └── views/
│       └── ApplicationViews.jsx
├── .github/
│   └── copilot-instructions.md
└── (other config/scripts as needed)
```


## 4. Project Conventions
- All data access is abstracted in `src/services/`.
- Components are organized by feature in `src/components/`.
- Static assets (images, videos) are in `public/`.
- Design system and utility CSS in `src/styles-system/`.
- Formatting enforced with Prettier (JS/JSX/CSS/HTML)`.
- No TypeScript; all code is JavaScript/JSX.

## 5. Unused or Irrelevant Files (as of July 2025)
- `spring-weather-data.json`: Empty, can be removed if not needed.
- `my-templates/`: Ignored by git, likely personal/legacy.
- `setup-auth.sh`: Remove if not used for auth setup.
- Unused service/component files: Remove if not imported anywhere.

## 6. Documentation & Onboarding
- See `README.md` for dev workflows and database launch command.
- See `.github/copilot-instructions.md` for AI agent guidance.

---
_Last updated: July 23, 2025_
