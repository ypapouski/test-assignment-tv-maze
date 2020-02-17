import React from 'react';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ShowEpisodeStore from 'src/js/stores/show/ShowEpisodeStore';
import ShowEpisode from 'src/js/components/show/ShowEpisode';

describe('Test ShowDetails component', () => {

    configure({adapter: new Adapter()});

    it('check initial markup of the component', () => {
        const mockedStore = new ShowEpisodeStore();
        mockedStore.fetchShowEpisode = jest.fn();
        mockedStore.setShowEpisode(
            {name: 'name1', image: {original: 'url1'}, summary: 'summary'},
            [1, 1, 1]
        );

        const renderedComponent = renderer.create(
            <ShowEpisode params={{showId: 1, seasonId: 1, episodeId: 1}} store={mockedStore}/>
        );
        expect(renderedComponent.toJSON()).toMatchSnapshot();
    });
});