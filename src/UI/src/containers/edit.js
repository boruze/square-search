import Component from "../components/edit";
import {EditReducer, actions} from "../reducers/edit";
import React from 'react';
import {connect} from 'react-redux';
import Immutable from "immutable";
import {getAllItems, getItem, saveItem} from "../api/coordinate-list-service";
import {push} from 'react-router-redux';
import translations from "../configuration/translations";
import {readFileToString} from "../services/file-reader";

const mapStateToProps = (state) => {
  return {
    coordinates: state.edit.get("coordinates") || Immutable.fromJS([]),
    errors: state.edit.get("errors") || Immutable.fromJS([]),
    title: state.edit.get("name") || translations.newList,
    message: state.edit.get("message"),
    renderForm: !state.edit.get("id") || state.edit.get("id") && state.edit.get("name")
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
  return {
    getData: (id) => {
      if (id > 0){
        return getItem(id)
            .then(listItem => {
                dispatch(actions.setName(listItem.name));
                dispatch(actions.setId(listItem.id));
                dispatch(actions.setCoordinates(listItem.coordinates));
            },
          (resp) => dispatch(actions.setMessage({type: "error", message: mapApiErrors(resp)})));
      }
    },
    onCoordinateChange: (index, coordinate) => {
      return dispatch(actions.updateCoordinate(index, coordinate));
    },
    removeCoordinate: index => {
        return dispatch(actions.removeCoordinate(index));
    },
    onNameChange: name => {
        return dispatch(actions.setName(name));
    },
    onNewCoordinate: () => {
      return dispatch(actions.addCoordinate({pointX: 0, pointY: 0}));
    },
    clearCoordinates: () => {
        return dispatch(actions.setCoordinates([]));
    },
    onSubmitClick: (id = 0, name, coordinates) => {
        return saveItem(id, name, coordinates.toJS())
          .then(() => dispatch(push(`/?limit=5&offset=1&sortBy=1`)),
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