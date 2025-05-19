// Create a reusable dropdown component for selcting parks
export const DropDown = ({
  options,
  selectedValue,
  onChange,
  labelKey = "name",
  valueKey = "id",
}) => {
  return (
    <select vlue={selectedValue} onChange={onChange} className="dropdown">
      <option value="">Select an option...</option>
      {options.map((option) => (
        <option key={option[valueKey]} value={option[valueKey]}>
          {option[labelKey]}
        </option>
      ))}
    </select>
  );
};

// export const ParkSelectDropdown = ({ parks, selectedParkId, handleSelect }) => {
//   return (
//     <select className="dropdown" value={selectedParkId} onChange={handleSelect}>
//       <option value="0">Select a park...</option>
//       {parks?.map((park) => (
//         <option key={park.id} value={park.id}>
//           {park.name}
//         </option>
//       ))}
//     </select>
//   );
// };
