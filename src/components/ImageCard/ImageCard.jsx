import css from "./ImageCard.module.css"

export default function ImageCard({ urls, description, onClick }) {
    const handleClick = () => {
        onClick(urls.small, urls.regular);
    };

    return (
        <div onClick={handleClick}>
            <img className={css.img} src={urls.small} alt={description} />
        </div>
    );
}