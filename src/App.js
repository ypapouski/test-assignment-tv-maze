import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';

import { configure } from 'mobx';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';

import Transport from 'transport/Transport';
import AppRouter from 'components/AppRouter';

const initializeApplication = () => {
    // The MobX actions have to be explicitly specified
    configure({strict: 'always'});

    // Setup and render the application router
    const routerStore = new RouterStore();
    const routerHistory = syncHistoryWithStore(browserHistory, routerStore);

    const appRouterProps = {
        routerStore,
        routerHistory,
        transport: new Transport()
    };
    render(<AppRouter {...appRouterProps} />, document.getElementById('app'));
};

// Initialize and render the application when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApplication);