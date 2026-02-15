import { Link } from "react-router-dom";

const BackLink = () => (
  <Link
    to="/"
    className="inline-flex items-center gap-1.5 text-sm tracking-wide text-muted-foreground transition-colors duration-200 hover:text-foreground"
  >
    <span aria-hidden="true">←</span>
    <span>Back to Home</span>
  </Link>
);

export default BackLink;
