import React from "react";
import SearchPresenter from "./SearchPresenter";
import { moviesApi, tvApi } from "../../api";

export default class extends React.Component {
  state = {
    movieResults: null,
    tvResults: null,
    searchTerm: "",
    loading: false,
    error: null,
  };

  handleSubmit = (event) => {
    console.log("hahah");
    event.preventDefault();
    const { searchTerm } = this.state;
    console.log("hahah1");

    if (searchTerm !== "") {
      this.searchByTerm(searchTerm);
    }
  };

  updateTerm = (event) => {
    const {
      target: { value },
    } = event;
    console.log(event.target);
    console.log(value);
    console.log(this.state.searchTerm);
    this.setState({ searchTerm: value });
  };

  searchByTerm = async () => {
    const { searchTerm } = this.state;
    this.setState({ loading: true });
    try {
      const {
        data: { results: movieResults },
      } = await moviesApi.search(searchTerm);
      this.setState({ movieResults: movieResults });
      const {
        data: { results: tvResults },
      } = await tvApi.search(searchTerm);
      this.setState({ tvResults: tvResults });
    } catch {
      this.setState({ error: "Can't find results." });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { movieResults, tvResults, searchTerm, loading, error } = this.state;
    // console.log({ movieResults });
    // console.log({ tvResults });
    return (
      <SearchPresenter
        movieResults={movieResults}
        tvResults={tvResults}
        loading={loading}
        error={error}
        searchTerm={searchTerm}
        handleSubmit={this.handleSubmit}
        updateTerm={this.updateTerm}
      />
    );
  }
}
