import React from 'react';

import ProjectList from './components/ProjectListing';

const projectsConfig = [
    {
        slug: 'hotd',
        large: true,
    },
    {
        slug: 'wcc-underground',
        bottom: true,
    },
    {
        slug: 'slotix',
    },
    {
        slug: 'wardragons',
    },
    {
        slug: 'shadow-and-fortune',
    },
    {
        slug: 'imperial',
    },
    {
        slug: 'ulol',
        large: true,
    },
    {
        slug: 'starcraft2-co-op-missions',
        large: true,
    },
    {
        slug: 'bhsb',
    },
    {
        slug: 'year-in-review',
    },
    {
        slug: 'riunite',
    },
    {
        slug: 'chappelle-radio-city',
    },
    {
        slug: 'preseason-update-2017',
        large: true,
        gap: true,
    },
];


const Home = ({ projects, ...props }) => (
    <section className="o-on-top u-spacing-far u-pull-into-footer">
        <div className="o-project">
            <div className="o-project__aside">
                <div className="o-project__sticky">

                    <h1 className="c-heading-title">Director of Front End Development at Haven Agency in Ontario, Calif.</h1>

                    <div className="u-spacing-far u-color-grey">
                        <p>Eight years as a Front End Developer building highly optimized, responsive, localized websites.</p>
                        <p>Currently building sites with <strong>scss</strong>, <strong>ITCSS</strong>, <strong>es6</strong>, <strong>babel</strong>, <strong>webpack</strong>, and <strong>React.js/Preact.js</strong>.</p>
                        <p>Previously six years as a Web Designer with a B.F.A in Graphic Design.</p>
                    </div>

                </div>

            </div>
            <div className="o-project__content">

                <ProjectList
                    className="u-pull-into-header"
                    projects={projects}
                    projectsConfig={projectsConfig}
                    {...props}
                />

            </div>
        </div>
    </section>
);


export default Home;
