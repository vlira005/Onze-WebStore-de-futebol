import { Link } from "react-router-dom";

export default function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link to="/" className="logo" onClick={onClick} aria-label="Onze — início">
      <span className="logo__marca">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
          <path d="M5 7h14M9 7v10M15 7v10" />
        </svg>
      </span>
      <span className="logo__texto">ONZE</span>
    </Link>
  );
}
