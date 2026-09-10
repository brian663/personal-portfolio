function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">
        BRIAN<span>.</span>
      </h2>

      <div className="nav-links">
        <a className="nav-link" href="#home">
          Home
        </a>
        <a className="nav-link" href="#about">
          About
        </a>
        <a className="nav-link" href="#skills">
          Skills
        </a>
        <a className="nav-link" href="#projects">
          Projects
        </a>
        <a className="nav-link" href="#contact">
          Contact
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
