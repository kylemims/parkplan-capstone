//? build out component for the 10,000 forms that will be created.

export const FormInput = ({ label, type, name, id, value, onChange, placeholder }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="form-control"
      />
    </div>
  );
};
