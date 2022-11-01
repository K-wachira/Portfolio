function MyFooter() {
  return (
    <footer class="text-muted py-5 bg-light text-center">
      <div class="container">
        <p class="float-end mb-1">
          <a href="#">Back to top</a>
        </p>
        <div className="container bg-dark h-100 text-center">
          <button className="pushable">
            <a href="mailto:abkelvinwachira@gmail.com" className="front">
              Lets chat
            </a>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default MyFooter;
