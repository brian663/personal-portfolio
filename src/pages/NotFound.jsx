import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="admin-page">
      <div className="admin-panel">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p>The page you requested does not exist.</p>
        <Link className="btn primary-btn" to="/">
          Back home
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
