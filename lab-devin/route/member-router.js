'use strict';

const jsonParser = require('body-parser');
const {Router} = require('express');
const Member = require('../model/member.js');

const memberRouter = module.exports = new Router();
