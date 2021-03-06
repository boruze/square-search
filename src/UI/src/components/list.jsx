import React from "react";
import translations from "../configuration/translations";
import {Link} from 'react-router-dom';
import MessageComponent from "./message";

const itemsPerPageSelection = [5, 10, 20, 50];
const sortBySelection = [{name: "default", value: 1},{name: "name", value: 2}];
const getListItems = (props) => {
    return <div className="row">
        <div className="medium-height">
            <table className="u-full-width">
                <thead>
                    <tr>
                    <th>{translations.id}</th>
                    <th>{translations.name}</th>
                    <th></th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.items.toArray().map((item, key) =>
                    <tr key={key}>
                        <td>{item.get("id")}</td>
                        <td>{item.get("name")}</td>
                        <td><Link className="button" to={`/${item.get("id")}`}>{translations.edit}</Link></td>
                        <td><button className="button" onClick={() => props.onRemoveClick(item.get("id"), key)}>{translations.delete}</button></td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    </div>
};
const getPagingAndSorting = (props) => {
    return <div className="row mt-10">
                <div className="one column">
                    {props.prevLink ? <button onClick={props.onPrevLinkClick}>{`<`}</button> : <button className="disabled">{`<`}</button>}
                </div>
                <div className="one column">
                    {props.nextLink ? <button onClick={props.onNextLinkClick}>{`>`}</button> : <button className="disabled">{`>`}</button>}
                </div>
                <div className="three columns u-pull-right">
                    <select value={props.currentLimit} className="u-pull-right" onChange={(val) =>  props.onItemsInPageChange(val.target.value)}>
                        {itemsPerPageSelection.map((item, key) => <option key={key} value={item}>{item} items per page</option>)}
                    </select>
                </div>
                <div className="two columns u-pull-right">
                    <select value={props.currentSortBy} onChange={(val) => props.onSortByChange(val.target.value)} className="u-pull-right">
                        <option value="id">Sort by Id</option>
                        <option value="name">Sort by Name</option>
                    </select>
                </div>
            </div>;
};
class CoordinateList extends React.Component {
    componentDidMount() {
        this.props.getData();
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="one column"><h5>{translations.listTitle}</h5></div>
                    <MessageComponent message={this.props.message}/>
                    <div className="three columns u-pull-right"><Link className="button button-primary" to="/0">{translations.addList}</Link></div>
                </div>
                {this.props.items.size ? getListItems(this.props): null}
                {this.props.items.size ? getPagingAndSorting(this.props): null}
            </div>);
    }
}

export default CoordinateList;