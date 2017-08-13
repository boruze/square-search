import Component from "../components/edit";
import {EditReducer, actions} from "../reducers/edit";
import React from 'react';
import {connect} from 'react-redux';
import Immutable from "immutable";
import {getAllItems, getItem, saveItem} from "../api/coordinate-list-service";
import {push} from 'react-router-redux';
import translations from "../configuration/translations";
import {readFileToString} from "../services/file-reader";
import findUniqueSquaresPromise from "../services/square-search";

const renderPrevLink = (state) => {
  const filter = state.edit.get("filterVisibleCoordinates").toJSON();
  const newOffset = +filter.offset - +filter.limit;
  return (newOffset) >= 0;
}
const getOnPrevLinkClick = (dispatch) => {
  return (id, limit, offset) => {
      const newOffset = +offset - +limit;
      return dispatch(actions.setVisibleCoordinateFilter({limit: limit, offset: newOffset}));
  }
}
const getOnNextLinkClick = (dispatch) => {
  return (id, limit, offset) => {
      const newOffset = +offset + +limit;
      return dispatch(actions.setVisibleCoordinateFilter({limit: limit, offset: newOffset}));
      };
}
const renderNextLink = (state) => {
  const filter = state.edit.get("filterVisibleCoordinates").toJSON();
  const newOffset = +filter.offset + +filter.limit;
  const result = (newOffset) < state.edit.get("coordinates").size;
  return result;
}
const mapStateToProps = (state) => {
  const squares = state.edit.get("squares");
  const id = state.edit.get("id");
  const coordinates = state.edit.get("coordinates").toJSON();
  let filter = state.edit.get("filterVisibleCoordinates").toJSON();
  filter.limit = filter.limit;
  filter.offset = filter.offset;
  return {
    coordinates: coordinates || [],
    visibleCoordinates: coordinates.slice(filter.offset, filter.limit + filter.offset) || [],
    title: state.edit.get("name") || translations.newList,
    name: state.edit.get("name") || "",
    squares: squares.size ? squares.toJSON() : [],
    squareCount: squares.size,
    message: state.edit.get("message"),
    id: id,
    renderForm: !id || id && state.edit.get("name"),
    exportUrl: coordinates.length > 0 ? generateExportUrl(coordinates) : null,
    prevLink: renderPrevLink(state),
    nextLink: renderNextLink(state),
    limit: filter.limit,
    offset: filter.offset
  };
}
const generateExportUrl = (coordinates) => {
  const coordinatesToText = coordinates.map(coo => coo.pointX +" " + coo.pointY).join("\r\n")
  const contents = new Blob([coordinatesToText], { type: 'text/plain' }); 
  return URL.createObjectURL(contents);
}
const mapApiErrors = (response) => {
  if (response.status === 400) {
    //in v1, only one message is supported
    return response.response.body[Object.keys(response.response.body)[0]];
  } else {
    return translations.generalError;
  }
}
const mapDispatchToProps = (dispatch) => { 
  const onSquareFound = (square) => {
    return dispatch(actions.addSquare(square));
  }
  return {
    getData: (id, limit, offset) => {
      if (id > 0){
        return getItem(id)
            .then(listItem => {
                findUniqueSquaresPromise(listItem.coordinates.slice(offset, limit + offset), onSquareFound);
                dispatch(actions.setName(listItem.name));
                dispatch(actions.setId(listItem.id));
                return dispatch(actions.setCoordinates(listItem.coordinates));
            },
          (resp) => dispatch(actions.setMessage({type: "error", message: mapApiErrors(resp)})));
      }
    },
    onCoordinateChange: (index, coordinate, limit, offset) => {
      dispatch(actions.clearSquares());
      dispatch(actions.updateCoordinate(index, coordinate));
      return findUniqueSquaresPromise(state.edit.get("coordinates").toJSON().slice(offset, limit + offset), onSquareFound);
    },
    removeCoordinate: (index, limit, offset) => {
      dispatch(actions.clearSquares());
      dispatch(actions.removeCoordinate(index));
      return findUniqueSquaresPromise(state.edit.get("coordinates").toJSON().slice(offset, limit + offset), onSquareFound);
    },
    onNameChange: name => {
        return dispatch(actions.setName(name));
    },
    onNewCoordinate: (limit, offset) => {
      dispatch(actions.clearSquares());
      dispatch(actions.addCoordinate({pointX: 0, pointY: 0}));
      return findUniqueSquaresPromise(state.edit.get("coordinates").toJSON().slice(offset, limit + offset), onSquareFound);
    },
    clearCoordinates: () => {
      dispatch(actions.clearSquares());
      dispatch(actions.setVisibleCoordinateFilter({limit: 5, offset: 0}));
      return dispatch(actions.setCoordinates([]));
    },
    onSubmitClick: (id, name, coordinates) => {
        return saveItem(id, name, coordinates)
          .then(() => dispatch(push(`/?limit=5&offset=0&sortBy=1`)),
          (resp) => dispatch(actions.setMessage({type: "error", message: mapApiErrors(resp)})));
    },
    loadFromFile: (file) => {
      return readFileToString(file.target.files[0])
        .then((f) => {
          try {
            const coordinatePairs = f.split(/\r?\n/);
            const uniqueCoordinatePairs = coordinatePairs.filter(
                (item, index, parentArray) => parentArray.indexOf(item) === index)
            const stateItems = uniqueCoordinatePairs.map(coordinate =>
              {
                var parsed = coordinate.split(" ");
                return {
                pointX: +parsed[0],
                pointY: +parsed[1]
              }
              }).slice(0, 10000);
              dispatch(actions.clearSquares());
              dispatch(actions.setVisibleCoordinateFilter({limit: 5, offset: 0}));
              dispatch(actions.setCoordinates(stateItems));
              if (uniqueCoordinatePairs.length !== coordinatePairs.length){
                dispatch(actions.setMessage({type: "info", message: "Duplicate and exceeding the max count (10000) coordinates were removed"}));
              }
          }
          catch(err) {
              dispatch(actions.setMessage({type: "error", message: "Could not parse file"}));
          }
        });
    },
    onPrevLinkClick: getOnPrevLinkClick(dispatch, state),
    onNextLinkClick: getOnNextLinkClick(dispatch, state)
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Component);