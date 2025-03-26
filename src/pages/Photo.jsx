import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Photo() {
  const images = [
    { src: 'https://petropavlivka.city/upload/article/o_1gor0ed5m1sck1jvl1k8313he1suq1r.jpg', alt: 'Кит' },
    { src: 'https://ukurier.gov.ua/media/images/2021-6/modello-massa-balene.jpeg', alt: 'Кит' },
    { src: 'https://unn.ua/img/2022/11/01/1700239100-1563-large.webp', alt: 'Кит' },
    { src: 'https://zn.ua/img/forall/u/14/3/%D0%BA%D0%B8%D1%82%D1%8B.jpg', alt: 'Кит' },
    { src: 'https://babel.ua/static/content/nf3ydfsy/thumbs/660x371/c/05/7f2111cbef86a223862e0fdd2577705c.jpg?v=6979, alt: 'Кит' },
    { src: 'https://santmat.net.ua/wp-content/uploads/2024/01/img_3759.jpeg', alt: 'Кит' }
  ];

  return (
    <main className="container px-4 py-4 flex-grow-1">
      <article>
        <h2 className="h2 text-success mb-4">Фотогалерея китів</h2>
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : "false"}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>
          <div className="carousel-inner">
            {images.map((image, index) => (
              <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                <a href={image.src} target="_blank" rel="noopener noreferrer">
                  <img src={image.src} className="d-block w-100" alt={image.alt} />
                </a>
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </article>
    </main>
  );
}

export default Photo;