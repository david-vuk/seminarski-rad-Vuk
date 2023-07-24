import React, { Component } from "react";

class Input extends Component {
    state = {
        text: "",
    };

    onChange(e) {
        const inputValue = e.target.value;
        const maxLength = 100;

        if (inputValue.length > maxLength) {
            this.setState({
                text: inputValue.slice(0, maxLength),
            });
        } else {
            this.setState({ text: inputValue });
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const { text } = this.state;

        if (text.trim() === "") {
            alert("Obavezno unesite poruku!");
            return;
        }
        this.setState({ text: "" });
        this.props.onSendMessage(text);
    }

    render() {
        const { text } = this.state;
        const maxLength = 100;

        return (
            <div className="Input">
                <form onSubmit={(e) => this.onSubmit(e)}>
                    <input
                        onChange={(e) => {
                            this.onChange(e);
                            if (e.target.value.length === maxLength) {
                                alert(
                                    `Maksimalan broj znakova je ${maxLength}.`
                                );
                            }
                        }}
                        value={text}
                        type="text"
                        placeholder="Napišite poruku i pošaljite tipkom Enter ili klikom na gumb Send."
                        maxLength={maxLength}
                    />

                    <button>Send</button>
                </form>
            </div>
        );
    }
}

export default Input;
