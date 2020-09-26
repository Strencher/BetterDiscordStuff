import {require} from "./utils.js";
(async () => {
    window.require = require;
    const app = await require('./index.jsx');
    ReactDOM.render(React.createElement(app, {}), document.querySelector('.app'))
})()