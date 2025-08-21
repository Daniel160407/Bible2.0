import axios from "axios";
import { useEffect, useState } from "react";
import "../../style/ProjectorController.scss";

const ProjectorController = ({
  setShow,
  setClear,
  setVersions,
  setLanguages,
  setFontSize,
  fontSize,
  setFont,
  font,
  setTextColor,
  textColor,
  textPos,
  setTextPos,
  textStroke,
  setTextStroke,
  thickness,
  setThickness,
}) => {
  const [geoVersions, setGeoVersions] = useState([]);
  const [engVersions, setEngVersions] = useState([]);
  const [rusVersions, setRusVersions] = useState([]);

  const [selectedGeoVersion, setSelectedGeoVersion] = useState(
    "ახალი გადამუშავებული გამოცემა 2015"
  );
  const [selectedEngVersion, setSelectedEngVersion] = useState(
    "NASB New American Standard Bible"
  );
  const [selectedRusVersion, setSelectedRusVersion] = useState(
    "Синодальный перевод"
  );

  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const geoResponse = await axios.get(
          "https://holybible.ge/service.php?w=4&t=&m=&s=&language=geo&page=1"
        );
        setGeoVersions(geoResponse.data.versions);

        const engResponse = await axios.get(
          "https://holybible.ge/service.php?w=4&t=&m=&s=&language=eng&page=1"
        );
        setEngVersions(engResponse.data.versions);

        const rusResponse = await axios.get(
          "https://holybible.ge/service.php?w=4&t=&m=&s=&language=russian&page=1"
        );
        setRusVersions(rusResponse.data.versions);
      } catch (error) {
        console.error("Error fetching versions: ", error);
      }
    };

    fetchVersions();

    const versions = {
      geo: selectedGeoVersion,
      eng: selectedEngVersion,
      rus: selectedRusVersion,
    };

    setVersions(versions);
  }, [selectedGeoVersion, selectedEngVersion, selectedRusVersion, setVersions]);

  const handleCheckboxChange = (langKey, checked) => {
    setLanguages((prevLanguages) => ({
      ...prevLanguages,
      [langKey]: checked,
    }));
  };

  const handleVersionChange = (langKey, version, setSelectedVersion) => {
    setSelectedVersion(version);
    setVersions((prevVersions) => ({
      ...prevVersions,
      [langKey]: version,
    }));
  };

  const handleShowClick = () => {
    const languages = document.getElementsByClassName("languageCheckbox");
    let anySelected = false;

    for (let i = 0; i < languages.length; i++) {
      if (languages[i].checked) {
        anySelected = true;
        break;
      }
    }

    if (!anySelected) {
      setShowError(true);
      return;
    }

    setShowError(false);
    setShow(true);
    setClear(false);
  };

  return (
    <div id="projectorController">
      <div className="buttons">
        <button onClick={handleShowClick} className={showError ? "error" : ""}>
          Show
        </button>
        <button
          onClick={() => {
            setClear(true);
            setShow(false);
          }}
        >
          Clear
        </button>
      </div>
      <p>Text decorations</p>
      <div className="selection">
        <label htmlFor="font-size">Font Size:</label>
        <select
          id="font-size"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
      </div>
      <div className="selection">
        <label htmlFor="fonts">Fonts:</label>
        <select
          id="fonts"
          value={font}
          onChange={(e) => setFont(e.target.value)}
        >
          <option value="Banner">Banner</option>
          <option value="Valera">Valera</option>
          <option value="Mouldy">Mouldy</option>
          <option value="Oswald">Oswald</option>
        </select>
      </div>
      <div className="selection">
        <label htmlFor="textColor">Text Color:</label>
        <select
          id="textColor"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
        >
          <option style={{ color: "#f4f4f4" }} value="#f4f4f4">
            White
          </option>
          <option style={{ color: "#000000" }} value="#000000">
            Black
          </option>
          <option style={{ color: "#2196f3" }} value="#2196f3">
            Blue
          </option>
          <option style={{ color: "#edc612" }} value="#edc612">
            Yellow
          </option>
          <option style={{ color: "#31a24c" }} value="#31a24c">
            Green
          </option>
          <option style={{ color: "#ea1f36" }} value="#ea1f36">
            Red
          </option>
        </select>
      </div>
      <div className="selection">
        <label htmlFor="textPos">Text Position:</label>
        <select
          id="textPos"
          value={textPos}
          onChange={(e) => setTextPos(e.target.value)}
        >
          <option value={"left"}>Left</option>
          <option value={"center"}>Center</option>
          <option value={"right"}>Right</option>
        </select>
      </div>
      <div className="selection">
        <label htmlFor="textStroke">Text Stroke:</label>
        <select
          id="textStroke"
          value={textStroke}
          onChange={(e) => setTextStroke(e.target.value)}
        >
          <option value={"#f4f4f4"}>White</option>
          <option value={"#000000"}>Black</option>
        </select>
      </div>
      <div className="selection">
        <label htmlFor="text-stroke-range">Troke Width:</label>
        <input
          id="text-stroke-range"
          type="range"
          min="0.1"
          max="2"
          step="0.1"
          value={thickness}
          onChange={(e) => setThickness(e.target.value)}
        />
        <span className="thickness-state">{thickness}</span>
      </div>

      <p>Languages to display</p>
      {[
        {
          langKey: "geo",
          label: "Georgian",
          versions: geoVersions,
          selectedVersion: selectedGeoVersion,
          setSelectedVersion: setSelectedGeoVersion,
        },
        {
          langKey: "eng",
          label: "English",
          versions: engVersions,
          selectedVersion: selectedEngVersion,
          setSelectedVersion: setSelectedEngVersion,
        },
        {
          langKey: "rus",
          label: "Russian",
          versions: rusVersions,
          selectedVersion: selectedRusVersion,
          setSelectedVersion: setSelectedRusVersion,
        },
      ].map(
        ({ langKey, label, versions, selectedVersion, setSelectedVersion }) => (
          <div key={langKey} className="selection">
            <label htmlFor={langKey}>{label}</label>
            <input
              className="languageCheckbox"
              id={langKey}
              type="checkbox"
              onChange={(e) => handleCheckboxChange(langKey, e.target.checked)}
            ></input>
            <select
              id={`${langKey}Versions`}
              value={selectedVersion}
              onChange={(e) =>
                handleVersionChange(langKey, e.target.value, setSelectedVersion)
              }
            >
              {versions.map((version) => (
                <option key={version} value={version}>
                  {version}
                </option>
              ))}
            </select>
          </div>
        )
      )}
    </div>
  );
};

export default ProjectorController;
