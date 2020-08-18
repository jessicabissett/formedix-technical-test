import React, { useState, useEffect } from "react";
import Gallery from "react-grid-gallery";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const SearchForm = () => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);

  const getPictures = async input => {
    fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=40f52df4fed8a6a536190003488febc5&text=${input}&page=${page}&per_page=500&sort=&safe_search=&format=json&nojsoncallback=1`
    )
      .then(response => response.json())
      .then(result => {
        setItems(result);
        setIsFetching(false);
      });
  };

  const keyPressed = event => {
    if (event.key === "Enter") {
      getPictures(input);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", function() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setIsFetching(true);
      }
    });
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    var newPage = page + 1;
    setPage(newPage);
    getPictures(input);
  }, [isFetching]);

  return (
    <div className="s003">
      <form
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <div className="inner-form">
          <div className="input-field second-wrap">
            <input
              id="search"
              type="text"
              placeholder="Search Flickr"
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => keyPressed(e)}
            />
          </div>
          <div className="input-field third-wrap">
            <button
              className="btn-search"
              type="button"
              onClick={() => getPictures(input)}
            >
              <svg
                className="svg-inline--fa fa-search fa-w-16"
                aria-hidden="true"
                data-prefix="fas"
                data-icon="search"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="images">
          {items && items.photos && (
            <Gallery
              margin={5}
              maxRows={50}
              enableImageSelection={false}
              images={items.photos.photo.map(item => ({
                src: `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`,
                thumbnail: `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`,
                thumbnailWidth: 550,
                thumbnailHeight: 500,
                caption: item.title
              }))}
            />
          )}
          {isFetching && (
            <div className="loader">
              <Loader
                type="ThreeDots"
                color="#333333"
                height={100}
                width={100}
                timeout={3000} //3 secs
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
