import React from 'react';
import classNames from 'classnames';


import {
    cloudinaryAsset,
} from 'App/helpers';


const desktopImgParams = ['c_scale', 'q_70', 'dpr_2.0', 'w_723'];
const mobileImgParams = ['c_scale', 'q_70', 'dpr_2.0', 'w_768'];
const desktopVideoParams = ['ac_none', 'vc_auto'];


export default class Browser extends React.Component {
    constructor() {
        super();

        this.state = {
            isLoaded: false,
        };

        this.loaded = () => {
            window.requestAnimationFrame(() => {
                this.setState({
                    isLoaded: true,
                });
            });
        };
    }

    render() {
        const {
            project,
            browser,
        } = this.props;

        const aspectStyles = {
            backgroundColor: project.theme,
            paddingTop: `${(browser.height / browser.width) * 100}%`,
        };

        const browserClassName = classNames(
            'c-browser',
            'u-animate',
            {
                'is-animating': this.state.isLoaded || browser.type === 'video',
            },
        );

        return (
            <div className={browserClassName}>
                <span className="c-browser__title">{project.title}</span>

                {browser.type !== 'video' ? (
                    <div className="o-aspect u-spacing-flush" style={aspectStyles}>
                        <picture>
                            <source srcSet={cloudinaryAsset(browser.source.replace('.jpg', '.webp'), desktopImgParams)} media="(min-width: 768px)" type="image/webp" />
                            <source srcSet={cloudinaryAsset(browser.source, desktopImgParams)} media="(min-width: 768px)" type="image/jpeg" />
                            <source srcSet={cloudinaryAsset(browser.source.replace('.jpg', '.webp'), mobileImgParams)} type="image/webp" />
                            <img src={cloudinaryAsset(browser.source, mobileImgParams)} alt="" className="c-browser__img u-img-full" onLoad={this.loaded} />
                        </picture>
                    </div>
                ) : (
                    <div className="o-aspect o-aspect--1440x900 u-spacing-flush" style={aspectStyles}>
                        <video autoPlay loop muted playsinline>
                            <source src={cloudinaryAsset(browser.source.replace('mp4', 'webm'), desktopVideoParams)} type="video/webm" />
                            <source src={cloudinaryAsset(browser.source, desktopVideoParams)} type="video/mp4" />
                        </video>
                    </div>
                )}
            </div>
        );
    }
}
