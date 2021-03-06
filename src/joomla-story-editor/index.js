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
__webpack_public_path__ = "http://localhost:8888/joomla/media/com_webstories/js/";
/**
 * External dependencies
 */
import { render } from '@googleforcreators/react';
import { StoryEditor, InterfaceSkeleton } from '@googleforcreators/story-editor';
import { __ } from '@googleforcreators/i18n';
import { registerElementType } from '@googleforcreators/elements';
import { elementTypes } from '@googleforcreators/element-library';
console.log(elementTypes);
/**
 * Internal dependencies
 */
import { HeaderLayout } from './components/header';
import getApiCallbacks from './api/utils/getApiCallbacks';
import MediaUpload from './components/mediaUpload';
import DocumentPane from './components/documentPane';
import { getFonts } from './api/fonts';

// @todo None of these should be required by default, https://github.com/google/googleforcreators/pull/9569#discussion_r738458801
function initialize(id, config) {
  const appElement = document.getElementById(id);
  elementTypes.forEach(registerElementType);
  render(
    <div style={{"height":"100vh"}}>
      <StoryEditor config={config} initialEdits={{story:{}}}>
        <InterfaceSkeleton
          header={<HeaderLayout />}
          inspectorTabs={{
            document: {
              title: __('Document', 'web-stories'),
              Pane: DocumentPane,
            },
          }}
        />
      </StoryEditor>
    </div>,
    appElement
  );
}
const initializeWithConfig = () => {
  const globalconfig = window.webStoriesEditorSettings.config;

  const config = {
    apiCallbacks: {
      ...getApiCallbacks(globalconfig),
      getFonts,
    },
    MediaUpload,
    ...globalconfig,
  };
  initialize('web-stories-editor', config);
};

if ('loading' === document.readyState) {
  document.addEventListener('DOMContentLoaded', initializeWithConfig);
} else {
  initializeWithConfig();
}
