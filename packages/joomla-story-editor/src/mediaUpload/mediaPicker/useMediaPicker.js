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
import { useCallback, useEffect } from '@web-stories-wp/react';
import { trackEvent } from '@web-stories-wp/tracking';
import { useConfig, useAPI } from '@web-stories-wp/story-editor';
import PropTypes from 'prop-types';
import axios from 'axios';

/**
 * Custom hook to open the WordPress media modal.
 *
 * @param {Function?} props.onPermissionError Callback for when user does not have upload permissions.
 * @return {Function} Callback to open the media picker.
 */
function useMediaPicker({ onPermissionError, onClose }) {
  const {
    actions: { updateMedia },
  } = useAPI();
  const {
    capabilities: { hasUploadMediaAction },
  } = useConfig();

  useEffect(() => {
    try {
      // The Uploader.success callback is invoked when a user uploads a file.
      // This is used to mark files as "uploaded to the story editor"
      // in case we eventually want to allow filtering such files.
      // Note: at this point the video has not yet been inserted into the canvas,
      // it's just in the WP media modal.
      // Video poster generation for newly added videos is done in <MediaPane>.
      wp.Uploader.prototype.success = ({ attributes }) => {
        updateMedia(attributes.id, {
          web_stories_media_source: 'editor',
          alt_text: attributes.alt || attributes.title,
        });
      };
    } catch (e) {
      // Silence.
    }
  }, [updateMedia]);
  const embedPreview = useCallback((variablex) => {
    const divTag = document.getElementById('carousel');
    const image = document.createElement('img');
    divTag.innerHTML = '';
    image.style.maxHeight="200px";
    image.style.maxWidth="200px";
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
      url: 'http://localhost:88/joomla-cms/api/index.php/v1/webstories/save_file',
      data: formData,
      headers: {
        Authorization:
          'Bearer '+config.token,
      },
    }).then((response) => {
      if (response.data !== false) {
        onClose();
        document.getElementById('close-button').click();
      }
    });
  }, [onClose]);

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
      window.embedPreview = embedPreview;
      window.submitImages = submitImages;
      evt.preventDefault();
    },
    [submitImages, embedPreview, hasUploadMediaAction, onPermissionError]
  );

  return openMediaDialog;
}

useMediaPicker.propTypes = {
  onPermissionError: PropTypes.func,
  onClose: PropTypes.func,
};

export default useMediaPicker;
