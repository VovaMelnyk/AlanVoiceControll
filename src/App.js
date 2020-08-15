import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import wordsToNumbers from "words-to-numbers";
import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from "./styles";
import { Typography } from "@material-ui/core";

const App = () => {
  const classes = useStyles();
  const [articles, setArticles] = useState([]);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    alanBtn({
      key: process.env.REACT_APP_ALAN_KEY,
      onCommand: ({ command, articles, number }) => {
        if (command === "newNews") {
          setArticles(articles);
          setActive(-1);
        } else if (command === "current") {
          setActive((state) => state + 1);
        } else if (command === "open") {
          const correctNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;
          const article = articles[correctNumber - 1];

          if (correctNumber > 20) {
            alanBtn().playText("Please Try again");
          } else if (article) {
            window.open(article.url, "_blank");
            alanBtn().playText("Opening");
          }
        }
      },
    });
  }, []);

  return (
    <div>
      <div className={classes.logoContainer}>
        {articles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}>
              <Typography variant="h5" component="h2">
                Try saying: <br />
                <br />
                Open article number [4]
              </Typography>
            </div>
            <div className={classes.card}>
              <Typography variant="h5" component="h2">
                Try saying: <br />
                <br />
                Go back
              </Typography>
            </div>
          </div>
        ) : null}
        <img
          src="https://alan.app/voice/images/previews/preview.jpg"
          alt="alanLogo"
          className={classes.alanLogo}
        />
      </div>
      <NewsCards articles={articles} active={active} />
    </div>
  );
};

export default App;
