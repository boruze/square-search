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
import queryStringFromHash from "../services/query-string-parser";

const mapStateToProps = (state) => {
  const squares = state.edit.get("squares");
  const id = state.edit.get("id");
  const queryParams = queryStringFromHash(state.router);
  return {
    coordinates: state.edit.get("coordinates").toJSON() || [],
    title: state.edit.get("name") || translations.newList,
    name: state.edit.get("name") || "",
    squares: squares.size ? squares.toJSON() : [],
    squareCount: squares.size,
    message: state.edit.get("message"),
    id: id,
    renderForm: !id || id && state.edit.get("name")
  };
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
    getData: (id) => {
      if (id > 0){
        return getItem(id)
            .then(listItem => {
                findUniqueSquaresPromise(listItem.coordinates, onSquareFound);
                dispatch(actions.setName(listItem.name));
                dispatch(actions.setId(listItem.id));
                return dispatch(actions.setCoordinates(listItem.coordinates));
            },
          (resp) => dispatch(actions.setMessage({type: "error", message: mapApiErrors(resp)})));
      }
    },
    onCoordinateChange: (index, coordinate) => {
      dispatch(actions.clearSquares());
      dispatch(actions.updateCoordinate(index, coordinate));
      return findUniqueSquaresPromise(state.edit.get("coordinates").toJSON(), onSquareFound);
    },
    removeCoordinate: index => {
      dispatch(actions.clearSquares());
      dispatch(actions.removeCoordinate(index));
      return findUniqueSquaresPromise(state.edit.get("coordinates").toJSON(), onSquareFound);
    },
    onNameChange: name => {
        return dispatch(actions.setName(name));
    },
    onNewCoordinate: () => {
      dispatch(actions.clearSquares());
      dispatch(actions.addCoordinate({pointX: 0, pointY: 0}));
      return findUniqueSquaresPromise(state.edit.get("coordinates").toJSON(), onSquareFound);
    },
    clearCoordinates: () => {
      dispatch(actions.clearSquares());
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
                pointX: parsed[0],
                pointY: parsed[1]
              }
              });
              dispatch(actions.setCoordinates(stateItems));
              if (uniqueCoordinatePairs.length !== coordinatePairs.length){
                dispatch(actions.setMessage({type: "info", message: "Duplicate coordinates were removed"}));
              }
          }
          catch(err) {
              dispatch(actions.setMessage({type: "error", message: "Could not parse file"}));
          }
        });
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Component);