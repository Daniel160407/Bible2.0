const ProjectorController = ({ setShow, setClear }) => {
    return (
        <div id="control">
            <button onClick={() => {
                setShow(true);
                setClear(false);
            }}>Show</button>
            <button onClick={() => {
                setClear(true);
                setShow(false);
            }}>Clear</button>
        </div>
    );
}

export default ProjectorController;