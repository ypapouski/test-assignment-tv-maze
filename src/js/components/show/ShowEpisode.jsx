import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import ShowEpisodeStore from 'stores/show/ShowEpisodeStore';

import * as styles from 'css/show-episode.less';

/**
 * The component shows details of a show's episode
 */
@observer
class ShowEpisode extends Component {

    /** The component properties */
    static propTypes = {
        store: PropTypes.instanceOf(ShowEpisodeStore)
    };

    /**
     * @see Component#componentWillMount()
     */
    componentWillMount() {
        const { params: { showId, seasonId, episodeId }, store } = this.props;
        store.fetchShowEpisode(showId, seasonId, episodeId);
    }

    /**
     * @see Component#render()
     */
    render() {
        const { store: { ShowEpisodes }, params: { showId, seasonId, episodeId }} = this.props;
        const showEpisode = ShowEpisodes[`${showId}_${seasonId}_${episodeId}`];
        if (showEpisode) {
            const { name, image, summary} = showEpisode;
            return (
                <div className="rtl-episode">
                    <img src={image.original} />
                    <h1>{name}</h1>
                    <p dangerouslySetInnerHTML={{__html: summary}} />
                </div>
            );
        }
        return null;
    }
}

export default ShowEpisode;
