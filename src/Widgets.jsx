import "./Widgets.css";
import InfoIcon from "@mui/icons-material/Info";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useState } from "react";

function Widgets() {
  const [showInfo, setShowInfo] = useState(false);
  const newsArticle = (heading, subtitle) => {
    return (
      <div className="widgets__article">
        <div className="widgets__article__left">
          <FiberManualRecordIcon />
        </div>
        <div className="widgets__article__right">
          <h4>{heading}</h4>
          <p>{subtitle}</p>
        </div>
      </div>
    );
  };
  return (
    <div className="widgets">
      <div className="widgets__header">
        <h2>Linkedin News</h2>
        <div className="widgets__header__info">
          <InfoIcon onClick={() => setShowInfo(!showInfo)} />
          {showInfo && (
            <div className="showInfo">
              For more infos visit{" "}
              <a href="https://www.linkedin.com/" target="blank">
                Linkedin
              </a>
            </div>
          )}
        </div>
      </div>
      {newsArticle("We back", "Top News : 9090 Readers")}
      {newsArticle("UK updates", "Top News : 8005 Readers")}
      {newsArticle("Testa hitting new highs", "cars & auto : 4090 Readers")}
      {newsArticle("Bitcoin break the 22k$", "Crypto : 10500 Readers")}
    </div>
  );
}

export default Widgets;
