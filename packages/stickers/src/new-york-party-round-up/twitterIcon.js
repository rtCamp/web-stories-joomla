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
import { _x } from '@web-stories-wp/i18n';
import PropTypes from 'prop-types';

const title = _x('White Twitter', 'sticker name', 'web-stories');

function TwitterIcon({ style }) {
  return (
    <svg
      style={style}
      viewBox="0 0 39 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <path
        d="M38.0294 4.00652C35.647 4.11278 35.699 4.10411 35.4297 4.12593L36.8407 0.22621C36.8407 0.22621 32.4365 1.79421 31.32 2.0747C28.3878 -0.47599 24.0293 -0.588689 20.9133 1.26483C18.3616 2.78305 16.992 5.39022 17.4488 8.43757C12.4827 7.7706 8.29845 5.4923 4.99492 1.65159L3.95008 0.437066L3.16935 1.82469C2.18259 3.57809 1.85493 5.5829 2.24645 7.4697C2.4071 8.24377 2.68016 8.98205 3.05839 9.67334L2.16208 9.3372L2.05574 10.7866C1.94797 12.259 2.45449 13.9777 3.41091 15.3838C3.68021 15.7798 4.02694 16.2146 4.46643 16.6436L4.00325 16.5748L4.56843 18.2357C5.31131 20.4178 6.85429 22.106 8.8567 23.0445C6.85689 23.8658 5.24139 24.3899 2.58596 25.2353L0.156494 26.0082L2.40046 27.1956C3.25603 27.6484 6.27929 29.1605 9.26642 29.614C15.9064 30.6219 23.3824 29.8011 28.4152 25.4143C32.6544 21.7193 34.0454 16.4632 33.7564 10.9936C33.7128 10.1655 33.9471 9.37523 34.4164 8.76867C35.3563 7.55415 38.0236 4.01463 38.0294 4.00652ZM32.642 7.48228C31.8627 8.4893 31.4723 9.77541 31.5422 11.1032C31.8338 16.6204 30.2827 20.899 26.9318 23.8197C23.0174 27.2317 16.7036 28.571 9.60998 27.494C8.32532 27.2991 6.99761 26.8626 5.89874 26.4266C8.12508 25.6852 9.84432 25.0244 12.6208 23.7526L16.4967 21.9771L12.2174 21.712C10.1676 21.585 8.46084 20.6236 7.41167 19.0626C7.96876 19.0313 8.50591 18.944 9.04075 18.7997L13.1221 17.6996L9.00666 16.7241C7.00686 16.2501 5.86696 15.0921 5.26277 14.2039C4.86604 13.6203 4.60686 13.0224 4.45141 12.4712C4.86402 12.5783 5.34512 12.6547 6.12094 12.7291L9.93013 13.0937L6.91208 10.8152C4.73746 9.17361 3.866 6.70737 4.50486 4.3365C11.2917 11.1493 19.2602 10.6373 20.0624 10.8174C19.8858 9.15767 19.8812 9.15375 19.835 8.99575C18.8077 5.48139 21.0589 3.69694 22.0743 3.0929C24.1952 1.8314 27.5617 1.64124 29.8935 3.7196C30.3971 4.16815 31.0782 4.34461 31.7156 4.19136C32.2877 4.05378 32.7573 3.90808 33.217 3.74952L32.26 6.39445L33.4816 6.39529C33.2511 6.69451 32.9745 7.05274 32.642 7.48228Z"
        fill="white"
      />
    </svg>
  );
}

TwitterIcon.propTypes = {
  style: PropTypes.object,
};

export default {
  aspectRatio: 39 / 30,
  svg: TwitterIcon,
  title,
};
