import React from 'react';
import Router from 'preact-router';
import {
    createHashHistory,
} from 'history';


import projects from '../../data/projects';

import Home from '../../scenes/Home';
import Portfolio from '../../scenes/Portfolio';


const handleRoute = (props) => {
    if (props.url !== props.previous) {
        window.scrollTo(0, 0);
    }
};


export default class App extends React.Component {
    componentDidUpdate() {
        window.scrollTop = 0;
    }

    render() {
        return (
            <Router onChange={handleRoute} history={createHashHistory()}>
                <Home path="/" projects={projects} />
                <Portfolio path="/project/:slug" projects={projects} />
            </Router>
        );
    }
}
