import React from "react";
import translations from "../configuration/translations";
import MessageComponent from "./message";
import {Link} from 'react-router-dom';

const itemsPerPageSelection = [5, 10, 20, 50];
const renderForm = (props) => {
    return <form>
                <div className="row">
                    <div className="six columns">
                        <label>{translations.listName}</label>
                        <input className="u-full-width" onChange={(ev) => props.onNameChange(ev.target.value)} value={props.name} type="text" placeholder={translations.listName}/>
                    </div>
                </div>
                <div className="row">
                    <div className="one column">
                        <label>{translations.coordinates}</label>
                    </div>
                    <div className="five columns">
                        <button onClick={props.clearCoordinates} className="button u-pull-right">{translations.clear}</button>
                        <button className="button u-pull-right" onClick={() => document.getElementById('file').click()}>{translations.loadFromFile}</button>
                        <input type="file" id="file" onChange={(file) => props.loadFromFile(file)} style={{display:"none"}}/>
                        <button onClick={() => props.onNewCoordinate(props.limit, props.offset)} className="button u-pull-right">{translations.add}</button>
                    </div>
                    <div className="six columns">
                        <label>{translations.squares}</label>
                    </div>
                </div>
            <div className="row">
                <div className="six columns">
                <div className="small-height">
                    {props.visibleCoordinates.map((coordinate, key) =>
                    <div key={key} className="row">
                        <div className="four columns">
                            <input className="u-full-width" type="number" value={coordinate.pointX} placeholder="0"
                            onChange={(val) => props.onCoordinateChange(key, {pointX: val.target.value, pointY: coordinate.pointY}, props.limit, props.offset)}/>
                        </div>
                        <div className="four columns">
                            <input className="u-full-width" type="number"
                            value={coordinate.pointY} placeholder="0"
                            onChange={(val) => props.onCoordinateChange(key, {pointX: coordinate.pointX, pointY: val.target.value}, props.limit, props.offset)}/>
                        </div>
                        <div className="one column">
                            <button onClick={() => props.removeCoordinate(key, props.limit, props.offset)} className="button button-primary">-</button>
                        </div>
                    </div>)}
                    </div>
                    <div className="row">
                        <div className="two columns">
                            {props.prevLink ? <button onClick={() => props.onPrevLinkClick(props.id, props.limit, props.offset)}>{`<`}</button> : <button className="disabled">{`<`}</button>}
                        </div>
                        <div className="four columns">
                            {props.nextLink ? <button onClick={() => props.onNextLinkClick(props.id, props.limit, props.offset)}>{`>`}</button> : <button className="disabled">{`>`}</button>}
                        </div>
                        <div className="four columns">
                            <div className="u-pull-right">
                                <select value={props.limit} onChange={(val) => props.onLimitChange(val.target.value)}>
                                    {itemsPerPageSelection.map((item, key) => <option key={key} value={item}>{item} items per page</option>)}
                                </select>
                            </div>
                         </div>
                    </div>
                </div>
                <div className="six columns">
                    <div className="small-height">
                    {props.squares.map((square, key) =>
                        <div key={key} className="row">
                            <div className="three columns">
                                <span className="button disabled">
                                    {square.cooOne.pointX},{square.cooOne.pointY}
                                </span>
                            </div>
                            <div className="three columns">
                                <span className="button disabled">
                                    {square.cooTwo.pointX},{square.cooTwo.pointY}
                                </span>
                            </div>
                            <div className="three columns">
                                <span className="button disabled">
                                    {square.cooThree.pointX},{square.cooThree.pointY}
                                </span>
                            </div>
                            <div className="three columns">
                                <span className="button disabled">
                                    {square.cooFour.pointX},{square.cooFour.pointY}
                                </span>
                            </div>
                        </div>
                    )}
                    </div>
                </div>
            </div>
            <div className="row">
                <input
                    className="button-primary"
                    onClick={() => props.onSubmitClick(props.id, props.name, props.coordinates)}
                    type="submit"
                    value="Submit"/>
                {props.exportUrl ? <a className="button" href={props.exportUrl} download="coordinates.txt">Export</a>: <button className="button disabled">Export</button>}
            </div>
            </form>;
}

class NewList extends React.Component {
    componentDidMount() {
        this.props.getData(this.props.id, this.props.limit, this.props.offset);
    }
    render() {
        return (
            <div className="container">
            <div className="row">
                <div className="two columns"><h5>{this.props.title}</h5></div>
                <MessageComponent message={this.props.message}/>
                <div className="two columns u-pull-right">
                    <Link className="button button-primary" to="/">{translations.returnToList}</Link>
                </div>
            </div>
                {this.props.renderForm ? renderForm(this.props): null}            
            </div>
        );
    }
}

export default NewList;