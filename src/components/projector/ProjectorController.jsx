import axios from "axios";
import { useEffect, useState } from "react";
import '../../style/ProjectorController.scss';

const ProjectorController = ({ setShow, setClear, setVersions, setLanguages, setFontSize, fontSize, setFont, font }) => {
    const [geoVersions, setGeoVersions] = useState([]);
    const [engVersions, setEngVersions] = useState([]);
    const [rusVersions, setRusVersions] = useState([]);

    const [selectedGeoVersion, setSelectedGeoVersion] = useState('ახალი გადამუშავებული გამოცემა 2015');
    const [selectedEngVersion, setSelectedEngVersion] = useState('NASB New American Standard Bible');
    const [selectedRusVersion, setSelectedRusVersion] = useState('Синодальный перевод');

    useEffect(() => {
        axios.get('https://holybible.ge/service.php?w=4&t=&m=&s=&language=geo&page=1')
            .then(response => {
                setGeoVersions(response.data.versions);
            });

        axios.get('https://holybible.ge/service.php?w=4&t=&m=&s=&language=eng&page=1')
            .then(response => {
                setEngVersions(response.data.versions);
            });
        
        axios.get('https://holybible.ge/service.php?w=4&t=&m=&s=&language=russian&page=1')
            .then(response => {
                setRusVersions(response.data.versions);
            });
        
        const versions = {
            geo: selectedGeoVersion,
            eng: selectedEngVersion,
            rus: selectedRusVersion
        }

        setVersions(versions);
    }, []);

    const handleGeoVersionsChange = (e) => {
        if (document.getElementById('georgian').checked) {
            setVersions(prevVersions => ({
                ...prevVersions,
                geo: e.target.value
            }));
            setSelectedGeoVersion(e.target.value);
        }
    };

    const handleEngVersionsChange = (e) => {
        if (document.getElementById('english').checked) {
            setVersions(prevVersions => ({
                ...prevVersions,
                eng: e.target.value
            }));
            setSelectedEngVersion(e.target.value);
        }
    };

    const handleRusVersionsChange = (e) => {
        if (document.getElementById('russian').checked) {
            setVersions(prevVersions => ({
                ...prevVersions,
                rus: e.target.value
            }));
            setSelectedRusVersion(e.target.value);
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
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                </select>
            </div>
            <div className="selection">
                <label htmlFor="fonts">Fonts:</label>
                <select id="fonts" value={font} onChange={(e) => setFont(e.target.value)}>
                    <option>Banner</option>
                    <option>Valera</option>
                    <option>Mouldy</option>
                    <option>Oswald</option>
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
