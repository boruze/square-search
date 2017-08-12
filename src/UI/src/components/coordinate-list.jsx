import React from "react";
import translations from "../configuration/translations";
import { Link } from 'react-router-dom';

const createList = (items, onRemoveClick) => {
    return <ul>{items.toArray().map((item, key) => <li key={key}><Link to={`/${item.get("id")}`}>{item.get("name")}</Link><span onClick={() => onRemoveClick(item.get("id"), key)}>-</span></li>)}</ul>;
}
const itemsPerPageSelection = [5, 10, 20, 50];
const sortBySelection = [{name: "default", value: 1},{name: "name", value: 2}];

class CoordinateList extends React.Component {
    componentDidMount() {
        this.props.getData();
    }
    render() {
        if (this.props.items.size === 0){
            return <div><Link to="/0">{translations.addList}</Link></div>
        }

        return (
            <div>
                <div>
                    <span>Items per page</span>
                    <select value={this.props.itemsPerPage} onChange={(val) => this.props.onItemsInPageChange(val.target.value)}>
                        {itemsPerPageSelection.map((item, key)=> <option key={key} value={item}>{item}</option>)}
                    </select>
                    <span>Sort by</span>
                    <select value={this.props.currentSortBy} onChange={(val) => this.props.onSortByChange(val.target.value)}>
                        {sortBySelection.map((item) => <option key={item.value} value={item.value}>{item.name}</option>)}
                    </select>
                    </div>
                <div><Link to="/0">{translations.addList}</Link>
                    {createList(this.props.items, this.props.onRemoveClick)}
                </div>
                <div>
                    {this.props.getPrevLink ? <span onClick={this.props.getPrevLink}>{translations.prevPage}</span> : <span>{translations.prevPage}</span>}
                    {this.props.getNextLink ? <span onClick={this.props.getNextLink}>{translations.nextPage}></span> : <span>{translations.nextPage}</span>}
                </div>
            </div>);
    }
}

export default CoordinateList;