import React, { FC, useEffect, useState } from 'react';
import { Accordion, Button, Card } from 'react-bootstrap';
import './index.scss';

interface Tweet {
  text: string;
  videoPath?: string;
}

interface TweetContainerProps {
  tweets: Tweet[];
}

interface TweetBoxProps {
  tweet: Tweet;
}

const App: FC = (props) => {
  const init = [];
  const [tweets, setTweets] = useState<Tweet[]>(init);
  useEffect((): void => {
    (async () => {
      let fetchedTweets: Tweet[];
      do {
        fetchedTweets = await fetch('https://r-t-generator.herokuapp.com/').then(
          (response) => response.json() as Promise<Tweet[]>,
        );
      } while (!fetchedTweets.length);
      setTweets(fetchedTweets);
      // eslint-disable-next-line no-console
    })().catch(console.error);
  }, []);

  const TweetContainer: FC<TweetContainerProps> = (props) => {
    let i = -1;
    return (
      <div>
        {props.tweets.map((tweet: Tweet) => {
          return <TweetBox key={(i += 1)} tweet={tweet} />;
        })}
      </div>
    );
  };

  const TweetBox: FC<TweetBoxProps> = (props) => {
    const tweetWord = props.tweet.text.split(' ');

    let wordShow = [];
    for (let i = 0; i < 15; i++) {
      if (i == tweetWord.length - 1) break;
      wordShow += tweetWord[i] + ' ';
    }
    console.log(wordShow);
    const videoPath = 'https://r-t-generator.herokuapp.com/';
    return (
      <div>
        <Accordion defaultActiveKey="0">
          <Card>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              {wordShow}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <div>{props.tweet.text}</div>
                <div>
                  <video width="300" height="200" src={videoPath + props.tweet.videoPath} controls>
                    Video not supported
                  </video>
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  };
  return <TweetContainer tweets={tweets} />;
};

export default App;
