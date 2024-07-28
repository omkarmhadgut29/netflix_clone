import React, { useState } from "react";
import "./HomeScreen.css";
import Banner from "../Banner";
import Nav from "../Nav";
import requests from "../requests";
import Row from "../Row";

function HomeScreen() {
    const [trailerUrl, setTrailerUrl] = useState("");
    const [rowTitle, setRowTitle] = useState("");
    function updateSetTrailerUrl(url, title) {
        console.log(url);
        setTrailerUrl(url);
        setRowTitle(title);
    }
    return (
        <div className="homeScreen">
            <Nav />
            <Banner />
            <Row
                title="NETFLIX ORIGINALS"
                fetchUrl={requests.fetchNetflixOriginals}
                trailerUrl={trailerUrl}
                rowTitle={rowTitle}
                setTrailerUrl={updateSetTrailerUrl}
                isLargeRow
            />
            <Row
                title="TRENDING NOW"
                trailerUrl={trailerUrl}
                rowTitle={rowTitle}
                fetchUrl={requests.fetchTrending}
                setTrailerUrl={updateSetTrailerUrl}
            />
            <Row
                title="Top Rated"
                trailerUrl={trailerUrl}
                rowTitle={rowTitle}
                fetchUrl={requests.fetchTopRated}
                setTrailerUrl={updateSetTrailerUrl}
            />
            <Row
                title="Action Movies"
                trailerUrl={trailerUrl}
                rowTitle={rowTitle}
                fetchUrl={requests.fetchActionMovies}
                setTrailerUrl={updateSetTrailerUrl}
            />
            <Row
                title="Comedy Movies"
                trailerUrl={trailerUrl}
                rowTitle={rowTitle}
                fetchUrl={requests.fetchComedyMovies}
                setTrailerUrl={updateSetTrailerUrl}
            />
            <Row
                title="Horror Movies"
                trailerUrl={trailerUrl}
                rowTitle={rowTitle}
                fetchUrl={requests.fetchHorrorMovies}
                setTrailerUrl={updateSetTrailerUrl}
            />
            <Row
                title="Romance Movies"
                trailerUrl={trailerUrl}
                rowTitle={rowTitle}
                fetchUrl={requests.fetchRomanceMovies}
                setTrailerUrl={updateSetTrailerUrl}
            />
            <Row
                title="Documantaries"
                trailerUrl={trailerUrl}
                rowTitle={rowTitle}
                fetchUrl={requests.fetchDocumantaries}
                setTrailerUrl={updateSetTrailerUrl}
            />
        </div>
    );
}

export default HomeScreen;
