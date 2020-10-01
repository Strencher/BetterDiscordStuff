import {require, getUrl} from "./utils.js";
(async () => {
    window.require = require;
    window.discordInfo = JSON.parse(await getUrl('https://discord.com/api/guilds/458997239738793984/widget.json'));
    const app = await require('./index.jsx');
    ReactDOM.render(React.createElement(app, {}), document.querySelector('.app'))
})()