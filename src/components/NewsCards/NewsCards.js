import React from "react";
import { Grid, Grow, Typography } from "@material-ui/core";
import NewsCard from "../Card/Card";
import useStyles from "./styles";

const infoCards = [
  { color: "#00838f", title: "Latest News", text: "Give me the latest news" },
  {
    color: "#1565c0",
    title: "News by Categories",
    info:
      "Business, Entertainment, General, Health, Science, Sports, Technology",
    text: "Give me the latest Technology news",
  },
  {
    color: "#4527a0",
    title: "News by Terms",
    info: "Bitcoin, PlayStation 5, Smartphones, Donald Trump...",
    text: "What's up with Bitcoin",
  },
  {
    color: "#283593",
    title: "News by Sources",
    info: "CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...",
    text: "Give me the news from CNN",
  },
];

const NewsCards = ({ articles, active }) => {
  const classes = useStyles();

  if (!articles.length) {
    return (
      <Grow in>
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={3}
        >
          {infoCards.map((card) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className={classes.infoCard}
            >
              <div
                className={classes.card}
                style={{ backgroundColor: card.color }}
              >
                <Typography variant="h5">{card.title}</Typography>
                {card.info ? (
                  <Typography variant="h6">
                    <strong>
                      {card.title.split(" ")[2]} : <br /> {card.info}
                    </strong>
                  </Typography>
                ) : null}
                <Typography variant="h6">
                  Try saying: <br /> <i>{card.text}</i>
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grow>
    );
  }

  return (
    <Grow in>
      <Grid
        container
        alignItems="stretch"
        spacing={3}
        className={classes.container}
      >
        {articles.map((article, i) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            style={{ display: "flex" }}
            key={i}
          >
            <NewsCard {...article} i={i} active={active} />
          </Grid>
        ))}
      </Grid>
    </Grow>
  );
};

export default NewsCards;
