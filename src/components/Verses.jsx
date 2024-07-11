import PropTypes from 'prop-types';
import '../style/Verses.scss';
import { useEffect, useState } from 'react';

const Verses = ({ versesToDisplay, setSeparatedProjectorVerse }) => {
    const [showSeparatedVerse, setShowSeparatedVerse] = useState(false);
    const [separatedVerse, setSeparatedVerse] = useState(null);

    useEffect(() => {
        if(showSeparatedVerse){
            setShowSeparatedVerse(false);
        }
    }, [versesToDisplay]);

    const handleSeparate = (verse) => {
        setSeparatedVerse(verse);
        setSeparatedProjectorVerse(verse)
        setShowSeparatedVerse(true);
    };

    return (
        <div className="verses">
            {!showSeparatedVerse ? (
                versesToDisplay.chapter && versesToDisplay.bv.length > 0 ? (
                    versesToDisplay.bv.map((verse, index) => (
                        <div key={index} className="verse">
                            <h1 className="verse-text">{verse.bv}</h1>
                            <h1 className="verse-reference">
                                {versesToDisplay.book} {versesToDisplay.chapter}:{versesToDisplay.verse + index}
                            </h1>
                        </div>
                    ))
                ) : (
                    versesToDisplay.bv.map((verse, index) => (
                        <div key={index} className="verse">
                            <h1 
                                className="verse-text" 
                                dangerouslySetInnerHTML={{ __html: verse.bv }}
                            ></h1>
                            <h1 className="verse-reference">
                                {versesToDisplay.book} {verse.tavi}:{verse.muxli}
                            </h1>
                            <div className="separateDiv">
                                <button className="separateButton" onClick={() => handleSeparate(verse)}>Separate</button>
                            </div>
                        </div>
                    ))
                )
            ) : (
                <div className="verse">
                    <h1 className="verse-text" dangerouslySetInnerHTML={{ __html: separatedVerse.bv}}></h1>
                    <h1 className="verse-reference">
                        {versesToDisplay.book} {separatedVerse.tavi}:{separatedVerse.muxli}
                    </h1>
                </div>
            )}
        </div>
    );
}

Verses.propTypes = {
    versesToDisplay: PropTypes.shape({
        bv: PropTypes.arrayOf(PropTypes.shape({
            bv: PropTypes.string.isRequired,
        })).isRequired,
        book: PropTypes.string.isRequired,
        chapter: PropTypes.number,
        verse: PropTypes.number
    }).isRequired
};

export default Verses;
