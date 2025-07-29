import "./WelcomeModal.css";

export const WelcomeModal = ({ onClose }) => {
  return (
    <div className="welcome-modal-content">
      <h2 className="welcome-title">Welcome to Pick A Park!</h2>
      <p className="welcome-subtitle">Your National Park Adventure Starts Here</p>

      <div className="demo-instructions">
        <ol className="instruction-list">
          <li>
            Enter <strong>any email address</strong> you want
          </li>
          <li>
            Make up <strong>any name</strong> (your choice!)
          </li>
          <li>Start planning your dream park adventure!</li>
        </ol>

        <div className="email-example">
          <div className="email-example-label">Try this example email:</div>
          <div className="email-example-text">ilovekyle@example.com</div>
        </div>
      </div>

      <button className="get-started-btn" onClick={onClose}>
        Let's Explore Parks!
      </button>
    </div>
  );
};
