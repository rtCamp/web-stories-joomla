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
import { render } from '@web-stories-wp/react';

/**
 * Internal dependencies
 */
import { GlobalStyle } from '../theme';
import getApiCallbacks from './api/getApiCallbacks';
// @todo Cleanup config and use a default configuration inside core dashboard package.
const initialize = (id, config) => {
  const appElement = document.getElementById(id);
  render(
    <Dashboard config={config}>
      <GlobalStyle />
      <InterfaceSkeleton />
    </Dashboard>,
    appElement
  );
};
const initializeWithConfig = () => {
  const globalConfig = window.dashboardSettings.config;
  // @todo Callbacks should be optional.
  const config = {
    apiCallbacks: getApiCallbacks(globalConfig),
    ...globalConfig,
  };
  initialize('web-stories-dashboard', config);
};
if ('loading' === document.readyState) {
  document.addEventListener('DOMContentLoaded', initializeWithConfig);
} else {
  initializeWithConfig();
}
