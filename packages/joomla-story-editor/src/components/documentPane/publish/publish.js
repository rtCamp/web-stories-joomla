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
import styled from 'styled-components';
import { __, sprintf, translateToExclusiveList } from '@web-stories-wp/i18n';
import { Text, THEME_CONSTANTS } from '@web-stories-wp/design-system';
import {
  highlightStates as states,
  highlightStyles as styles,
  Row,
  Media,
  Panel,
  Required,
  PanelTitle,
  PanelContent,
  useStory,
  useConfig,
  useHighlights,
  useInspector,
} from '@web-stories-wp/story-editor';

/**
 * Internal dependencies
 */
import PublishTime from './publishTime';
import Author from './author';

const LabelWrapper = styled.div`
  height: 40px;
`;

const Label = styled(Text).attrs({
  as: 'label',
  size: THEME_CONSTANTS.TYPOGRAPHY.PRESET_SIZES.SMALL,
})`
  color: ${({ theme }) => theme.colors.fg.primary};
  font-size: 14px;
`;

const MediaWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 4px;
  height: 96px;
`;

const StyledMedia = styled(Media)`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;

const HighlightRow = styled(Row).attrs({
  spaceBetween: false,
})`
  position: relative;
  &::after {
    content: '';
    position: absolute;
    top: -10px;
    bottom: -10px;
    left: -20px;
    right: -10px;
    ${({ isHighlighted }) => isHighlighted && styles.FLASH}
    pointer-events: none;
  }
`;

const MediaInputWrapper = styled.div`
  height: 160px;
`;

function PublishPanel() {
  const {
    state: { users },
  } = useInspector();

  const {
    allowedImageMimeTypes,
    allowedImageFileTypes,
    capabilities: { hasUploadMediaAction },
  } = useConfig();

  const { highlightPoster, highlightLogo, resetHighlight } = useHighlights(
    (state) => ({
      highlightPoster: state[states.POSTER],
      highlightLogo: state[states.PUBLISHER_LOGO],
      resetHighlight: state.onFocusOut,
      cancelHighlight: state.cancelEffect,
    })
  );

  const { featuredMedia, updateStory, capabilities } = useStory(
    ({
      state: {
        story: { featuredMedia = { id: 0, url: '', height: 0, width: 0 } },
        capabilities,
      },
      actions: { updateStory },
    }) => {
      return {
        featuredMedia,
        updateStory,
        capabilities,
      };
    }
  );

  const handleChangePoster = useCallback(
    /**
     * Handle story poster change.
     *
     * @param {import('@web-stories-wp/media').Resource} newPoster The new image.
     * @return {void}
     */
    (newPoster) => {
      return updateStory({
        properties: {
          featuredMedia: {
            id: newPoster.id,
            url: newPoster.src,
            height: newPoster.height,
            width: newPoster.width,
          },
        },
      });
    },
    [updateStory]
  );

  const getErrorMessage = (message) => {
    let returnedMessage = __(
      'No file types are currently supported.',
      'web-stories'
    );

    if (allowedImageFileTypes.length) {
      returnedMessage = sprintf(
        message,
        translateToExclusiveList(allowedImageFileTypes)
      );
    }

    return returnedMessage;
  };

  const posterErrorMessage = getErrorMessage(
    /* translators: %s: list of allowed file types. */
    __('Please choose only %s as a poster.', 'web-stories')
  );

  return (
    <Panel
      name="publishing"
      collapsedByDefault={false}
      isPersistable={!(highlightLogo || highlightPoster)}
    >
      <PanelTitle>{__('Publishing', 'web-stories')}</PanelTitle>
      <PanelContent>
        {capabilities?.publish && <PublishTime />}
        {capabilities?.['assign-author'] && users && <Author />}
        <HighlightRow
          isHighlighted={
            highlightPoster?.showEffect || highlightLogo?.showEffect
          }
          onAnimationEnd={() => resetHighlight()}
        >
          <MediaInputWrapper>
            <MediaWrapper>
              <StyledMedia
                ref={(node) => {
                  if (
                    node &&
                    highlightPoster?.focus &&
                    highlightPoster?.showEffect
                  ) {
                    node.focus();
                  }
                }}
                width={72}
                height={96}
                cropParams={{
                  width: 640,
                  height: 853,
                }}
                value={featuredMedia?.url}
                onChange={handleChangePoster}
                title={__('Select as poster image', 'web-stories')}
                buttonInsertText={__('Select as poster image', 'web-stories')}
                type={allowedImageMimeTypes}
                ariaLabel={__('Poster image', 'web-stories')}
                onChangeErrorText={posterErrorMessage}
                imgProps={featuredMedia}
                canUpload={hasUploadMediaAction}
              />
            </MediaWrapper>
            <LabelWrapper>
              <Label>{__('Poster image', 'web-stories')}</Label>
              <Required />
            </LabelWrapper>
          </MediaInputWrapper>
        </HighlightRow>
      </PanelContent>
    </Panel>
  );
}

export default PublishPanel;
