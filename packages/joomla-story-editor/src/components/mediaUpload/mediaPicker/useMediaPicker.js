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
import { useCallback } from '@web-stories-wp/react';
import { trackEvent } from '@web-stories-wp/tracking';
import { useConfig, useStory } from '@web-stories-wp/story-editor';
import PropTypes from 'prop-types';
import axios from 'axios';

/**
 * Custom hook to open the WordPress media modal.
 *
 * @param {Object} props Props.
 * @param {Function} props.onClose what to do when media modal closes.
 * @param {Function?} props.onPermissionError Callback for when user does not have upload permissions.
 * @param {string} props.title Title of the media modal.
 * @return {Function} Callback to open the media picker.
 */
function useMediaPicker({ onClose, onPermissionError, title }) {
  const {
    capabilities: { hasUploadMediaAction },
    token,
  } = useConfig();
  const { updateStory } = useStory(({ actions: { updateStory } }) => {
    return {
      updateStory,
    };
  });
  const embedPreview = useCallback((variablex) => {
    const divTag = document.getElementById('mediaCarousel');
    const image = document.createElement('img');
    divTag.innerHTML = '';
    image.style.maxHeight = '200px';
    image.style.maxWidth = '200px';
    image.src = URL.createObjectURL(variablex.files[0]);
    divTag.appendChild(image);
  }, []);

  const submitImages = useCallback(() => {
    const formData = new FormData();
    formData.append(
      'image',
      document.getElementById('file-input-button').files[0]
    );
    axios({
      method: 'POST',
      url: '../api/index.php/v1/webstories/save_file',
      data: formData,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }).then((response) => {
      if (response.data !== false) {
        if (title !== 'Select as poster image') {
          onClose();
        }
        document.getElementById('close-button').click();
      }
    });
  }, [onClose, title, token]);

  const insertPoster = useCallback(() => {
    const poster = document.getElementById('posterModal');
    const src = poster.querySelector("input[name='image']:checked");
    updateStory({
      properties: {
        featuredMedia: {
          id: src.id,
          url: src.dataset.src,
          height: 200,
          width: 200,
        },
      },
    });
  }, [updateStory]);

  const openMediaDialog = useCallback(
    (evt) => {
      trackEvent('open_media_modal');
      // If a user does not have the rights to upload to the media library, do not show the media picker.
      if (!hasUploadMediaAction) {
        if (onPermissionError) {
          onPermissionError();
        }
        evt.preventDefault();
        return;
      }
      let modal;
      if (
        title === 'Select as poster image' ||
        title === 'Select as publisher logo'
      ) {
        modal = new bootstrap.Modal(document.getElementById('posterModal'));
      } else {
        modal = new bootstrap.Modal(document.getElementById('mediaModal'));
      }
      modal.show();
      if (
        title !== 'Select as poster image' &&
        title !== 'Select as publisher logo'
      ) {
        window.embedPreview = embedPreview;
        window.submitImages = submitImages;
      } else {
        axios({
          method: 'GET',
          url: '../api/index.php/v1/webstories/getimages',
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }).then(({ data }) => {
          const divTag = document.getElementById('posterCarousel');
          divTag.innerHTML = '';
          divTag.className = 'form-check';
          data.map(({ src }) => {
            const element =
              `<label><input type='radio'  data-src="` +
              src +
              `" name="image" id=` +
              src +
              `><img src='` +
              src +
              `'" style='height:200px;width:200px;margin:5px'></label>`;
            divTag.innerHTML += element;
          });
        });
        window.insertPoster = insertPoster;
      }
      evt.preventDefault();
    },
    [
      hasUploadMediaAction,
      title,
      onPermissionError,
      embedPreview,
      submitImages,
      token,
      insertPoster,
    ]
  );

  return openMediaDialog;
}

useMediaPicker.propTypes = {
  onPermissionError: PropTypes.func,
  onClose: PropTypes.func,
};

export default useMediaPicker;
