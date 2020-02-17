import { observable, extendObservable, action } from 'mobx';
import Store from 'stores/Store';
import endpoints from 'transport/endpoints';

/**
 * The show's details store
 */
class ShowDetailsStore extends Store {

    /** The show's details */
    @observable
    showDetails = {};

    /** The show's episodes */
    @observable
    showEpisodes = [];

    /**
     * Get a show's details
     * @returns {Number} show's details
     */
    get ShowDetails() {
        return this.showDetails;
    }

    /**
     * Get a show's episodes
     * @returns {Number} show's episodes
     */
    get ShowEpisodes() {
        return this.showEpisodes;
    }

    /**
     * Set a show's details
     * @param {Object} showDetails - show's details to be set
     */
    @action
    setShowDetails = showDetails => {
        extendObservable(this.showDetails, showDetails);
    };

    /**
     * Set a show's episodes
     * @param {Object} showEpisodes - show's episodes to be set
     */
    @action
    setShowEpisodes = showEpisodes => {
        this.showEpisodes.replace(showEpisodes);
    };

    /**
     * Fetch a show's details
     * @param {Number} showId - a show identifier
     * @returns {Promise} a call api promise
     */
    fetchShowDetails(showId) {
        return this.Transport.callApi(endpoints.GET_SHOW_DETAILS, null, showId).then(this.setShowDetails);
    }

    /**
     * Fetch a show's episodes
     * @param {Number} showId - a show identifier
     * @returns {Promise} a call api promise
     */
    fetchShowEpisodes(showId) {
        return this.Transport.callApi(endpoints.GET_SHOW_EPISODES, null, showId).then(this.setShowEpisodes);
    }
}

export default ShowDetailsStore;
