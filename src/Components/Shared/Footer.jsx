function MyFooter() {
  return (
    <footer class="text-muted py-5 bg-light">
      <div class="container">
        <p class="float-end">
          <i href="#" class="bi bi-arrow-up-circle">
            <a href="#">Back to top</a>
          </i>
        </p>
        <div className="container text-center">
          <button className="pushable">
            <a
              href="https://drive.google.com/file/d/1uC9gO9D4JxTcUyJGuoAO_D0F0967SHNL/view?usp=sharing"
              className="front b"
            >
              Resume
            </a>
          </button>
          <button className="pushable">
            <a
              href="https://github.com/k-wachira"
              className="front bi bi-github"
            ></a>
          </button>
          <button className="pushable">
            <a href="mailto:abkelvinwachira@gmail.com" className="front ">
              Lets chat
            </a>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default MyFooter;
