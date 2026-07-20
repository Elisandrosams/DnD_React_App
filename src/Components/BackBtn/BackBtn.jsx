import { useNavigate, useLocation } from "react-router-dom";
import './BackBtn.css'

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    const searchParams = location.state?.fromSearch || "";
    navigate(`/spells${searchParams}`);
  };

  return (
    <button onClick={handleBack} className="back-button">
      ← Back to Spells
    </button>
  );
};

export default BackButton;