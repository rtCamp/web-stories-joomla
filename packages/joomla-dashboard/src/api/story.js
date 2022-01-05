/*
 * Copyright 2021 Google LLC
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
import axios from 'axios';
import { createSolidFromString } from '@web-stories-wp/patterns';

export const fetchStories = async (config, { page, status }) => {
  const { data } = await axios({
    method: 'GET',
    url: config.api.fetchStories + '?page=' + page + '&status=' + status,
    headers: {
      Authorization: 'Bearer ' + config.token,
    },
  });
  return data;
};
export const duplicateStory = async (config, story) => {
  const { data } = await axios({
    method: 'POST',
    url: config.api.duplicateStory,
    data: {
      id: story.id,
      currentUserId: config.userId,
    },
    headers: {
      Authorization: 'Bearer ' + config.token,
    },
  });
  return data;
};
export const updateStory = async (config, story) => {
  const { data } = await axios({
    method: 'POST',
    url: config.api.updateStory,
    data: {
      id: story.id,
      title: story.title?.raw || story.title,
    },
    headers: {
      Authorization: 'Bearer ' + config.token,
    },
  });
  return data;
};
export const trashStory = async (config, storyId) => {
  const { data } = await axios({
    method: 'POST',
    url: config.api.trashStory,
    data: {
      id: storyId,
    },
    headers: {
      Authorization: 'Bearer ' + config.token,
    },
  });
  return data;
};
export const createStoryFromTemplate = async (config, template) => {
  const { createdBy, pages, version, colors } = template;
  // eslint-disable-next-line import/no-extraneous-dependencies
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
    url: config.api.createStoryFromTemplate,
    data: {
      ...storyPropsToSave,
      storyData,
    },
    headers: {
      Authorization: 'Bearer ' + config.token,
    },
  });
  return data;
};
