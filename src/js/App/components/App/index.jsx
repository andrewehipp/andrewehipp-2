import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';


import projects from '../../data/projects';

import Home from '../../scenes/Home';
import Portfolio from '../../scenes/Portfolio';


// const handleRoute = (props) => {
//     if (props.url !== props.previous) {
//         window.scrollTo(0, 0);
//     }
// };


export default class App extends React.Component {
    componentDidUpdate() {
        window.scrollTop = 0;
    }

    render() {
        return (
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <div>
                    <Route exact path="/" component={props => <Home projects={projects} {...props} />} />
                    <Route exact path="/project/:slug" component={props => <Portfolio projects={projects} {...props} />} />
                </div>
            </BrowserRouter>
        );
    }
}
