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

const App: FC = (props) => {
  const [tweets, setTweets] = useState<Tweet[]>();
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
        {props.tweetList.map((tweet: Tweet) => {
          return <TweetBox key={(i += 1)} tweet={tweet} />;
        })}
      </div>
    );
  };

  const TweetBox: FC = (props) => {
    console.log(props.tweet);
    return (
      <div>
        <Accordion defaultActiveKey="0">
          <Card>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Tweet here
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>Hi</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                Video Address here
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>Hello! I am another body</Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  };
  return <TweetContainer tweetList={tweets} />;
};

export default App;
