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

const AppContainer = styled.div`
  height: 100vh;
`;

const apiCallbacksNames = [
  'createStoryFromTemplate',
  'duplicateStory',
  'fetchStories',
  'getAuthors',
  'trashStory',
  'updateStory',
];

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
        url: 'http://localhost:88/joomla-cms/api/index.php/v1/webstories',
        headers: {
          Authorization:
            'Bearer '+config.token,
        },
      });
      return data;
    };
  } else if ('duplicateStory' === name) {
    callbacks[name] = async (story) => {
      const { data } = await axios({
        method: 'POST',
        url: 'http://localhost:88/joomla-cms/api/index.php/v1/webstories/duplicate',
        data: {
          id: story.id,
        },
        headers: {
          Authorization:
            'Bearer '+config.token,
        },
      });
      return data;
    };
  } else if ('updateStory' === name) {
    callbacks[name] = async (story) => {
      const { data } = await axios({
        method: 'POST',
        url: 'http://localhost:88/joomla-cms/api/index.php/v1/webstories/rename',
        data: {
          id: story.id,
          title: story.title?.raw || story.title,
        },
        headers: {
          Authorization:
            'Bearer '+config.token,
        },
      });
      return data;
    };
  } else if ('trashStory' === name) {
    callbacks[name] = async (storyId) => {
      const { data } = await axios({
        method: 'POST',
        url: 'http://localhost:88/joomla-cms/api/index.php/v1/webstories/delete',
        data: {
          id: storyId,
        },
        headers: {
          Authorization:
            'Bearer '+config.token,
        },
      });
      return data;
    };
  } else if('createStoryFromTemplate' === name){
    callbacks[name] = async (template)=>{
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
        method:"POST",
        url:'http://localhost:88/joomla-cms/api/index.php/v1/webstories/create_story_from_template',
        data: {
          ...storyPropsToSave,
          storyData,
        },
        headers: {
          Authorization:
            'Bearer '+config.token,
        },
      });
      return data;
    }
  }else {
    callbacks[name] = () => Promise.resolve(response);
  }
  return callbacks;
}, {});

// @todo Cleanup config and use a default configuration inside core dashboard package.
const config = {
  userId: 1,
  flags: {
    enableSVG: false,
    enablePostLocking: false,
    archivePageCustomization: true,
    enableBetterCaptions: true,
    enableInProgressTemplateActions: false,
  },
  capabilities: {
    canManageSettings: true,
    canUploadFiles: true,
  },
  newStoryURL:
    'http://localhost:88/joomla-cms/administrator/index.php?option=com_webstories&view=storyeditor&create_new=yes',
  api: {},
  apiCallbacks,
  ...window.dashboardSettings,
};
const initialize = (id) => {
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
  initialize('web-stories-dashboard');
};
if ('loading' === document.readyState) {
  document.addEventListener('DOMContentLoaded', initializeWithConfig);
} else {
  initializeWithConfig();
}
