import { useEffect } from "react";
import PropTypes from 'prop-types'; // Import PropTypes for type checking
import '../style/Verses.scss';

const Verses = ({ versesToDisplay, bookToDisplay }) => {
    useEffect(() => {
        console.log(versesToDisplay);
    }, [versesToDisplay]);

    return (
        <div className="verses">
            {versesToDisplay.map(verse => (
                <div key={verse.id} className="verse">
                    <h1 className="verse-text">{verse.bv}</h1>
                    <h1 className="verse-reference">{bookToDisplay} {verse.tavi}:{verse.muxli}</h1>
                </div>
            ))}
        </div>
    );
}

Verses.propTypes = {
    versesToDisplay: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            bv: PropTypes.string.isRequired
        })
    ).isRequired
};

export default Verses;
