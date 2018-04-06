import React from 'react';
import classNames from 'classnames';


import {
    cloudinaryAsset,
    cloudinaryVideoAsset,
} from 'App/helpers';


const imgParams = ['c_scale', 'q_70', 'dpr_2.0', 'w_210'];
const desktopVideoParams = ['ac_none', 'vc_auto'];


export default class Mobile extends React.Component {
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
            mobile,
            overlap,
        } = this.props;

        const themeColorStyle = {
            backgroundColor: project.theme,
        };

        const mobileClassName = classNames(
            'c-mobile',
            {
                'c-mobile--overlap': overlap,
            },
            'u-animate',
            {
                'is-animating': this.state.isLoaded || mobile.type === 'video',
            },
        );

        return (
            <div className={mobileClassName}>
                <div className="c-mobile__inner">
                    <div className="o-aspect o-aspect--iphone6 u-spacing-flush" style={themeColorStyle}>
                        {mobile.type !== 'video' ? (
                            <picture>
                                <source srcSet={cloudinaryAsset(mobile.source.replace('.jpg', '.webp'), imgParams)} media="(min-width: 768px)" type="image/webp" />
                                <img src={cloudinaryAsset(mobile.source, imgParams)} alt="" className="c-mobile__img u-img-full" onLoad={this.loaded} />
                            </picture>
                        ) : (
                            <video autoPlay loop muted playsinline>
                                <source src={cloudinaryVideoAsset(mobile.source.replace('mp4', 'webm'), desktopVideoParams)} type="video/webm" />
                                <source src={cloudinaryVideoAsset(mobile.source, desktopVideoParams)} type="video/mp4" />
                            </video>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
