"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NESTIA_CONFIG = {
    input: {
        include: ['src/controllers'],
        exclude: ['src/**/*.internal.ts'],
    },
    output: 'src/api',
    e2e: 'test',
    json: true,
    primitive: false,
    swagger: {
        output: 'packages/api/swagger.json',
        info: {
            version: '0.0.1',
            title: 'Server Title',
            description: 'Service Description',
        },
        servers: [{ url: 'https://localhost:4000', description: 'Local Server' }],
        security: {
            bearer: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header',
            },
        },
    },
};
exports.default = NESTIA_CONFIG;
