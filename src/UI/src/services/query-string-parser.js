import qs from 'qs';

const queryStringFromHash = (state) => {
    let queryString = state.location.search.substring(1, state.location.search.length);
    const result = qs.parse(queryString);
    return result;
}

export default queryStringFromHash;