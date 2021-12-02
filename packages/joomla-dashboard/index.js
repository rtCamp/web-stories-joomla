/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * External dependencies
 */
import Dashboard, { InterfaceSkeleton } from '@web-stories-wp/dashboard';
import styled from 'styled-components';
import { render } from '@web-stories-wp/react';
import { createSolidFromString } from '@web-stories-wp/patterns';
import axios from 'axios';

/**
 * Internal dependencies
 */
import { GlobalStyle } from './theme';
import deepMerge from './deepMerge';
const AppContainer = styled.div`
  height: 100vh;
`;

// @todo Cleanup config and use a default configuration inside core dashboard package.
const initialize = (id, config) => {
  const appElement = document.getElementById(id);
  render(
    <AppContainer>
      <Dashboard config={config}>
        <GlobalStyle />
        <InterfaceSkeleton />
      </Dashboard>
    </AppContainer>,
    appElement
  );
};
const initializeWithConfig = () => {
  const apiCallbacksNames = [
    'createStoryFromTemplate',
    'duplicateStory',
    'fetchStories',
    'getAuthors',
    'trashStory',
    'updateStory',
  ];
  const globalConfig = window.dashboardSettings.config;
  // @todo Callbacks should be optional.
  const apiCallbacks = apiCallbacksNames.reduce((callbacks, name) => {
    let response;

    switch (name) {
      case 'getAuthors':
        response = [];
        break;
      default:
        response = {};
    }
    if ('fetchStories' === name) {
      callbacks[name] = async () => {
        const { data } = await axios({
          method: 'GET',
          url: globalConfig.api.fetchStories,
          headers: {
            Authorization: 'Bearer ' + globalConfig.token,
          },
        });
        return data;
      };
    } else if ('duplicateStory' === name) {
      callbacks[name] = async (story) => {
        const { data } = await axios({
          method: 'POST',
          url: globalConfig.api.duplicateStory,
          data: {
            id: story.id,
            currentUserId: globalConfig.userId
          },
          headers: {
            Authorization: 'Bearer ' + globalConfig.token,
          },
        });
        return data;
      };
    } else if ('updateStory' === name) {
      callbacks[name] = async (story) => {
        const { data } = await axios({
          method: 'POST',
          url: globalConfig.api.updateStory,
          data: {
            id: story.id,
            title: story.title?.raw || story.title,
          },
          headers: {
            Authorization: 'Bearer ' + globalConfig.token,
          },
        });
        return data;
      };
    } else if ('trashStory' === name) {
      callbacks[name] = async (storyId) => {
        const { data } = await axios({
          method: 'POST',
          url: globalConfig.api.trashStory,
          data: {
            id: storyId,
          },
          headers: {
            Authorization: 'Bearer ' + globalConfig.token,
          },
        });
        return data;
      };
    } else if ('createStoryFromTemplate' === name) {
      callbacks[name] = async (template) => {
        const { createdBy, pages, version, colors } = template;
        const { getStoryPropsToSave } = await import(
          /* webpackChunkName: "chunk-getStoryPropsToSave" */ '@web-stories-wp/story-editor'
        );
        const storyPropsToSave = await getStoryPropsToSave({
          story: {
            status: -1,
            featuredMedia: {
              id: 0,
            },
          },
          pages,
          metadata: {
            publisher: createdBy,
          },
        });
        const convertedColors = colors.map(({ color }) =>
          createSolidFromString(color)
        );
        const storyData = {
          pages,
          version,
          autoAdvance: true,
          defaultPageDuration: 7,
          currentStoryStyles: {
            colors: convertedColors,
          },
        };
        const { data } = await axios({
          method: 'POST',
          url: globalConfig.api.createStoryFromTemplate,
          data: {
            ...storyPropsToSave,
            storyData,
          },
          headers: {
            Authorization: 'Bearer ' + globalConfig.token,
          },
        });
        return data;
      };
    } else {
      callbacks[name] = () => Promise.resolve(response);
    }
    return callbacks;
  }, {});
  const config = {
    apiCallbacks,
  };
  const finalConfig = deepMerge(config, globalConfig);
  initialize('web-stories-dashboard', finalConfig);
};
if ('loading' === document.readyState) {
  document.addEventListener('DOMContentLoaded', initializeWithConfig);
} else {
  initializeWithConfig();
}
