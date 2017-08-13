import qs from 'qs';

const queryStringFromHash = (state) => {
    if (state.location && state.location.search) {
        let queryString = state.location.search.substring(1, state.location.search.length);
        const result = qs.parse(queryString);
        return result;
    }
    return {};
}

export default queryStringFromHash;