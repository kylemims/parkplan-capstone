import { NewTripModal } from "./NewTripModal.jsx";
import { getTripsByUserId } from "../../services/tripService.js";
import { useState } from "react";


export const NewTripButtonModal = () => {

  const [openModal, setOpenModal] = useState(false)
  const [trips, setTrips] = useState([])

  const localUser = localStorage.getItem("parkplan_user")
  const userObj = JSON.parse(localUser)

const refreshTrips = () => {
      getTripsByUserId(userObj.id).then(setTrips);
    };

    return (
      <div className="add-new-dash">
          <button className="trip-btn" onClick={() => setOpenModal(true)}>
            + Add New Trip
          </button>
          <NewTripModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            onTripCreated={refreshTrips}
          />
        </div>
    )

}