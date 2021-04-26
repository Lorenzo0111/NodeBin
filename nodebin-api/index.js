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

const fetch = require('node-fetch');
const {Headers} = fetch;
const { URLSearchParams } = require('url');

/**
 * Class that represents a nodebin backend server
 */
class NodebinServer {
    url = null;

    /**
     * @param {string} url Domain of the nodebin server
     */
    constructor(url) {
        this.url = url;
    }

    /**
     * Retrieve a paste
     * @param {string} code Code of the paste
     * @return Promise
     */
    get(code) {
        return fetch(this.url + "/get/" + code)
            .then(res => res.json());
    }

    /**
     * Add a paste
     * @param {string} text Text of the paste
     * @return Promise
     */
    add(text) {
        const meta = {
            "Content-Type": "application/x-www-form-urlencoded"
        }
        const myHeaders = new Headers(meta);

        const urlencoded = new URLSearchParams();
        urlencoded.append("text", text);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        return fetch(this.url + "/add", requestOptions).then(res => res.json());
    }
}

module.exports = NodebinServer;