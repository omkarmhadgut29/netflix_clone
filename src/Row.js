import axios, { youtubeAPI } from "./axios";
import React, { useEffect, useState } from "react";
import "./Row.css";
import YouTube from "react-youtube";
// import movieTrailer from "movie-trailer";

function Row({
    title,
    fetchUrl,
    trailerUrl,
    rowTitle,
    setTrailerUrl,
    isLargeRow,
}) {
    const [movies, setMovies] = useState([]);
    // const base_url = "https://image.tmdb.org/t/p/original/";
    const base_url = "https://www.themoviedb.org/t/p/w220_and_h330_face/";
    // const base_url = "https://image.tmdb.org/t/p/w500/";
    // const base_url = "https://image.tmdb.org/t/p/w200/";

    useEffect(() => {
        // Fetch data
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    // console.table(movies);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    const handleClick = async (movie) => {
        if (trailerUrl) {
            setTrailerUrl("", "");
        } else {
            const response = await youtubeAPI.get("/search", {
                params: {
                    q: `${
                        movie.original_title || movie.original_name
                    } official trailer`,
                },
            });
            // setTrailerUrl(response.data.items[0].id.videoId, title);
            setTrailerUrl(response.data.items[0].id.videoId, title);
        }
    };
    let imgCounter = 1;
    const [isHovered, setHover] = useState(false);
    return (
        <div className="row">
            <h2>{title} </h2>

            <div className="row__posters">
                {movies.map((movie) => (
                    <>
                        <img
                            key={imgCounter++}
                            className={`row__poster ${
                                isLargeRow && "row__posterLarge"
                            }`}
                            onClick={() => handleClick(movie)}
                            src={`${base_url}${
                                // isLargeRow ? movie.poster_path : movie.backdrop_path
                                movie.poster_path
                            }`}
                            alt={movie.name}
                            onMouseOver={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                        />
                        {isHovered ? (
                            <button
                                style={{
                                    backgroundColor: "black",
                                    position: "absolute",
                                    top: "5px",
                                    right: "5px",
                                }}
                            >
                                Play
                            </button>
                        ) : (
                            ""
                        )}
                    </>
                ))}
            </div>

            {trailerUrl && rowTitle === title && (
                <YouTube videoId={trailerUrl} opts={opts} />
            )}
        </div>
    );
}

export default Row;
