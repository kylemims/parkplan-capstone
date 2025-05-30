import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getThingsToDoByParkCode } from "../../services/npsService.js";
// import { InfoIconHover } from "./InfoIconHover.jsx";
// import "./TripList.css";
import { HoverReveal } from "../forms/HoverReveal.jsx";
// import { Lightbox } from "../trips/Lightbox.jsx";
import "./TripDetails.css";
// import { Lightbox } from "./Lightbox.jsx";
// import "./InfoIconHover.css";

export const TripDetails = () => {
  const { parkCode } = useParams();
  const [thingsToDo, setThingsToDo] = useState([]);
  const [itinerary, setItinerary] = useState([]);

  const addToItinerary = (item) => {
    // Avoid adding duplicates
    if (!itinerary.some((i) => i.id === item.id)) {
      setItinerary([...itinerary, item]);
    }
  };

  useEffect(() => {
    getThingsToDoByParkCode(parkCode)
      .then((data) => {
        setThingsToDo(data.data); // assumes you use `const [thingsToDo, setThingsToDo] = useState([])`
      })
      .catch((err) => console.error("Failed to load activities", err));
  }, [parkCode]);

  return (
    <section className="things-to-do-section">
      <h2>Things To Do</h2>
      <ul className="todo-list">
        {thingsToDo.map((item) => (
          <li key={item.id} className="todo-card">
            <h3 className="todo-title">{item.title}</h3>
            <div
              className="todo-description"
              dangerouslySetInnerHTML={{ __html: item.shortDescription }}></div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <button onClick={() => addToItinerary(item)} className="add-to-itinerary-btn">
                Add to Trip
              </button>
              <HoverReveal
                revealContent={
                  <div className="hover-reveal__content">
                    <h4 className="hover-title">{item.title}</h4>
                    {item.duration && (
                      <p>
                        <strong>Duration:</strong> {item.duration} hr(s)
                      </p>
                    )}
                    {item.durationDescription && (
                      <p>
                        <strong>Description:</strong> {item.durationDescription}
                      </p>
                    )}
                  </div>
                }>
                <button className="icon-button">
                  <img src="/images/timer-icon.svg" alt="Time" className="hiker-icon" />
                </button>
              </HoverReveal>
            </div>
          </li>
        ))}
      </ul>
      <section className="itinerary-review">
        <h2>Your Trip Itinerary</h2>

        {itinerary.length === 0 ? (
          <p>No activities added yet.</p>
        ) : (
          <>
            <ul>
              {itinerary.map((item) => (
                <li key={item.id}>
                  <strong>{item.title}</strong> – {item.duration || "N/A"} hr(s)
                </li>
              ))}
            </ul>

            {/* Removed total duration for simplicity */}
          </>
        )}
      </section>
    </section>
  );
};

// return (
//     <section className="things-to-do-section">
//       <h2>Things To Do</h2>
//       <ul className="todo-list">
//         {thingsToDo.map((item) => (
//           <li key={item.id} className="todo-card">
//             <h3 className="todo-title">{item.title}</h3>
//             {item.duration && (
//               <p className="todo-duration">
//                 <strong>Est. Time:</strong> {item.duration} hr(s)
//               </p>
//             )}

//             {item.durationDescription && (
//               <div
//                 className="todo-duration-desc"
//                 dangerouslySetInnerHTML={{ __html: item.durationDescription }}></div>
//             )}

//             <div
//               className="todo-description"
//               dangerouslySetInnerHTML={{ __html: item.shortDescription }}></div>
//             <button onClick={() => addToItinerary(item)} className="add-to-itinerary-btn">
//               Add to Trip
//             </button>

//           </li>
//         ))}
//       </ul>
//       <section className="itinerary-review">
//         <h2>Your Trip Itinerary</h2>

//         {itinerary.length === 0 ? (
//           <p>No activities added yet.</p>
//         ) : (
//           <>
//             <ul>
//               {itinerary.map((item) => (
//                 <li key={item.id}>
//                   <strong>{item.title}</strong> – {item.duration || "N/A"} hr(s)
//                 </li>
//               ))}
//             </ul>

//           </>
//         )}
//       </section>
//     </section>
//   );
// };
