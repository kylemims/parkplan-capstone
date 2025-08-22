import "./WelcomeModal.css";

export const WelcomeModal = ({ onClose }) => {
  return (
    <div className="wm-layout">
      <section className="wm-logo-adventure-block">
        <img
          src="/images/park-feature-hero.svg"
          alt="Pick A Park logo"
          className="modal-logo"
          loading="lazy"
        />
        {/* <p className="wm-subtitle">Your Adventure Starts Here</p> */}
      </section>

      <section className="wm-rundown-block">
        <div className="wm-instructions-block">
          <div className="wm-instruction-list">
            <div className="wm-instructions-item">
              Make up <strong>ANY NAME</strong> you want
            </div>
            <div className="wm-instructions-item">
              Make up <strong>ANY EMAIL</strong> (your choice!)
            </div>
            <div className="wm-instructions-item">
              Plan <strong>YOUR DREAM</strong> adventure!
            </div>
          </div>
        </div>
      </section>
      <section className="bottom-half">
        <div className="email-example-help">Need help?</div>
        <div className="email-example-block">
          <div className="email-example-label">Use your pet's name w/ @example.com</div>
          <div className="email-example-text">pumpkin@example.com</div>
        </div>

        <button className="get-started-btn" onClick={onClose}>
          Let's Explore Parks!
        </button>
      </section>
    </div>
  );
};
