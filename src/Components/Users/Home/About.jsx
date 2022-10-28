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
              <img className="img-fluid headerimg" src={locssmileblue} alt="..."/>
            </div>
            <div className="col-sm-12 col-lg-7 col-md-5 text-center align-bottom textdiv">
              <div className="fs-5 ">
                <div className="container   text-start text-wrap">
                  <span>
                    I'm currently pursuing a Master's degree at Carnegie Mellon
                    University, focusing on Entertainment Technology (computer
                    graphics). I've recently graduated from the
                    <a
                      href="https://www.saic.edu/"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      School of the Art Institute of Chicago.
                    </a>
                  </span>
                  <br></br>
                  <br></br>
                  <span>
                    I focus on people's everyday thinking, emotions, and
                    behavior to make human-centered designs that can improve the
                    daily life of people.
                  </span>
                  <br></br>
                  <br></br>
                  <span>
                    My skill set covers a variety of areas related to UX design
                    such as user research, data analysis, and interaction
                    design. I like to extract creative solutions to enhance
                    users’ experiences through design thinking.
                  </span>
                  My interest also lies in
                  <a
                    href="https://www.flickr.com/photos/leahleeart/"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    photography
                  </a>
                  , XR design, and 3D motion graphics.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container bg-dark h-100 text-center">
          <button className="pushable">
            <a href="mailto:abkelvinwachira@gmail.com" className="front">
              Lets chat
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
