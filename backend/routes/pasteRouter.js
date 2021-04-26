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

const express = require('express');
const app = express.Router();
const mongoose = require('mongoose');
const sanitize = require('mongo-sanitize');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const Paste = mongoose.model('Paste');

app.get('/', (req, res) => {
  res.json({
    error: false,
    message: "Welcome on NodeBin API"
  })
})

app.get('/get/:id', (req, res) => {
  const id = req.params.id;

  if (id) {
      const clean = sanitize(id);

      Paste.find({_id: clean}, (err,item) => {
          if (err) {
              return res.json({
                  error: true,
                  text: "File not found or database error."
              })
          }

          if (item && item.length !== 0) {
              return res.json({
                  code: item[0]['_id'],
                  text: item[0]['text']
              })
          }

          res.json({
              error: true,
              text: "Paste not found. Please try again."
          })
      });

  } else {
      res.json({
          error: true,
          message: "Invalid Request"
      })
  }

})

app.post('/add', jsonParser, (req, res) => {
  const body = req.body;
  const text = body["text"];

  if (text) {
     const clean = sanitize(text);

     return new Paste({text: clean}).save((error,item) => {
         if (error) {
             console.error(error);
             return res.json({error:true,message:"Internal error, please try again later."})
         }

         res.json({
             error: false,
             text: text,
             id: item['_id']
         })
     })
  }

  res.json({
    error: true,
    message: "Invalid request"
  })
})

module.exports = app;