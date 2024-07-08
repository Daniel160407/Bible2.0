import PropTypes from 'prop-types';
import '../style/Verses.scss';

const Verses = ({ versesToDisplay }) => {
    return (
        <div className="verses">
            {versesToDisplay.bv.map((verse, index) => (
                <div key={index} className="verse">
                    <h1 className="verse-text">{verse.bv}</h1>
                    <h1 className="verse-reference">
                        {versesToDisplay.book} {versesToDisplay.chapter}:{versesToDisplay.verse + index}
                    </h1>
                </div>
            ))}
        </div>
    );
}

Verses.propTypes = {
    versesToDisplay: PropTypes.shape({
        bv: PropTypes.arrayOf(PropTypes.shape({
            bv: PropTypes.string.isRequired,
        })).isRequired,
        book: PropTypes.string.isRequired,
        chapter: PropTypes.number.isRequired,
        verse: PropTypes.number.isRequired
    }).isRequired
};

export default Verses;
