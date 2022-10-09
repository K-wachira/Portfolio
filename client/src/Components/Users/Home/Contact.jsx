import React from "react";

function Contact() {
  return (
    <div>
      <div className="container contactbanner" style={{ fontFamily: "Poetsen One" }}>
        <div className="fs-1 font-weight-bold mb-5" >GET IN TOUCH</div>
        <div>
          <p className="contact">
            Whether it's an interesting idea for a project that you have, some
            consultancy work you may need, or just a quick hello, I'd love to
            chat! I typically respond within a few hours.

            polyglot with experience learning a new language
          </p>
          <div></div>
          Please reach out to{" "}
          <a href="mailto:abkelvinwachira@gmail.com" className="">
            abkelvinwachira@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
