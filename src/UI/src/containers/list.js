import Component from "../components/list";
import {ListReducer, actions} from "../reducers/list";
import React from 'react';
import {connect} from 'react-redux';
import Immutable from "immutable";
import {getAllItems, deleteItem} from "../api/coordinate-list-service";
import queryStringFromHash from "../services/query-string-parser";
import {push} from 'react-router-redux';
import {translations} from "../configuration/translations";

//cannot access some parts of state for some reason, TODO: check why
let total = 0;
const getRouteWithDefaultValues = (state) => {
    let result = queryStringFromHash(state);
    result.limit = result.limit || 5;
    result.offset = result.offset || 0;
    result.sortBy = result.sortBy || "id";
    return result;
}
const loadItems = (dispatch, limit, offset, sortBy) => {
      dispatch(actions.setItems([], 0));
      return getAllItems(limit, offset, sortBy)
        .then(items => {
          total = items.totalCount;
          return dispatch(actions.setItems(items.items, items.totalCount));
        },
        (resp) => {
          return dispatch(actions.setListMessage({type: "error", message: translations.generalError}));
        });
}
const getPrevLink = (dispatch, state) => {
      const queryStr = getRouteWithDefaultValues(state);
      const newOffset = queryStr.offset - queryStr.limit;
      return (newOffset) >= 0 ?
        () => {
          dispatch(push(`/?limit=${queryStr.limit}&offset=${newOffset}&sortBy=${queryStr.sortBy}`));
          return loadItems(dispatch, queryStr.limit, newOffset, queryStr.sortBy);
         } : null;
}
const getNextLink = (dispatch, state) => {
      const queryStr = getRouteWithDefaultValues(state);
      const newOffset = queryStr.offset + queryStr.limit;
      return (newOffset) <= total ?
        () => {
          dispatch(push(`/?limit=${queryStr.limit}&offset=${newOffset}&sortBy=${queryStr.sortBy}`))
          return loadItems(dispatch, queryStr.limit, newOffset, queryStr.sortBy);
         } : null;
}
const mapDispatchToProps = (dispatch, state) => {
  return {
    getData: () => {
      const queryStr = getRouteWithDefaultValues(state);
      return loadItems(dispatch, queryStr.limit, queryStr.offset, queryStr.sortBy);
    },
    onRemoveClick: (id, key) => {
      return deleteItem(id).then(()=> dispatch(actions.deleteItem(key)));
    },
    onItemsInPageChange: (newValue) => {
      const queryStr = getRouteWithDefaultValues(state);
      loadItems(dispatch, newValue, 0, queryStr.sortBy);
      return dispatch(push(`/?limit=${newValue}&offset=${0}&sortBy=${queryStr.sortBy}`));
    },
    onSortByChange: (newValue) => {
      const queryStr = getRouteWithDefaultValues(state);
      loadItems(dispatch, queryStr.limit, 0, newValue);
      return dispatch(push(`/?limit=${queryStr.limit}&offset=${0}&sortBy=${newValue}`));
    },
    prevLink: getPrevLink(dispatch, state),
    nextLink: getNextLink(dispatch, state)
  }
}
const mapStateToProps = (state) => {
  const queryStr = getRouteWithDefaultValues(state.router);
  return {
    items: state.list.get("lists"),
    itemsPerPage: queryStr.limit,
    message: state.list.get("message"),
    currentSortBy: queryStr.sortBy
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(Component);