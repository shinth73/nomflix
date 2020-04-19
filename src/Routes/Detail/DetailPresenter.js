import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import Helmet from "react-helmet"
import Loader from "Components/Loader"

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`

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
`

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`

const Data = styled.div`
  width: 70%;
  margin-left: 30px;
`

const Title = styled.h3`
  font-size: 32px;
`

const ItemContainer = styled.div`
  margin: 20px 0;
`
const ProdcutionContainer = styled.div``

const Item = styled.span``

const Divider = styled.span`
  margin: 0 10px;
`

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`

const Icon = styled.img`
  height: 35px;
  margin-left: 10px;
  margin-bottom: -11px;
`
const ProductionIcon = styled.img`
  margin-top: -10px;
  height: 15px;
  margin-right: 20px;
  margin-bottom: 10px;
`
const VideoTitle = styled.h1`
  margin-top: 20px;
`
const VideoContainer = styled.div`
  margin-top: 10px;
  background-color: gray;
  background: rgba(255, 255, 255, 0.1);
  /* width: 560px; */
  width: 70%;
  padding: 25px 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 160px);
  grid-template-rows: repeat(auto-fill, 100px);
  align-content: space-between;
  column-gap: 20px;
  row-gap: 50px;
  border-radius: 10px;
`
const Videodiv = styled.div`
  width: 160px;
  height: 90px;
`

const Iframe = styled.iframe`
  border-radius: 5px;
`
const IframeTitle = styled.div`
  margin-top: 5px;
  opacity: 0.7;
  font-size: 10px;
`

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
          {result.original_title ? result.original_title : result.original_name} | Nomflix
        </title>
      </Helmet>
      <Backdrop bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`} />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>{result.original_title ? result.original_title : result.original_name}</Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime && result.runtime ? result.runtime : result.episode_run_time[0]} min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1 ? genre.name : `${genre.name} / `
                )}
            </Item>
            <Item>
              {console.log(result)}
              <a
                href={result.imdb_id ? `https://www.imdb.com/title/${result.imdb_id}/` : null}
                target="_blank"
              >
                {result.imdb_id ? (
                  <Icon
                    src="https://cdn.icon-icons.com/icons2/564/PNG/512/IMDb_icon-icons.com_54172.png"
                    alt="imdb"
                  />
                ) : null}
              </a>
            </Item>
          </ItemContainer>
          <ProdcutionContainer>
            {result.production_companies.map((com) =>
              com.logo_path ? (
                <ProductionIcon
                  key={com.id}
                  src={`https://image.tmdb.org/t/p/original/${com.logo_path}`}
                  alt="company"
                />
              ) : null
            )}
          </ProdcutionContainer>
          {/* https://image.tmdb.org/t/p/original/ */}
          <Overview>{result.overview}</Overview>
          <VideoTitle>Videos</VideoTitle>
          <VideoContainer>
            {result.videos.results.map((video) => (
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
                  {video.name.length > 60 ? `${video.name.substring(0, 60)}...` : video.name}
                </IframeTitle>
              </Videodiv>
            ))}
          </VideoContainer>
        </Data>
      </Content>
    </Container>
  )

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
}

export default DetailPresenter

// imdb_id: "tt3794354"  https://www.imdb.com/title/tt3794354/
// production_companies: Array(6)
// production_countries: Array(3)
// spoken_languages: Array(1)
// videos: // results: Array(6)
// <img src ="https://image.flaticon.com/icons/svg/889/889199.svg"/>
