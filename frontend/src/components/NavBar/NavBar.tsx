import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';

// interface NavProps {
//   activeView: string;
//   onSelect?: (selectedKey: string | null) => void;
//   onChangeView: (view: string) => void;
// }

const NavBar: React.FC = () => {

  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use href="#bootstrap"></use></svg>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto mb-2 mb-lg-0 text-white ">
            <Nav.Link href="/records" className="link-secondary text-white">Records</Nav.Link>
            <Nav.Link href="/operation" className="link-secondary text-white">Operation</Nav.Link>
          </Nav>
          <div className="dropdown text-end">
            <div className="image--user d-block link-dark text-decoration-none">
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;