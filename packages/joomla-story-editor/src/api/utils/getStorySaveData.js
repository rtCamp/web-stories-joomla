export const getStorySaveData = ({
    pages,
    featuredMedia,
    globalStoryStyles,
    publisherLogo,
    autoAdvance,
    defaultPageDuration,
    currentStoryStyles,
    backgroundAudio,
    content,
    author,
    ...rest
  }) => {
    return {
      story_data: {
        version: 35,
        pages,
        autoAdvance,
        defaultPageDuration,
        currentStoryStyles,
        backgroundAudio,
      },
      featured_media: featuredMedia?.id,
      style_presets: globalStoryStyles,
      meta: {
        web_stories_publisher_logo: publisherLogo?.id,
      },
      publisher_logo: publisherLogo,
      content: content,
      author: author?.id,
      ...rest,
    };
  };