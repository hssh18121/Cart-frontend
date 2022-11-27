import React from "react";

const CheckoutForm = (props) => {
  return (
    <React.Fragment>
      <section
        className={"section-cta modal  hidden-section"}
        style={{ background: "#fff" }}
      >
        <div>
          <div>
            <button className="close-modal" onClick={props.closeModal}>
              &times;
            </button>
            <div className="cta-text-box">
              <h2 className="heading-secondary">
                Please provide us your information!
              </h2>

              <form className="cta-form" action="#">
                <div>
                  <label htmlFor="full-name">Full Name</label>
                  <input
                    id="full-name"
                    type="text"
                    placeholder="John Smith"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email">Email address</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="me@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="address">Your address</label>
                  <input
                    id="address"
                    type="address"
                    placeholder="123 Street 1 District"
                    required
                  />
                </div>

                <button className="btn btn--form" id="submit-btn">
                  Checkout!
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <div className="overlay"></div>
    </React.Fragment>
  );
};

export default CheckoutForm;
