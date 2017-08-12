import CoordinateList from "../components/coordinate-list";
import {ListReducer, actions} from "../reducers/list";
import React from 'react';
import { connect } from 'react-redux';
import Immutable from "immutable";
import {getAllItems, deleteItem} from "../api/coordinate-list-service";
import qs from 'qs';
import {push} from 'react-router-redux';

//cannot access some parts of state for some reason, TODO: check why
let total = 0;
const mapStateToProps = (state) => {
  const queryStr = getParsedQueryString(state.router);
  return {
    items: state.list.get("lists"),
    itemsPerPage: queryStr.limit,
    currentSortBy: queryStr.sortBy,
    squareCount: getSquaresInTheList(state.list)
  };
}

const getParsedQueryString = (state) => {
    let queryString = state.location.search;
    queryString = queryString.substring(1, queryString.length);
    const result = qs.parse(queryString);
    result.limit = result.limit || 5;
    result.offset = result.offset || 0;
    result.sortBy = result.sortBy || 1;
    return result;
}

const loadItems = (dispatch, limit, offset, sortBy) => {
      dispatch(actions.setItems([], 0));
      return getAllItems(limit, offset, sortBy)
        .then(items => {
          total = items.totalCount;
          return dispatch(actions.setItems(items.items, items.totalCount))
        });
}

const getPrevLink = (dispatch, state) => {
      const queryStr = getParsedQueryString(state);
      const newOffset = queryStr.offset - queryStr.limit;
      return (newOffset) >= 0 ?
        () => {
          dispatch(push(`/?limit=${queryStr.limit}&offset=${newOffset}&sortBy=${queryStr.sortBy}`));
          return loadItems(dispatch, queryStr.limit, newOffset, queryStr.sortBy);
         } : null;
}

const getSquaresInTheList = (state) => {
  let coordinate = state.get("lists").toJSON();
}

const calculateDistance = (pointOne, pointTwo) => {
  return Math.sqrt(Math.pow((pointOne.pointX - pointTwo.pointX), 2) + Math.pow((pointOne.pointY - pointTwo.pointY), 2));
}

const getNextLink = (dispatch, state) => {
      const queryStr = getParsedQueryString(state);
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
      const queryStr = getParsedQueryString(state);
      return loadItems(dispatch, queryStr.limit, queryStr.offset, queryStr.sortBy);
    },
    onRemoveClick: (id, key) => {
      return deleteItem(id).then(()=> dispatch(actions.deleteItem(key)));
    },
    onItemsInPageChange: (newValue) => {
      const queryStr = getParsedQueryString(state);
      loadItems(dispatch, newValue, 0, queryStr.sortBy);
      return dispatch(push(`/?limit=${newValue}&offset=${0}&sortBy=${queryStr.sortBy}`));
    },
    onSortByChange: (newValue) => {
      const queryStr = getParsedQueryString(state);
      loadItems(dispatch, queryStr.limit, 0, newValue);
      return dispatch(push(`/?limit=${queryStr.limit}&offset=${0}&sortBy=${newValue}`));
    },
    prevLink: getPrevLink(dispatch, state),
    nextLink: getNextLink(dispatch, state)
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(CoordinateList);