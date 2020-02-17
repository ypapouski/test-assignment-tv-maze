import { observable, action, extendObservable } from 'mobx';
import Store from 'stores/Store';
import endpoints from 'transport/endpoints';

/**
 * The show episode store
 */
class ShowEpisodeStore extends Store {

    /** The show's episodes */
    @observable
    showEpisodes = {};

    /**
     * Get a show's episodes
     * @returns {Number} show's episodes
     */
    get ShowEpisodes() {
        return this.showEpisodes;
    }

    /**
     * Set a show's episode
     * @param {Object} showEpisode - show's episode to be set
     * @param {Array} showEpisodeParams - show's episode params
     */
    @action
    setShowEpisode = (showEpisode, showEpisodeParams) => {
        this.showEpisodes[showEpisodeParams.join('_')] = showEpisode;
    };

    /**
     * Fetch a show's episode
     * @param {Number} showId - a show identifier
     * @returns {Promise} a call api promise
     */
    fetchShowEpisode(showId, seasonId, episodeId) {
        const showEpisodeParams = [showId, seasonId, episodeId];
        return this.Transport.callApi(endpoints.GET_SHOW_EPISODE, null, showEpisodeParams)
            .then(showEpisode => this.setShowEpisode(showEpisode, showEpisodeParams));
    }
}

export default ShowEpisodeStore;