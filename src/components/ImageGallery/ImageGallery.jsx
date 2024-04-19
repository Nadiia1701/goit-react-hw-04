import ImageCard from "../ImageCard/ImageCard";

export default function ImageGallery({ items }) {
    return (
        <ul>
            {
                items.map((item) => (
                    <li key={item.id}>
                        <ImageCard urls={item.urls} description={item.description} />
                    </li>
                ))
            }
        </ul>
    );
}