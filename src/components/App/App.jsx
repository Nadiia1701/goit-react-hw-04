import { useEffect, useState } from 'react'
import { fetchPhotos } from "../../fetchPhotos";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader"
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn"
import SearchBar from "../SearchBar/SearchBar"

export default function App() {

  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const handleSearch = async (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setPhotos([]);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (query === "") {
      return
    }
    async function getPhotos() {
      try {
        setError(false);
        setIsLoading(true);
        const data = await fetchPhotos(query, page);
        setPhotos((prevPhotos) => {
          return [...prevPhotos, ...data];
        })
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false)
      }
    }
    getPhotos();
  }, [page, query]);
    
  return (
    <div>
      <h1>Image Gallery</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage />}
      {isLoading && <Loader />}
      {photos.length > 0 && <ImageGallery items={photos} />}
      {photos.length > 0 && !isLoading && <LoadMoreBtn onClick={handleLoadMore} />}
    </div>
  )
}
