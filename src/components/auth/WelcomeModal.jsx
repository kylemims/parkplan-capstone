import "./WelcomeModal.css";

export const WelcomeModal = ({ onClose }) => {
  return (
    <div className="wm-layout">
      <section className="wm-logo-adventure-block">
        <img src="/images/park-feature-hero.svg" alt="Pick A Park logo" className="modal-logo" />
        {/* <p className="wm-subtitle">Your Adventure Starts Here</p> */}
      </section>

      <section className="wm-rundown-block">
        <div className="wm-instructions-block">
          <div className="wm-instruction-list">
            <div className="wm-instructions-item">
              Enter <strong>any email address</strong> you want
            </div>
            <div className="wm-instructions-item">
              Make up <strong>any name</strong> (your choice!)
            </div>
            <div className="wm-instructions-item">
              Plan <strong>your dream</strong> adventure!
            </div>
          </div>
        </div>

        <div className="email-example-block">
          <div className="email-example-label">Try this example email:</div>
          <div className="email-example-text">ilovekyle@example.com</div>
        </div>

        <button className="get-started-btn" onClick={onClose}>
          Let's Explore Parks!
        </button>
      </section>
    </div>
  );
};
