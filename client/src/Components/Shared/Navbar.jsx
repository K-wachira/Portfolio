import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import locssmileblue from "../../Assets/Images/locssmileblue.svg";

function MyNavbar() {
  return (
    <Navbar collapseOnSelect expand="lg">
      <Container>
        <div class="d-sm-none">
          <img src={locssmileblue} width="40" height="30" class="d-lg-none align-top" alt="Kelvin Wachira"/>
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
              style={{ fontWeight: "bold" }, { fontStyle: "italic" }}
            >
              Blog
            </Nav.Link>

            <Nav.Link
              eventKey={2}
              href="/LetsChat"
              style={{ fontWeight: "bold" }, { fontStyle: "italic" }}
            >
              Lets Chat
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
