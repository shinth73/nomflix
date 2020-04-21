import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import DetailTab from "./DetailTab";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 30px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const OverviewTitle = styled.h1`
  font-size: 15px;
  margin-top: 20px;
  margin-bottom: 5px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 70%;
  margin-bottom: 30px;
`;
const Icon = styled.img`
  height: 25px;
  margin-bottom: -8px;
`;
const TabContainer = styled.div`
  width: 70%;
`;

const DetailPresenter = ({ result, loading, error }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Nomflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date && result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date
                ? result.first_air_date.substring(0, 4)
                : null}
            </Item>
            <Divider>•</Divider>
            {/* {console.log(result)} */}
            <Item>
              {result.runtime === 0
                ? "?"
                : result.runtime
                ? result.runtime
                : result.episode_run_time[0]}{" "}
              min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            {result.imdb_id ? <Divider>•</Divider> : null}
            <Item>
              {console.log(result)}
              <a
                href={
                  result.imdb_id
                    ? `https://www.imdb.com/title/${result.imdb_id}/`
                    : null
                }
                target="_blank"
              >
                {result.imdb_id ? (
                  <Icon
                    src="https://www.fixinthemix.com/wp-content/uploads/2015/08/IMDb.png"
                    alt="imdb"
                  />
                ) : null}
              </a>
            </Item>
          </ItemContainer>
          <OverviewTitle>Overview</OverviewTitle>
          <Overview>{result.overview}</Overview>
          <TabContainer>
            <DetailTab result={result} />
          </TabContainer>
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;

// imdb_id: "tt3794354"  https://www.imdb.com/title/tt3794354/
// production_companies: Array(6)
// production_countries: Array(3)
// spoken_languages: Array(1)
// videos: // results: Array(6)
// <img src ="https://image.flaticon.com/icons/svg/889/889199.svg"/>
