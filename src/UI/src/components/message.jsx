import React from "react";

class MessageComponent extends React.Component {
    render() {
        if (this.props.message){
        return (<div className={`eight columns ${this.props.message.get("type") === "error" ? "error": "info"} fadein mt-25`}>
                <h5>{this.props.message.get("message")}</h5>
        </div>)
        }
        return <div className="eight columns"/>;
    }
}

export default MessageComponent;