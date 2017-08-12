import Promise from 'promise';
import superagent from 'superagent';
import wrapper from "superagent-promise";

const request = wrapper(superagent, Promise);

export const getAllItems = (limit, offset, sortBy) => {
    return request.get(`http://localhost:5000/api/CoordinateList?limit=${limit}&offset=${offset}&sortBy=${sortBy}`).end().then(response => response.body);
}
export const getItem = (id) => {
    return request.get(`http://localhost:5000/api/CoordinateList/${id}`).end().then(response => response.body);
}
export const saveItem = (id, name, coordinates) => {
    let r;
    if (id > 0){
        r = request.put(`http://localhost:5000/api/CoordinateList/${id}`)
    } else {
        r = request.post(`http://localhost:5000/api/CoordinateList`)
    }
    return r.send({ id: id, name: name, coordinates: coordinates }).set('Content-Type', 'application/json').then(response => response.body);
}
export const deleteItem = (id) => {
    return request.del(`http://localhost:5000/api/CoordinateList/${id}`).end().then(response => response.body);
}