import axios from "axios";

const GetVerses = ({language, version, book, chapter}) => {
    return axios.get(`https://holybible.ge/service.php?w=${book}&t=${chapter}&m=&s=&mv=${version}&language=${language}&page=1`);
}

export default GetVerses;