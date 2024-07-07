import { useEffect, useState } from "react";
import Buttons from "./Buttons";
import ProjectorController from "../projector/ProjectorController";

const Controller = ({ versesToDisplay, booksToDisplay }) => {
    const [show, setShow] = useState(false);
    const [clear, setClear] = useState(false);
    const channel = new BroadcastChannel('projectorData');
    
    useEffect(() => {
        if (show) {
            channel.postMessage({
                versesToDisplay: versesToDisplay,
                booksToDisplay: booksToDisplay,
                show: show
            });
            setShow(false);
        }
    }, [show]);

    useEffect(() => {
        if(clear){
            channel.postMessage({ clear: clear });
            setClear(false);
        }
    }, [clear]);

    return (
        <>
            <ProjectorController setShow={setShow} setClear={setClear}/>
            <Buttons/>
        </>
    );
}

export default Controller;
