import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import locssmileblue from "../../Assets/Images/locssmileblue.svg";
import { Link } from "react-router-dom";

function MyNavbar() {
  return (
    <Navbar collapseOnSelect expand="lg">
      <Container>
        <div className="d-sm-none">
          <img
            src={locssmileblue}
            width="40"
            height="30"
            className="d-lg-none align-top"
            alt="Kelvin Wachira"
          />
        </div>
        <Navbar.Brand href="/" style={{ fontFamily: "Poetsen One" }}>
          Kelvin
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link
              href="/Blog"
              style={({ fontWeight: "bold" }, { fontStyle: "italic" })}
            >
              Blog
            </Nav.Link>

            <Nav.Link
              eventKey={2}
              href="/LetsChat"
            >
            <button class="pushable">
            <Link
              to={"/LetsChat"}
              className="front"
            >
              Lets chat
            </Link>
            </button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
