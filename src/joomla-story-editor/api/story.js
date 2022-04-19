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
import { DATA_VERSION } from '@googleforcreators/migration';

export const saveStoryById = async (config, story) => {
  const storySaveData = {
    storyId,
    title: {
      raw: title,
    },
    excerpt: {
      raw: excerpt,
    },
    storyData: {
      version: DATA_VERSION,
      pages,
      autoAdvance,
      defaultPageDuration,
      currentStoryStyles,
      backgroundAudio,
    },
    author: author?.id,
    stylePresets: globalStoryStyles,
    ...rest,
  };
  const { storyId } = storySaveData;
  const { data } = await axios({
    method: 'POST',
    url: config.api.saveLink,
    headers: {
      Authorization: 'Bearer ' + config.token,
    },
    data: {
      id: storyId,
      markup: story?.content,
      postContentFiltered: storySaveData?.story_data,
      title: story?.title,
      createdBy: config.userId,
      postDate: new Date(story?.date)
        .toISOString()
        .slice(0, 19)
        .replace('T', ' '),
      modifiedDate: new Date(story?.date)
        .toISOString()
        .slice(0, 19)
        .replace('T', ' '),
      published: 1,
      ...storySaveData,
    },
  });
  return data;
};
export const getStoryById = async (config, id) => {
  const { data } = await axios({
    method: 'GET',
    url: config.api.getStoryById + '?id=' + id,
    headers: {
      Authorization: 'Bearer ' + config.token,
    },
  });
  return Promise.resolve(data);
};
