import React, { useState, useEffect, createRef } from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import useStyles from "./styles";
import classNames from "classnames";

const NewsCard = ({
  i,
  description,
  publishedAt,
  source,
  title,
  url,
  urlToImage,
  active,
}) => {
  const imagePlaceholder =
    "https://www.industry.gov.au/sites/default/files/August%202018/image/news-placeholder-738.png";
  const classes = useStyles();
  const [elRefs, setElRefs] = useState([]);

  const scrollToRef = (ref) => {
    window.scroll(0, ref.current.offsetTop - 50);
  };

  useEffect(() => {
    setElRefs((refs) =>
      Array(20)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, []);

  useEffect(() => {
    if (i === active && elRefs[active]) {
      scrollToRef(elRefs[active]);
    }
  }, [active, elRefs, i]);

  return (
    <Card
      className={classNames(
        classes.card,
        active === i ? classes.activeCard : null
      )}
      ref={elRefs[i]}
    >
      <CardActionArea href={url} target="_blank">
        <CardMedia
          image={urlToImage || imagePlaceholder}
          className={classes.media}
        />
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {new Date(publishedAt).toDateString()}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="h2">
            {source.name}
          </Typography>
        </div>
        <Typography gutterBottom variant="h5" className={classes.title}>
          {title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary">
          Learn More
        </Button>
        <Typography variant="h5" color="textSecondary">
          {i + 1}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default NewsCard;
