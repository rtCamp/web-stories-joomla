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
import { render } from '@web-stories-wp/react';
import StoryEditor, { InterfaceSkeleton } from '@web-stories-wp/story-editor';
import styled from 'styled-components';
import { deepMerge } from '@web-stories-wp/design-system';
import { __ } from '@web-stories-wp/i18n';
import axios from 'axios';

/**
 * Internal dependencies
 */
import { HeaderLayout } from './components/header';
import { getMedia, getStoryById, saveStoryById } from './api';
import MediaUpload from './components/mediaUpload';
import DocumentPane from './components/documentPane';

// @todo Instead of 100vh, may be the story editor should define its minimum required height to work properly,
// and that height should be set with the <StoryEditor> component.
const AppContainer = styled.div`
  height: 100vh;
`;

// @todo None of these should be required by default, https://github.com/google/web-stories-wp/pull/9569#discussion_r738458801
function initialize(id, config) {
  const appElement = document.getElementById(id);
  render(
    <AppContainer>
      <StoryEditor config={config}>
        <InterfaceSkeleton header={<HeaderLayout />}inspectorTabs={{
          document: {
            title: __('Document', 'web-stories'),
            Pane: DocumentPane,
          },
        }} />
      </StoryEditor>
    </AppContainer>,
    appElement
  );
}
const initializeWithConfig = () => {
  const globalconfig = window.webStoriesEditorSettings.config;
  const apiCallbacksNames = [
    'getAuthors',
    'getStoryById',
    'getDemoStoryById',
    'saveStoryById',
    'autoSaveById',
    'getMedia',
    'getMediaById',
    'getMutedMediaById',
    'getOptimizedMediaById',
    'uploadMedia',
    'updateMedia',
    'deleteMedia',
    'getLinkMetadata',
    'getCustomPageTemplates',
    'addPageTemplate',
    'deletePageTemplate',
    'getCurrentUser',
    'updateCurrentUser',
    'getHotlinkInfo',
    'getProxyUrl',
    'getPublisherLogos',
    'addPublisherLogo',
    'getTaxonomies',
    'getTaxonomyTerm',
    'createTaxonomyTerm',
  ];
  const apiCallbacks = apiCallbacksNames.reduce((callbacks, name) => {
    let response;

    const storyResponse = {
      title: { raw: '' },
      excerpt: { raw: '' },
      permalink_template: 'https://example.org/web-stories/%pagename%/',
      style_presets: {
        color: [],
        textStyles: [],
      },
      date: '2021-10-26T12:38:38', // Publishing field breaks if date is not provided.
    };

    switch (name) {
      case 'getCurrentUser':
        response = { id: 1 };
        break;
      case 'getDemoStoryById': // @todo https://github.com/google/web-stories-wp/pull/9569#discussion_r739076535
        response = storyResponse;
        break;
      case 'getPublisherLogos':
        response = [{ url: '' }];
        break;
      case 'addPublishedLogo':
        response = [{
          active:true,
          id:123,
          title:'sometitle.jpeg',
          url:''
        }]
      default:
        response = {};
    }

    if ('saveStoryById' === name) {
      callbacks[name] = (story) => {
        return Promise.resolve(saveStoryById(globalconfig, story));
      };
    } else if ('getStoryById' === name) {
      callbacks[name] = (id) => {
        return getStoryById(globalconfig, id);
      };
    } else if ('getMedia' === name) {
      callbacks[name] = ({ mediaType }) => {
        return getMedia(globalconfig,mediaType);
      };
    }else if ('getAuthors' === name) {
      callbacks[name] = async () => {
        const { data } = await axios({
          method: 'GET',
          url: '../api/index.php/v1/webstories/users',
          headers: {
            Authorization:
              'Bearer '+globalconfig.token,
          },
        });
        return Promise.resolve(data);
      };
    } 
    else {
      callbacks[name] = () => Promise.resolve(response);
    }

    return callbacks;
  }, {});

  const config = {
    apiCallbacks,
    MediaUpload,
    ...globalconfig
  };
  initialize('web-stories-editor', config);
};

if ('loading' === document.readyState) {
  document.addEventListener('DOMContentLoaded', initializeWithConfig);
} else {
  initializeWithConfig();
}
