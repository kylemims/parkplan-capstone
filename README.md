---

### ✅ **Pick A Park: `README.md`**

```markdown
# 🏕️ Pick A Park

A national park trip planner built with React, Vite, and a hybrid data model. Designed for travelers, nature lovers, and hiring managers who want to experience a smart, responsive UI.

This app walks the line between front-end elegance and back-end logic — all in one easy-to-use package.

---

## 🌲 App Highlights

- **Smart Park Matching**: Users select their ideal season, weather, and activities — the app recommends matching parks based on shared preferences
- **Create + Manage Trips**: Users can build and revisit multi-day trip plans
- **Add Activities**: Pulls real-time activities and campground data from the National Park Service API
- **Weather Integration**: Displays monthly weather averages using Open-Meteo API
- **Fully Responsive**: Mobile-first layout with bottom tab nav, swipeable carousels, and modals

> **✅ No account setup required — Just enter a name and email to get started. You can use any info you like — even “ilovekyle@example.com” — and you’re in.

> All data is stored in a remote JSON database so the app works out of the box.

---

## 🌐 Live Demo

- **Live App:** [pickapark.kylemims.com](https://pickapark.kylemims.com)
- **Code Repo:** [github.com/kylemims/pick-a-park](https://github.com/kylemims/pick-a-park)

---

## ⚙️ Tech Stack

- **Frontend:** React (Vite), JSX, modular CSS, localStorage
- **APIs:** National Park Service API (activities, campgrounds), Open-Meteo (weather)
- **Backend:** JSON Server hosted on [Render](https://render.com)
- **Routing:** React Router with nested routes
- **Architecture:** Service modules for all data access

---

## 🧭 Core User Flow

1. **Choose Your Preferences**
   - Season, weather, and lifestyle
2. **Get Park Recommendations**
   - Based on shared criteria
3. **Create a Trip**
   - Choose a park, name your trip, and add plans
4. **Explore Activities**
   - Pull from NPS API and save to your itinerary
5. **Summarize + Review**
   - Print or revisit your trip details anytime

---

## 🛠️ Developer Workflow

No setup required — the database is fully hosted and ready to go.

> If running locally:

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Optional: If editing backend
npx json-server --watch database.json --port 8088


📁 Project Structure
	•	src/components/: Feature-based folders (parks, trips, forms, nav)
	•	src/services/: All fetch calls abstracted here
	•	src/styles-system/: CSS variables and utility classes
	•	database.json: Local version of park and trip data

⸻

👨‍🎨 Author

Built with intention by Kyle Mims
🧠 Nashville Software School · 2025
🎒 Inspired by real park trips and real frontend challenges

⸻

🌐 API Acknowledgements
	•	NPS API – Activities and campground data
	•	Open-Meteo – Monthly weather averages