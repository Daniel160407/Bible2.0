import PropTypes from 'prop-types';
import '../style/Verses.scss';

const Verses = ({ versesToDisplay }) => {
    return (
        <div className="verses">
            {versesToDisplay.chapter && versesToDisplay.bv.length > 0 ? (
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
                        <div className='separateDiv'>
                            <button className='separateButton' >Separate</button>
                        </div>
                    </div>
                ))
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
