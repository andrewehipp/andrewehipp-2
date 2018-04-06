import React from 'react';
import classNames from 'classnames';
import scrollMonitor from 'scrollmonitor';

import {
    cloudinaryAsset,
} from '../../helpers';


const thumbnailDesktopLarge = ['c_scale', 'q_70', 'dpr_2.0', 'w_479'];
const thumbnailDesktopSmall = ['c_scale', 'q_70', 'dpr_2.0', 'w_234'];
const thumbnailMobile = ['c_scale', 'q_70', 'dpr_2.0', 'w_359'];


export default class Card extends React.Component {
    componentDidMount() {
        this.state = {
            isLoaded: false,
            isInView: false,
        };

        // Create a watcher to load the images when in view.
        this.elementWatcher = scrollMonitor.create(this.node, 50);

        this.elementWatcher.enterViewport(() => {
            this.setState({
                isInView: true,
            });
        });
    }

    componentWillUnmount() {
        this.elementWatcher.destroy();
    }

    loaded() {
        const {
            startTime,
            delay,
        } = this.props;

        // Update the delay by taking into account how long it's been since we
        // started loading the page. Prevent stagered loading from making it
        // seem longer.
        const timer = Math.max(0, delay - (new Date() - startTime));

        // After waiting a tick apply the targetClass to the target
        window.setTimeout(() => {
            window.requestAnimationFrame(() => {
                this.setState({
                    isLoaded: true,
                });
            });
        }, timer);
    }

    render() {
        const {
            project,
            large,
        } = this.props;

        const cardClassName = classNames(
            'c-card',
            'u-animate',
            {
                'is-animating': this.state.isLoaded && this.state.isInView,
            },
        );

        const thumbnailDesktop = large ? thumbnailDesktopLarge : thumbnailDesktopSmall;

        const handleOnLoad = () => {
            this.loaded();
        };

        return (
            <article
                ref={(node) => { this.node = node; }}
                id={project.slug}
                className={cardClassName}
            >
                <div className="o-aspect o-aspect--16x9 u-spacing-flush">
                    <picture>
                        <source srcSet={cloudinaryAsset(project.thumbnail.replace('.jpg', '.webp'), thumbnailDesktop)} media="(min-width: 768px)" type="image/webp" />
                        <source srcSet={cloudinaryAsset(project.thumbnail, thumbnailDesktop)} media="(min-width: 768px)" type="image/jpeg" />
                        <source srcSet={cloudinaryAsset(project.thumbnail.replace('.jpg', '.webp'), thumbnailMobile)} type="image/webp" />
                        <img src={cloudinaryAsset(project.thumbnail, thumbnailMobile)} alt="" className="c-card__img u-img-full js-load-image" onLoad={handleOnLoad} />
                    </picture>
                </div>
                <header className="c-card__header">
                    <h3 className="c-card__title">{project.title}</h3>
                    <h5 className="c-card__client">{project.client}</h5>
                </header>
            </article>
        );
    }
}
