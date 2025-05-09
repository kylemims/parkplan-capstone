// build out the main page a user visits when they log in.
// Make the button and message big, inviting, and easy to read.
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTripsByUserId } from "../../services/tripService";

export const TripLst = () => {};
const [trips, setTrips] = useState([]);
const navigate = useNavigate();

const localUser = localStorage.getItem("parkplan_user");
const userObj = JSON.parse(localUser);

useEffect(() => {
  getTripsByUserId(userObj.id).then(setTrips);
}, []);
