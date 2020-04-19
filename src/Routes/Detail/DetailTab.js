import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import styled from "styled-components";

const VideoContainer = styled.div`
  margin-top: 10px;
  background-color: gray;
  background: rgba(255, 255, 255, 0.1);
  width: 100%;
  padding: 20px 0px 40px 30px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 160px);
  grid-template-rows: repeat(auto-fill, 100px);
  align-content: space-between;
  column-gap: 20px;
  row-gap: 50px;
  border-radius: 10px;
`;
const InfoContainer = styled.div`
  margin-top: 10px;
  background-color: gray;
  background: rgba(255, 255, 255, 0.1);
  width: 100%;
  padding: 20px 0px 40px 30px;
  border-radius: 10px;
`;

const Videodiv = styled.div`
  width: 160px;
  height: 90px;
`;

const Iframe = styled.iframe`
  border-radius: 5px;
`;
const IframeTitle = styled.div`
  margin-top: 5px;
  opacity: 0.7;
  font-size: 10px;
`;
const ProdcutionContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  width: 95%;
  border-bottom: 1px solid black;
`;

const ProductionIcon = styled.img`
  /* margin-top: -10px; */
  height: 30px;
  margin-right: 20px;
  margin-bottom: 20px;
`;
const CountryTitle = styled.span`
  margin-top: 15px;
  font-size: 12px;
  opacity: 0.7;
`;

const CountryContainer = styled.span`
  margin-top: 20px;
  font-size: 12px;
  opacity: 0.7;
`;

const HomePageContainer = styled.div`
  margin-top: 10px;
  font-size: 12px;
  opacity: 0.7;
`;
const HomePageLink = styled.a`
  margin-top: 10px;
  font-size: 12px;
  text-decoration: underline;
  opacity: 0.7;
`;

const SeasonsContainer = styled.div`
  margin-top: 10px;
  font-size: 12px;
  opacity: 0.7;
  width: 98%;
`;

const SeasonContainer = styled.div`
  margin-top: 10px;
  background-color: gray;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  opacity: 1;
  width: 97%;
  border-radius: 10px;
`;

const SeasonPoster = styled.img`
  margin-top: 10px;
  height: 100px;
  margin-right: 20px;
  margin-bottom: 10px;
  border-radius: 5px;
  margin-left: 20px;
`;

const SeasonTitle = styled.div`
  margin-top: 5px;
  opacity: 1;
  font-size: 13px;
`;
const SeasonAirdate = styled.div`
  margin-top: 5px;
  opacity: 0.8;
  font-size: 10px;
`;
const SeasonEpisod = styled.div`
  margin-top: 5px;
  opacity: 0.8;
  font-size: 10px;
`;
const SeasonOverview = styled.div`
  margin-top: 5px;
  opacity: 0.8;
  font-size: 11px;
`;
const SeasonContentContainer = styled.div`
  margin-top: 5px;
  width: 100%;
`;

export default (props) => (
  <Tabs>
    <TabList>
      <Tab>Videos</Tab>
      <Tab>Movei Info / Season</Tab>
    </TabList>

    <TabPanel>
      <VideoContainer>
        {props.result.videos.results.map((video) => (
          <Videodiv key={video.key}>
            <Iframe
              src={`https://www.youtube.com/embed/${video.key}`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="video"
              width="160px"
              height="90px"
            />
            <IframeTitle>
              {video.name.length > 60
                ? `${video.name.substring(0, 60)}...`
                : video.name}
            </IframeTitle>
          </Videodiv>
        ))}
      </VideoContainer>
    </TabPanel>

    <TabPanel>
      <InfoContainer>
        <ProdcutionContainer>
          {props.result.production_companies.map((com) =>
            com.logo_path ? (
              <ProductionIcon
                key={com.id}
                src={`https://image.tmdb.org/t/p/original/${com.logo_path}`}
                alt="company"
              />
            ) : null
          )}
        </ProdcutionContainer>
        <CountryTitle>Productionc Country : </CountryTitle>
        <CountryContainer>
          {props.result.production_countries
            ? props.result.production_countries.map((com) => (
                <span key={com.iso_3166_1}> {com.name} </span>
              ))
            : "None"}
        </CountryContainer>
        <HomePageContainer>
          <span>HomePage : </span>
          <HomePageLink href={props.result.homepage} target="_blank">
            {props.result.homepage ? props.result.homepage : "None"}
          </HomePageLink>
        </HomePageContainer>
        <SeasonsContainer>
          {props.result.seasons &&
            props.result.seasons.map((season) =>
              season.poster_path ? (
                <SeasonContainer key={season.id}>
                  <SeasonPoster
                    src={`https://image.tmdb.org/t/p/original/${season.poster_path}`}
                    alt="season"
                  />
                  <SeasonContentContainer>
                    <SeasonTitle>
                      {season.name.length > 60
                        ? `${season.name.substring(0, 60)}...`
                        : season.name}
                    </SeasonTitle>
                    <SeasonAirdate>Air Date : {season.air_date}</SeasonAirdate>
                    <SeasonEpisod>
                      Episode Count : {season.episode_count}
                    </SeasonEpisod>
                    <SeasonOverview>
                      Overview :
                      {season.overview.length > 400
                        ? `${season.overview.substring(0, 400)}...`
                        : season.overview}
                    </SeasonOverview>
                  </SeasonContentContainer>
                </SeasonContainer>
              ) : null
            )}
        </SeasonsContainer>
      </InfoContainer>
    </TabPanel>
  </Tabs>
);
