import NewList from "../components/new-list";
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
    name: state.edit.get("name") || "",
    errors: state.edit.get("errors") || Immutable.fromJS([])
  };
}
const mapApiErrors = (response) => {
  let errors = []
  if (response.status === 400) {
    errors = Object.keys(response.response.body).map(key => response.response.body[key]);
  } else {
    errors.push(translations.generalError);
  }
  return errors;
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
            });
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
          .then(() => dispatch(push(`/?limit=5&offset=1&sortBy=1`)), (resp) => dispatch(actions.setErrors(mapApiErrors(resp))));
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
                dispatch(actions.setErrors(["Duplicate coordinates were removed"]));
              }
          }
          catch(err) {
              dispatch(actions.setErrors(["Could not parse file"]));
          }
        });
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(NewList);