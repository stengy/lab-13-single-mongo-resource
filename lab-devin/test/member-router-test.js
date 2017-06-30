'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

const expect = require('expect');
const superagent = require('superagent');


const clearDb = require('./lib/clear-db.js');
const server = require('../lib/server.js');
const Team = require('../model/team.js');
const mockTeam = require('./lib/mock-team.js');
