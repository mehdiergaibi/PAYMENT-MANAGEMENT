import { Link } from "react-router-dom";
import "./home.css";
function Home() {
  return (
    <div className="hero-section">
      <img
        src="https://imgs.search.brave.com/QhkeE-y_9QdDO8GUXTaKp81iHP8_maUlwF-de4uRdRo/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/Z2lmZ2l0LmNvbS9z/aXRlLWltYWdlcy90/b29scGFnZS1pbWFn/ZXMvZ3JhZGllbnQt/dG9vbC1leGFtcGxl/MS5qcGc"
        alt="Hero"
        className="hero-image"
      />
      <div className="hero-content">
        <h1>Welcome to CheckWise</h1>
        <p>Effortlessly manage your checks with our secure platform.</p>
        <button className="cta-button">
          <Link to="/login" style={{textDecoration: "none", color:"white"}} >
          Login
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Home;
