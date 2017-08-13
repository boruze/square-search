import React from "react";

class MessageComponent extends React.Component {
    render() {
        if (this.props.message){
        return (<div className={`eight columns ${this.props.type === "error" ? "error": "info"} fadein mt-25`}>
                <h5>{this.props.message}</h5>
        </div>)
        }
        return <div className="eight columns"/>;
    }
}

export default MessageComponent;