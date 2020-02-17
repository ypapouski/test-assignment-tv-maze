import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

import ShowDetailsStore from 'stores/show/ShowDetailsStore';

import * as styles from 'css/show-details.less';

/**
 * The component shows details of a show
 */
@observer
class ShowDetails extends Component {

    /** The component properties */
    static propTypes = {
        store: PropTypes.instanceOf(ShowDetailsStore)
    };

    /**
     * @see Component#componentWillMount()
     */
    componentWillMount() {
        const { store } = this.props;
        store.fetchShowDetails(1);
        store.fetchShowEpisodes(1);
    }

    /**
     * Render show's episodes
     * @param {Object} showEpisodes - show's episodes
     */
    renderEpisodes(showEpisodes) {
        return Object.entries(
            showEpisodes.reduce((acc, {name, season, number, image}) => {
                var episodes = acc[season];
                !episodes && (acc[season] = episodes = []);
                episodes.push({name, number, image});
                return acc;
            }, {})
        ).map(([season, episodes]) =>
            <div className="rtl-show-season" key={season}>
                <h2>Season {season}</h2>
                <ul>
                {
                    episodes.map(({name, image, number}) =>
                        <li key={`${season}_${number}`}>
                            <img src={image.medium} />
                            <Link to={`/show-episode/1/${season}/${number}`}>{name}</Link>
                        </li>)
                }
                </ul>
            </div>
        );
    }

    /**
     * @see Component#render()
     */
    render() {
        const { store: { ShowDetails, ShowEpisodes }} = this.props;
        if (Object.keys(ShowDetails).length) {
            const { name, image, summary} = ShowDetails;
            return (
                <div className="rtl-show">
                    <img src={image.original} />
                    <h1>{name}</h1>
                    <p dangerouslySetInnerHTML={{__html: summary}} />
                    <h2>Episodes</h2>
                    { this.renderEpisodes(ShowEpisodes) }
                </div>
            );
        }
        return null;
    }
}

export default ShowDetails;
