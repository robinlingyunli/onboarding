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
  id: string;
}

let finalTweets = [];
let setColor = 'black';
let bgColor = '#F8EFCE';

const App: FC = (props) => {
  const init = [];
  const [tweets, setTweets] = useState<Tweet[]>(init);
  console.log('app started');
  useEffect((): void => {
    console.log('useEffect called');
    (async () => {
      let fetchedTweets: Tweet[];
      do {
        fetchedTweets = await fetch('https://r-t-generator.herokuapp.com/').then(
          (response) => response.json() as Promise<Tweet[]>,
        );
      } while (!fetchedTweets.length);
      finalTweets = fetchedTweets;
      // console.log(tweets);
      setInterval(() => {
        addOnTop();
        console.log('setInterval called');
      }, 15000);
    })().catch(console.error);
  }, []);
  // useEffect((): void => {
  //   setTweets(finalTweets);
  //   console.log('useeffect called');
  // }, [tweets]);
  function addOnTop() {
    (async () => {
      let fetchedTweets: Tweet[];
      do {
        fetchedTweets = await fetch('https://r-t-generator.herokuapp.com/').then(
          (response) => response.json() as Promise<Tweet[]>,
        );
      } while (!fetchedTweets.length);
      finalTweets.unshift(fetchedTweets[0]);
      console.log('setValue is: ');
      setTweets([...finalTweets]);
    })().catch(console.error);
  }

  console.log('tweet is: ');
  console.log(tweets);

  const TweetContainer: FC<TweetContainerProps> = (props) => {
    // console.log(tweets)；
    let i = -1;
    return (
      <div>
        {props.tweets.map((tweet: Tweet) => {
          return <TweetBox key={(i += 1)} tweet={tweet} id={i.toString()} />;
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

    const videoPath = 'https://r-t-generator.herokuapp.com/';
    return (
      <div>
        <Accordion>
          <Card style={{ background: bgColor }}>
            <Accordion.Toggle as={Button} style={{ background: bgColor }} eventKey="0">
              <p style={{ color: setColor }}>{wordShow}</p>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <div>
                  <p style={{ color: setColor }}>{props.tweet.text}</p>
                  <br></br>

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

  function clickHandlerToDark() {
    setColor = '#FFF8EE';
    bgColor = '#A9A9A9';
    setTweets([...finalTweets]);
  }

  function clickHandlerToLight() {
    setColor = 'Black';
    bgColor = '#F8EFCE';
    setTweets([...finalTweets]);
  }

  return (
    <div align="center">
      <div>
        <button onClick={clickHandlerToDark}>Click to change color theme to dark!</button>
        <button onClick={clickHandlerToLight}>Click to change color theme to light!</button>
      </div>
      <div>
        <TweetContainer tweets={tweets} />
      </div>
    </div>
  );
};

export default App;
