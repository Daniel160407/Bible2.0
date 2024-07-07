import axios from "axios";
import { useEffect, useState, version } from "react";
import '../../style/ProjectorController.scss';

const ProjectorController = ({ setShow, setClear }) => {
    const [geoVersions, setGeoVersions] = useState([]);
    const [engVersions, setEngVersions] = useState([]);
    const [rusVersions, setRusVersions] = useState([]);

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
    }, []);

    return (
        <div id="control">
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
                <label htmlFor="georgian">Georgian</label>
                <input id="georgian" type="checkbox"></input>
                <select id="geoVersions">
                    {geoVersions.map(version => (
                        <option key={version}>{version}</option>
                    ))}
                </select>
            </div>
            <div className="selection">
                <label htmlFor="english">English</label>
                <input id="english" type="checkbox"></input>
                <select id="engVersions">
                    {engVersions.map(version => (
                        <option key={version}>{version}</option>
                    ))}
                </select>
            </div>
            <div className="selection">
                <label htmlFor="russian">Russian</label>
                <input id="russian" type="checkbox"></input>
                <select id="rusVersions">
                    {rusVersions.map(version => (
                        <option key={version}>{version}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default ProjectorController;