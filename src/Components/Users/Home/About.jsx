import React from "react";
import locssmileblue from "../../../Assets/Images/locssmileblue.svg";

function Contact() {
  return (
    <div>
      <div className="container parentbanner py-5 ">
        <div className="row childbanner py-5">
          <div className="row py-5">
            <div style={{ fontFamily: "Poetsen One" }} className="fs-4 fw-bold">
              <p>Hello 👋, I'm Kelvin Wachira. Thanks for stopping by.</p>
            </div>
          </div>
          <div className="row">
            <div className="imagediv d-none d-md-block col-lg-5 col-md-6">
              <img
                className="img-fluid headerimg"
                src={locssmileblue}
                alt="..."
              />
            </div>
            <div className="col-sm-12 col-lg-7 col-md-5 text-center align-bottom textdiv">
              <div className="fs-5 ">
                <div className="container   text-start text-wrap">
                  <span>
                    Right now I am learning more about product management. I
                    have been an engineer for almost 2 years and its great to
                    build products, but I want to learn how to think
                    strategically about what we build.
                  </span>
                  <br></br>
                  <br></br>
                  <span>
                    The coolest project I ever built was creating a browser
                    extension that enables clients to provide micro-feedback on
                    various interactions they have with a specific vendors in
                    online meetings. It's my proudest because I was involved in
                    the entire product pipeline, from how users interact with
                    extensions to how data is inserted, updated, and enriched on
                    the backend. It's also my favorite because I got to
                    experiment with various technologies using platforms like
                    Foundry with user data to understand relationships between
                    clients and vendors quickly.
                  </span>
                  <br></br>
                  <br></br>
                  <span>
                    My skill set covers a variety of areas related to
                    backend-development, automations, data analysis, and machine
                    learning.
                  </span>
                  <br></br>
                  <br></br>
                  Outside of work, I love bike ridding, rollerskating and
                  occasional hiking photography
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
