import * as React from 'react'
import { Item } from '../../../../types'
import { useTags } from '../../hooks/useTags';
import { useAddFilterTag } from '../../hooks/useFilter';
import { hashTagRegex } from '../../../../Utils/HashTagRegex';
import { fixUrls, mailRegex } from '../../../../Utils/ReplaceURLs';
import Markdown from 'react-markdown'
import rehypeVideo from 'rehype-video';
import { getValue } from '../../../../Utils/GetValue';

export const TextView = ({ item }: { item?: Item }) => {
  const tags = useTags();
  const addFilterTag = useAddFilterTag();

  const text = item?.layer?.itemTextField && item ? getValue(item, item.layer?.itemTextField) : undefined;

  let replacedText;

  if (item && text) replacedText = fixUrls(text);

  replacedText = replacedText.replace(/(?<!\]?\()https?:\/\/[^\s\)]+(?!\))/g, (url) => {
    let shortUrl = url;
    if (url.match('^https:\/\/')) {
      shortUrl = url.split('https://')[1];
    }
    if (url.match('^http:\/\/')) {
      shortUrl = url.split('http://')[1];
    }
    return `[${shortUrl}](${url})`
  })

  replacedText = replacedText.replace(mailRegex, (url) => {
    return `[${url}](mailto:${url})`
  })

  replacedText = replacedText.replace(hashTagRegex, (match) => {
    return `[${match}](${match})`
  })



  const CustomH1 = ({ children }) => (
    <h1 className="tw-text-xl tw-font-bold">{children}</h1>
  );
  const CustomH2 = ({ children }) => (
    <h2 className="tw-text-lg tw-font-bold">{children}</h2>
  );
  const CustomH3 = ({ children }) => (
    <h3 className="tw-text-base tw-font-bold">{children}</h3>
  );
  const CustomH4 = ({ children }) => (
    <h4 className="tw-text-base tw-font-bold">{children}</h4>
  );
  const CustomH5 = ({ children }) => (
    <h5 className="tw-text-sm tw-font-bold">{children}</h5>
  );
  const CustomH6 = ({ children }) => (
    <h6 className="tw-text-sm tw-font-bold">{children}</h6>
  );
  const CustomParagraph = ({ children }) => (
    <p className="!tw-my-1">{children}</p>
  );
  const CustomUnorderdList = ({ children }) => (
    <ul className="tw-list-disc tw-list-inside">{children}</ul>
  );
  const CustomOrderdList = ({ children }) => (
    <ol className="tw-list-decimal tw-list-inside">{children}</ol>
  );
  const CustomHorizontalRow = ({ children }) => (
    <hr className="tw-border-current">{children}</hr>
  );
  const CustomImage = ({ alt, src, title }) => (
    <img
      className="max-w-full rounded-lg shadow-md"
      src={src}
      alt={alt}
      title={title}
    />
  );
  const CustomExternalLink = ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
  const CustomHashTagLink = ({ children, tag, item }) => {    
    return (
    <a
      style={{ color: tag ? tag.color : '#faa', fontWeight: 'bold', cursor: 'pointer' }}
      key={tag ? tag.id + item!.id : item.id}
      onClick={(e) => {       
        e.stopPropagation();
        addFilterTag(tag!);
        // map.fitBounds(items)
        // map.closePopup();
      }}>{children}</a>
  )};

  return (
    //@ts-ignore
    <Markdown rehypePlugins={[rehypeVideo]} components={{
      p: CustomParagraph,
      a: ({ href, children }) => {
        // Prüft, ob der Link ein YouTube-Video ist
        const isYouTubeVideo = href?.startsWith('https://www.youtube.com/watch?v=');

        if (isYouTubeVideo) {
          const videoId = href?.split('v=')[1].split('&')[0]; // Extrahiert die Video-ID aus der URL
          const youtubeEmbedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;

          return (

            <iframe className='tw-w-full'
              src={youtubeEmbedUrl}
              allowFullScreen
            />

          );
        }
        if (href?.startsWith("#")) {          
          const tag = tags.find(t => t.id.toLowerCase() == decodeURI(href).slice(1).toLowerCase())
          return <CustomHashTagLink tag={tag} item={item}>{children}</CustomHashTagLink>;
        } else {
          return (
            <CustomExternalLink href={href}>{children}</CustomExternalLink>
          );
        }
      },
      ul: CustomUnorderdList,
      ol: CustomOrderdList,
      img: CustomImage,
      hr: CustomHorizontalRow,
      h1: CustomH1,
      h2: CustomH2,
      h3: CustomH3,
      h4: CustomH4,
      h5: CustomH5,
      h6: CustomH6,
    }}>
      {replacedText}
    </Markdown>
  )



}