import { HoverReveal } from "../forms/HoverReveal.jsx";
import "./InfoIconHover.css";

export const InfoIconHover = ({ title, duration, durationDescription }) => (
  <HoverReveal
    revealContent={
      <div className="hover-reveal__content">
        <h4 style={{ color: "#ffe28a", margin: "0 0 0.5rem 0" }}>{title}</h4>
        {duration && (
          <p>
            <strong>Duration:</strong> {duration} hr(s)
          </p>
        )}
        {durationDescription && (
          <p>
            <strong>Description:</strong> {durationDescription}
          </p>
        )}
      </div>
    }>
    <button className="icon-button" tabIndex={0}>
      <img src="/images/time-icon.svg" alt="Info" className="hiker-icon" />
    </button>
  </HoverReveal>
);

// import { HoverReveal } from "../forms/HoverReveal.jsx";
// import { Lightbox } from "./Lightbox.jsx";
// import "./TripList.css";

// export const InfoIconHover = ({ title, duration, durationDescription }) => (
//   <HoverReveal
//     revealContent={
//       <Lightbox open={true} onClose={() => {}} title={title} label="Activity Details">
//         <div className="">
//           {duration && (
//             <p>
//               <strong>Duration:</strong> {duration} hr(s)
//             </p>
//           )}
//           {durationDescription && (
//             <p>
//               <strong>Duration Description:</strong> {durationDescription}
//             </p>
//           )}
//         </div>
//       </Lightbox>
//     }></HoverReveal>
// );
