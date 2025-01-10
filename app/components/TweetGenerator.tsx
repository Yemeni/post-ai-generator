import { ChangeEvent, useState } from 'react';
import { useChat } from 'ai/react';
import Tweet from './Tweet';
import styles from './tweetgenerator.module.css';
import { useLocalization } from '@/app/hooks/useLocalization';

const TweetGenerator = () => {
  const [tweetText, setTweetText] = useState('');
  const [tone, setTone] = useState('funny');
  const [imageUrl, setImageUrl] = useState('');
  const [generateImage, setGenerateImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedTweet, setGeneratedTweet] = useState('');
  const [disableSubmitButton, setDisableSubmitButton] = useState(true);

  const { t } = useLocalization();

  const { handleInputChange, handleSubmit } = useChat({
    api: '/api/gpt',
    onFinish: (message) => {
      setError('');

      let generatedTweetContent = message.content;
      // Remove hashtags from the generated tweet
      generatedTweetContent = generatedTweetContent?.replace(/#[\w]+/g, '');
      setGeneratedTweet(generatedTweetContent);

      if (generateImage && generatedTweetContent) {
        getImageData(generatedTweetContent).then();
      } else {
        setLoading(false);
      }
    },
    onError: (error) => {
      setError(`${t('error')}: ${error}`);
      setLoading(false);
    },
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    handleSubmit(event);
    setDisableSubmitButton(true);
  };

  const getImageData = async (prompt: string) => {
    try {
      setLoading(true);
      const response = await fetch('/api/dall-e', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      const { imageUrl } = await response.json();
      setImageUrl(imageUrl);
      setError('');
    } catch (error) {
      setError(`${t('error_image_generation')}: ${error}`);
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{t('generate_text')}</h1>
      </div>
      <form className={styles.form} onSubmit={onSubmit}>
        <label htmlFor="bioInput" className={styles.label}>
          {t('step_1')}
        </label>
        <textarea
          id="bioInput"
          className={styles.textarea}
          rows={4}
          placeholder={t('tweet_placeholder')}
          value={tweetText}
          onChange={(e) => {
            setTweetText(e.target.value);
            handleInputChange({
              ...e,
              target: {
                ...e.target,
                value: `Generate a ${tone} post about ${e.target.value}.`,
              },
            });
            setDisableSubmitButton(false);
          }}
          disabled={loading}
        />
        <label htmlFor="vibeSelect" className={styles.label}>
          {t('step_2')}
        </label>
        <select
          id="vibeSelect"
          className={styles.select}
          onChange={(e) => {
            const event = e as unknown as ChangeEvent<HTMLInputElement>;
            setTone(event.target.value);
            handleInputChange({
              ...event,
              target: {
                ...event.target,
                value: `Generate a ${tone} post about ${e.target.value}.`,
              },
            });
            setDisableSubmitButton(false);
          }}
          disabled={loading}
        >
          <option value="funny">{t('tone_funny')}</option>
          <option value="inspirational">{t('tone_inspirational')}</option>
          <option value="casual">{t('tone_casual')}</option>
        </select>

        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="imageOption"
            className={styles.checkbox}
            checked={generateImage}
            onChange={(e) => setGenerateImage(e.target.checked)}
            disabled={loading}
          />
          <label htmlFor="imageOption" className={styles.checkboxLabel}>
            {t('image_option')}
          </label>
        </div>

        <button
          className={styles.button}
          type="submit"
          disabled={disableSubmitButton}
        >
          {t('generate_button')}
        </button>
      </form>
      {loading && <p>{t('loading')}</p>}
      {error && <p className={styles.error}>{error}</p>}
      {generatedTweet && <Tweet tweet={generatedTweet} imageSrc={imageUrl} />}
    </div>
  );
};

export default TweetGenerator;
