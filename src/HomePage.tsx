import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="font-roboto-mono">
      Welcome to the Permaweb!
      <Link to={"/about/"}>
        <div>About</div>
      </Link>
    </div>
  );
}

export default HomePage;
