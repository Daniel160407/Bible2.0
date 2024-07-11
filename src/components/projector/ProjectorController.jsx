import axios from "axios";
import { useEffect, useState } from "react";
import '../../style/ProjectorController.scss';

const ProjectorController = ({ setShow, setClear, setVersions, setLanguages, setFontSize, fontSize, setFont, font, setTextColor, textColor }) => {
    const [geoVersions, setGeoVersions] = useState([]);
    const [engVersions, setEngVersions] = useState([]);
    const [rusVersions, setRusVersions] = useState([]);

    const [selectedGeoVersion, setSelectedGeoVersion] = useState('ახალი გადამუშავებული გამოცემა 2015');
    const [selectedEngVersion, setSelectedEngVersion] = useState('NASB New American Standard Bible');
    const [selectedRusVersion, setSelectedRusVersion] = useState('Синодальный перевод');

    useEffect(() => {
        const fetchVersions = async () => {
            try {
                const geoResponse = await axios.get('https://holybible.ge/service.php?w=4&t=&m=&s=&language=geo&page=1');
                setGeoVersions(geoResponse.data.versions);

                const engResponse = await axios.get('https://holybible.ge/service.php?w=4&t=&m=&s=&language=eng&page=1');
                setEngVersions(engResponse.data.versions);

                const rusResponse = await axios.get('https://holybible.ge/service.php?w=4&t=&m=&s=&language=russian&page=1');
                setRusVersions(rusResponse.data.versions);
            } catch (error) {
                console.error("Error fetching versions: ", error);
            }
        };

        fetchVersions();

        const versions = {
            geo: selectedGeoVersion,
            eng: selectedEngVersion,
            rus: selectedRusVersion
        }

        setVersions(versions);
    }, [selectedGeoVersion, selectedEngVersion, selectedRusVersion, setVersions]);

    const handleGeoVersionsChange = (e) => {
        if (document.getElementById('georgian').checked) {
            setSelectedGeoVersion(e.target.value);
            setVersions(prevVersions => ({
                ...prevVersions,
                geo: e.target.value
            }));
        }
    };

    const handleEngVersionsChange = (e) => {
        if (document.getElementById('english').checked) {
            setSelectedEngVersion(e.target.value);
            setVersions(prevVersions => ({
                ...prevVersions,
                eng: e.target.value
            }));
        }
    };

    const handleRusVersionsChange = (e) => {
        if (document.getElementById('russian').checked) {
            setSelectedRusVersion(e.target.value);
            setVersions(prevVersions => ({
                ...prevVersions,
                rus: e.target.value
            }));
        }
    };

    const handleGeoCheckboxChange = (e) => {
        setLanguages(prevLanguages => ({
            ...prevLanguages,
            geo: e.target.checked
        }));
    };

    const handleEngCheckboxChange = (e) => {
        setLanguages(prevLanguages => ({
            ...prevLanguages,
            eng: e.target.checked
        }));
    };

    const handleRusCheckboxChange = (e) => {
        setLanguages(prevLanguages => ({
            ...prevLanguages,
            rus: e.target.checked
        }));
    };

    return (
        <div id="projectorController">
            <div className="buttons">
                <button onClick={() => {
                    setShow(true);
                    setClear(false);
                }}>Show</button>
                <button onClick={() => {
                    setClear(true);
                    setShow(false);
                }}>Clear</button>
            </div>
            <div className="selection">
                <label htmlFor="font-size">Font Size:</label>
                <select id="font-size" value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
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
                <select id="fonts" value={font} onChange={(e) => setFont(e.target.value)}>
                    <option value="Banner">Banner</option>
                    <option value="Valera">Valera</option>
                    <option value="Mouldy">Mouldy</option>
                    <option value="Oswald">Oswald</option>
                </select>
            </div>
            <div className="selection">
                <label htmlFor="textColor">Text Color</label>
                <select id="textColor" value={textColor} onChange={(e) => setTextColor(e.target.value)}>
                    <option style={{color: '#f4f4f4'}} value='#f4f4f4'>White</option>
                    <option style={{color: '#000000'}} value='#000000'>Black</option>
                    <option style={{color: '#2196f3'}} value='#2196f3'>Blue</option>
                    <option style={{color: '#edc612'}} value='#edc612'>Yellow</option>
                    <option style={{color: '#31a24c'}} value='#31a24c'>Green</option>
                    <option style={{color: '#ea1f36'}} value='#ea1f36'>Red</option>
                </select>
            </div>
            <div className="selection">
                <label htmlFor="georgian">Georgian</label>
                <input id="georgian" type="checkbox" onChange={handleGeoCheckboxChange}></input>
                <select id="geoVersions" value={selectedGeoVersion} onChange={handleGeoVersionsChange}>
                    {geoVersions.map(version => (
                        <option key={version} value={version}>{version}</option>
                    ))}
                </select>
            </div>
            <div className="selection">
                <label htmlFor="english">English</label>
                <input id="english" type="checkbox" onChange={handleEngCheckboxChange}></input>
                <select id="engVersions" value={selectedEngVersion} onChange={handleEngVersionsChange}>
                    {engVersions.map(version => (
                        <option key={version} value={version}>{version}</option>
                    ))}
                </select>
            </div>
            <div className="selection">
                <label htmlFor="russian">Russian</label>
                <input id="russian" type="checkbox" onChange={handleRusCheckboxChange}></input>
                <select id="rusVersions" value={selectedRusVersion} onChange={handleRusVersionsChange}>
                    {rusVersions.map(version => (
                        <option key={version} value={version}>{version}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default ProjectorController;
