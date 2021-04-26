/*
 * This file is part of NodeBin, licensed under the MIT License.
 *
 * Copyright (c) Lorenzo0111
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import nightOwl from "../themes/nightOwl";
import config from "../config.json";

let backend = "http://localhost:3030";

if (config && config.backend) {
    backend = config.backend;
}

if (process.env.BACKEND) {
    backend = process.env.BACKEND;
}

class Paste extends React.Component {
    constructor(props) {
        super(props);
        const code = props.match.params.code;
        this.state = {
            code: code,
            error: null,
            isLoaded: false,
            text: null
        };
    }

    componentDidMount() {
        fetch(backend + "/get/" + this.state.code)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        text: result.text
                    });
                },

                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, text } = this.state;
        if (error) {
            return <div className="result">Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div className="result">Loading...</div>;
        } else {
            return (
                <div className="result">
                    <SyntaxHighlighter language="auto" style={nightOwl}>
                        {text}
                    </SyntaxHighlighter>
                </div>
            );
        }
    }
}

export default Paste;