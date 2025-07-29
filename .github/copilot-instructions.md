# AI Agent Instructions for parkplan-capstone

## Architecture Overview
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
