import React from 'react';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ShowDetailsStore from 'src/js/stores/show/ShowDetailsStore';
import ShowDetails from 'src/js/components/show/ShowDetails';

describe('Test ShowDetails component', () => {

    configure({adapter: new Adapter()});

    it('check initial markup of the component', () => {
        const mockedStore = new ShowDetailsStore();
        mockedStore.fetchShowDetails = jest.fn();
        mockedStore.fetchShowEpisodes = jest.fn();
        mockedStore.setShowDetails({name: 'name', image: {original: 'url'}, summary: 'summary'});
        mockedStore.setShowEpisodes([
            {name: 'name1', image: {medium: 'url1'}, season: 1, number: 1},
            {name: 'name2', image: {medium: 'url2'}, season: 1, number: 2}]);

        const renderedComponent = renderer.create(<ShowDetails store={mockedStore}/>);
        expect(renderedComponent.toJSON()).toMatchSnapshot();
    });
});