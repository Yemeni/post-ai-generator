import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';

interface SocialShareProps {
  text: string;
  url: string;
  imageUrl: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ text, url, imageUrl }) => {
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check this out!',
          text: text,
          url: url,
          files: imageUrl
            ? [
                new File([await fetch(imageUrl).then((res) => res.blob())], 'image.jpg', { type: 'image/jpeg' }),
              ]
            : undefined,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      alert('Web Share API is not supported on this browser.');
    }
  };

  return (
    <div>
      {/* Native Share Button */}
      {navigator.share && typeof navigator.share === 'function' && (
        <button onClick={handleNativeShare} style={{ margin: '10px', padding: '10px' }}>
          Share on Social Media
        </button>
      )}

      {/* Fallback Buttons */}
      {!navigator.share && (
        <div style={{ display: 'flex', gap: '10px' }}>
          <FacebookShareButton url={url} hashtag={text}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton url={url} title={text}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <WhatsappShareButton url={url} title={text}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </div>
      )}
    </div>
  );
};

export default SocialShare;
