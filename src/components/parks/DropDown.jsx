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
