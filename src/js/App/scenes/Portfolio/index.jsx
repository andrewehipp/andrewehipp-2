import React from 'react';
import classNames from 'classnames';
import find from 'lodash/find';


import Browser from './components/Browser';
import Mobile from './components/Mobile';


const Portfolio = ({ projects, slug }) => {
    const project = find(projects, p => p.slug === slug);

    return (
        <div>
            {project.sections.map((section, sectionIndex) => {
                const sectionClassName = classNames(
                    'o-on-top',
                    'u-spacing-far',
                    {
                        'u-pull-into-header': sectionIndex === 0,
                    },
                    {
                        'u-pull-into-footer': sectionIndex + 1 === project.sections.length,
                    },
                );

                const projectAsideClassName = classNames(
                    'o-project__aside',
                    {
                        'u-push-out-of-header': sectionIndex === 0,
                    },
                );

                const sectionId = `section-${sectionIndex}`;

                return (
                    <section key={sectionId} className={sectionClassName}>

                        {/* Add the project header to the first block. Also push it out of the header */}
                        <div className="o-project">
                            <div className={projectAsideClassName}>
                                <div className="o-project__sticky">

                                    {sectionIndex === 0 && (
                                        <header className="u-spacing-normal">
                                            <h1 className="c-heading-page u-spacing-close">{project.title}</h1>
                                            <h3 className="c-heading-subtitle u-color-grey">{project.client}</h3>

                                            <ul className="o-list-inline">
                                                {project.tags.map(tag => (
                                                    <li key={tag}>
                                                        <span className="c-cat">{tag}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </header>
                                    )}

                                    <div className="c-description u-color-grey">
                                        {section.description.map(line => (
                                            <p key={line}>{line}</p>
                                        ))}
                                    </div>

                                    {sectionIndex === 0 && project.link && (
                                        <p><a href={project.link} target="_blank" className="c-btn c-btn--green">
                                            View Live Site
                                        </a></p>
                                    )}

                                </div>
                            </div>
                            <div className="o-project__content">

                                {section.browser && <Browser project={project} browser={section.browser} />}
                                {section.mobile && <Mobile project={project} mobile={section.mobile} overlap={section.browser !== undefined} />}

                            </div>
                        </div>

                    </section>
                );
            })}
        </div>
    );
};


export default Portfolio;
