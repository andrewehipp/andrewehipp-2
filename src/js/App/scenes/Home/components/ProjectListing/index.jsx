import React from 'react';
import classNames from 'classnames';
import find from 'lodash/find';
import { route } from 'preact-router';


import Card from 'App/components/Card';


require('smoothscroll-polyfill').polyfill();


export default class ProjectList extends React.Component {
    constructor() {
        super();

        this.state = {
            isLeaving: false,
            leavingIndex: 0,
        };
    }
    render() {
        const {
            projects,
            projectsConfig,
            className,
        } = this.props;

        const projectListClassName = classNames(
            'o-list-unstyled',
            'o-portfolio',
            className,
        );

        const startTime = new Date();

        return (
            <ul className={projectListClassName}>
                {projectsConfig.map((projectConfig, projectConfigIndex) => {
                    const project = find(projects, p => projectConfig.slug === p.slug);

                    if (project === undefined) {
                        console.warn(`No project in 'projects' matches ${projectConfig.slug}`);
                        return null;
                    }

                    const portfolioItemClassNames = classNames(
                        'o-portfolio__item',
                        {
                            [`o-portfolio__item--${projectConfigIndex + 1}`]: true,
                        },
                    );

                    const shrinkingButton = classNames(
                        'c-shrinking-button',
                        {
                            'is-shrinking': this.state.isLeaving,
                        },
                    );

                    const delay = projectConfigIndex * 60;

                    const handleClick = () => {
                        window.scroll({
                            top: 0,
                            left: 0,
                            behavior: 'smooth',
                        });

                        this.setState({
                            isLeaving: true,
                            leavingIndex: projectConfigIndex,
                        }, () => {
                            window.setTimeout(() => {
                                route(`project/${project.slug}`);
                            }, projectsConfig.length * 60);
                        });
                    };

                    const leaveDelay = Math.abs(projectConfigIndex - this.state.leavingIndex);

                    return (
                        <li key={project.slug} className={portfolioItemClassNames}>
                            <button
                                className={shrinkingButton}
                                onClick={handleClick}
                                style={{
                                    animationDelay: `${leaveDelay * 60}ms`,
                                }}
                            >
                                <Card
                                    project={project}
                                    large={projectConfig.large}
                                    startTime={startTime}
                                    delay={delay}
                                />
                            </button>
                        </li>
                    );
                })}
            </ul>
        );
    }
}
