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
import {useHistory} from 'react-router-dom';

let backend = "http://localhost:3030";

if (process.env.BACKEND) {
    backend = process.env.BACKEND;
}

let usedText = "";
let history = null;

function Home() {
    history = useHistory();
    return (
        <div className="editor">
            <button className="save" onClick={handleClick}>Save</button>
            <textarea name="textarea" onKeyDown={handleSave} onChange={handleChange} placeholder="Write Here" spellCheck="false"/>
        </div>
    );
}

function handleSave(e) {
    if (e.ctrlKey && e.which === 83) {
        e.preventDefault();

        save();
    }
}

function handleChange(e) {
    usedText = e.target.value;
}

function handleClick(e) {
    e.preventDefault()

    save();
}

function save() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("text", usedText);

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch(backend + "/add", requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result['error']) {
                return console.log("Internal error occurred. Please try again");
            }

            if (result['id']) {
                console.log("Redirecting to the new page..")
                return history.push("/" + result['id']);
            }
        })
        .catch(error => console.log('error', error));
}

export default Home;