import React, { Component } from 'react';

import { Provider } from 'mobx-react';
import { Router, Route, IndexRoute } from 'react-router';

import appRoutes from './app.routes.config.js';

import App from 'components/App';
import ShowDetails from 'components/show/ShowDetails';
import ShowEpisode from 'components/show/ShowEpisode';
import NotFound from 'components/notfound/NotFound';

import ShowDetailsStore from 'stores/show/ShowDetailsStore';
import ShowEpisodeStore from 'stores/show/ShowEpisodeStore';

/**
 * The component defines all application routes
 */
class AppRouter extends Component {

    /** The application stores */
    static stores = [
        { property: 'showDetailsStore', class: ShowDetailsStore },
        { property: 'showEpisodeStore', class: ShowEpisodeStore }
    ];

    /**
     * Construct an application router
     */
    constructor(...args) {
        super(...args);

        this.createStores();
    }

    /**
     * Create stores
     */
    createStores() {
        const { transport } = this.props;
        AppRouter.stores.forEach(store => this[store.property] = new store.class(transport));
    }

    /**
     * Render an application router
     * @see Component#render()
     */
    render() {
        const { routerStore, routerHistory } = this.props;
        return (
            <Provider {...{routerStore}}>
                <Router history={routerHistory}>
                    <Route path={appRoutes.ROOT} component={App}>
                        <IndexRoute component={props => <ShowDetails {...props} store={this.showDetailsStore}/>}/>
                        <Route path={appRoutes.SHOW_EPISODE}
                               component={props => <ShowEpisode {...props} store={this.showEpisodeStore}/>}/>
                        <Route path={appRoutes.NOT_FOUND} component={NotFound} />
                    </Route>
                </Router>
            </Provider>
        );
    }
}

export default AppRouter;
