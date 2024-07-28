import axios, { youtubeAPI } from "./axios";
import "./Banner.css";
import React, { useEffect, useState } from "react";
import requests from "./requests";
import YouTube from "react-youtube";
import { FaBookmark, FaPlay, FaStop } from "react-icons/fa";

function Banner() {
    const [movie, setMovie] = useState([]);
    const [trailer, setTrailer] = useState();

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);

            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
            return request;
        }

        fetchData();
    }, []);
    console.log(movie);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    const playTrailer = async (movie) => {
        if (trailer) {
            setTrailer("");
        } else {
            const response = await youtubeAPI.get("/search", {
                params: {
                    q: `${
                        movie.original_title || movie.original_name
                    } official trailer`,
                },
            });
            setTrailer(response.data.items[0].id.videoId);
        }
    };

    return (
        <>
            <header
                className="banner"
                style={{
                    backgroundSize: "cover",
                    backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                    backgroundPosition: "center center",
                }}
            >
                <div className="banner__contents">
                    <h1 className="banner__title">
                        {movie?.title || movie?.name || movie?.original_name}
                    </h1>
                    <button
                        className="banner__button"
                        onClick={() => playTrailer(movie)}
                    >
                        {trailer ? (
                            <>
                                <FaStop /> <span>Stop</span>
                            </>
                        ) : (
                            <>
                                <FaPlay /> <span>Play</span>
                            </>
                        )}
                    </button>
                    <button className="banner__button">
                        <FaBookmark /> Add to Watchlist
                    </button>

                    <h1 className="banner__description">
                        {truncate(movie?.overview, 150)}
                    </h1>
                </div>

                <div className="banner--fadeBottom"></div>
            </header>
            <div>
                {trailer ? <YouTube videoId={trailer} opts={opts} /> : ""}
            </div>
        </>
    );
}

export default Banner;
