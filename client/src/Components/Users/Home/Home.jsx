import React from "react";
import locssmileblue from "../../../Assets/Images/locssmileblue.svg";
import bluedashboard from "../../../Assets/Gifs/bluedashboard.gif";
import development from "../../../Assets/Gifs/development.gif";
import openssoucecode from "../../../Assets/Gifs/openssoucecode.gif";
import fullstack from "../../../Assets/Gifs/fullstack.gif";
import competitive from "../../../Assets/Gifs/competitive.webp";
import animation_500_ from "../../../Assets/Gifs/animation_500_l5tktz3o.gif";

function Home() {
  return (
    <div>
      <div className="container ">
        <div className="row childbanner">
          <div className="col-sm-12 col-lg-5 col-md-5 text-center align-bottom textdiv">
            <div className="font-weight-bold fs-2 ">
              <p>Hello 👋, I'm Kelvin Wachira. Thanks for stopping by.</p>
            </div>
            <div className="aboutdiv">
              <p className="text-decoration-underline font-weight-bold">
                Developer • Techie • Engineer
              </p>
              <p>
                I apply analytic thinking to problems and find a pragmatic
                solutions that aren't quick fixes, but of lasting value.
              </p>
            </div>
          </div>
          <div className="imagediv d-none d-md-block col-lg-5 col-md-6">
            <img className="img-fluid headerimg" src={locssmileblue} />
          </div>
        </div>
      </div>


      <div className="container text-center fs-2 fw-bold mt-5">
        <p> Here's what I have done</p>
      </div>
      <div class="container text-center ">
        <div class="container">
          <div class="row d-flex justify-content-round ">
            {/* <%# Card 1 %> */}
            <div class="col-sm-4">
              <div class="card">
                <div>
                  <img className="Home_lottieImg__gBEbz" src={animation_500_} />
                </div>
                <div class="p-2 ">
                  <h5 class="card-title" style={{ fontWeight: "bold" }}>
                    Backend Developer
                  </h5>
                </div>
                <div class="card-body">
                  <p class="card-text">
                    Behind the scenes hero - fulfilled by driving the back-side
                    of success. With a text editor and a vision, I'm a sucker
                    for writing code.
                  </p>
                </div>
              </div>
            </div>
            {/* <%# Card 2 %> */}
            <div class="col-sm-4">
              <div class="card">
                <div>
                  <img className="Home_lottieImg__gBEbz" src={bluedashboard} />
                </div>
                <div class=" p-2 ">
                  <h5 class="card-title" style={{ fontWeight: "bold" }}>
                    Automation Engineer
                  </h5>
                </div>
                <div class="card-body">
                  <p class="card-text">
                    Salesforce developer with strong Salesforce admin and
                    development skills. I enable and create user-friendly and
                    visually pleasing dashboards.
                  </p>
                </div>
              </div>
            </div>
            {/* <%# Card 3 %> */}
            <div class="col-sm-4">
              <div class="card">
                <div>
                  <img className="Home_lottieImg__gBEbz" src={fullstack} />
                </div>
                <div class=" p-2">
                  <h5 class="card-title" style={{ fontWeight: "bold" }}>
                    Project Management
                  </h5>
                </div>
                <div class="card-body">
                  <p class="card-text">
                    Being involved in the end to end product design process from
                    discovery to ideation, prototyping and testing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container text-center fs-2 fw-bold mt-5 ">
        <p class="mt-5 ">Recent Activity</p>
      </div>
      <div class="container  text-center  ">
        <div class="container">
          <div class="row d-flex justify-content-round">
            {/* <%# Card 1 %> */}
            <div class="col-sm-6">
              <div class="card cards">
                <div>
                  <img className="Home_lottieImg__gBEbz" src={openssoucecode} />
                </div>
                <div class=" p-2 ">
                  <h5 class="card-title" style={{ fontWeight: "bold" }}>
                    Open-Source Contribution
                  </h5>
                </div>
                <div class="card-body">
                  <p class="card-text">
                    Wikimedia is a virtual machine, written in C, for running
                    modern dynamic languages like Perl 6. Since 2007, I have
                    worked to increase stability of the code by increasing the
                    number of compiler warnings checked, running static analysis
                    tools like splint, and instrumenting the code.
                  </p>
                </div>
              </div>
            </div>
            {/* <%# Card 2 %> */}
            <div class="col-sm-6">
              <div class="card cards">
                <div>
                  <img className="Home_lottieImg__gBEbz" src={competitive} />
                </div>
                <div class=" p-2 ">
                  <h5 class="card-title" style={{ fontWeight: "bold" }}>
                    Competitive Programming
                  </h5>
                </div>
                <div class="card-body">
                  <p class="card-text">
                    I keep a beginners mind by playing and experimenting without
                    the fear of failure. There will always be things I have to
                    learn and I will make mistakes, which develop me, and
                    Competitive Programming gives me a platform to do just that
                  </p>
                </div>
              </div>
            </div>
            {/* <%# Card 3 %> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
