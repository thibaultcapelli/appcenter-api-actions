"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchApi = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const BASE_URI = 'https://api.appcenter.ms/v0.1/apps';
const fetchApi = (path, options, apiToken) => {
    return (0, node_fetch_1.default)(`${BASE_URI}/${path}`, {
        headers: {
            'accept': 'application/json',
            'Content-type': 'application/json; charset=UTF-8',
            'X-API-Token': apiToken
        },
        ...options
    });
};
exports.fetchApi = fetchApi;
