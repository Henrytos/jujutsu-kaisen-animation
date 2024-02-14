import { useState } from "react";
import "./App.css";
import { TypeAnimations, useCarousel } from "./hooks/useCarousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

function App() {
  const { carousel, nextSlide, prevSlide, slideCurrent } = useCarousel();
  const [isAnimation, setIsAnimation] = useState(false);

  const handleClickNext = () => {
    nextSlide();
    setIsAnimation(true);
    setTimeout(() => {
      setIsAnimation(false);
    }, 700);
  };

  const handleClickPrev = () => {
    prevSlide();
    setIsAnimation(true);
    setTimeout(() => {
      setIsAnimation(false);
    }, 700);
  };

  const handleClickSlide = (typeAnimation: TypeAnimations) => {
    if (typeAnimation == "bottom-right-to-top") {
      handleClickNext();
    } else if (typeAnimation == "left-to-bottom") {
      handleClickPrev();
    }
  };

  const handleClickImage = (typeAnimation: TypeAnimations, id: number) => {
    if (slideCurrent?.typeAnimation != typeAnimation) {
      if (typeAnimation == "bottom-right-to-top") {
        handleClickNext();
      } else if (typeAnimation == "left-to-bottom") {
        handleClickPrev();
      } else {
        const index = carousel.slides.findIndex((slide) => slide.id === id);
        const last = carousel.slides.findIndex(
          (slide) => slide.id == slideCurrent?.id
        );
        const quantity = last > index ? last - index : index - last;
        if ((slideCurrent?.id ?? 0) < id) {
          prevSlide(quantity);
        } else {
          nextSlide(quantity);
        }
      }
    }
  };

  return (
    <>
      <main
        className={`container ${isAnimation == false ? "" : "animation-bg"}`}
      >
        {carousel.slides.map((slide) => (
          <div key={slide.id}>
            {slide.typeAnimation.includes("rigth-to-left") && (
              <video
                autoPlay
                muted
                loop
                width={200}
                height={200}
                className="bg-video"
              >
                <source src={slide.videoUrl} type="video/mp4" />
                Your browser does not support HTML5 video.
              </video>
            )}
          </div>
        ))}
        <section className="details-carousel">
          <div className="details-carousel-content">
            <h1 style={{ color: slideCurrent?.primaryColor }}>
              {slideCurrent?.title}
            </h1>
            <p>{slideCurrent?.description}</p>
          </div>
          <div className="details-carousel-images">
            <button onClick={handleClickPrev} disabled={isAnimation}>
              <ChevronLeft />
            </button>
            {carousel.slides
              .map((slide) => (
                <img
                  src={slide.background}
                  width={50}
                  height={50}
                  key={slide.id}
                  className={`${
                    slideCurrent?.id === slide.id ? "image-active" : ""
                  }`}
                  onClick={() =>
                    handleClickImage(slide.typeAnimation, slide.id)
                  }
                  style={{
                    border: `1px solid ${slide.primaryColor}`,
                    boxShadow: `0.1rem 0.1rem 1rem ${slide.primaryColor}`,
                  }}
                />
              ))
              .reverse()}

            <button onClick={handleClickNext} disabled={isAnimation}>
              <ChevronRight />
            </button>
          </div>
        </section>
        <section className="carousel">
          <div className="carousel-items">
            {carousel.slides.map((slide) => (
              <div
                key={slide.id}
                className={`carousel-item `}
                style={{
                  animation: `1s forwards ${slide.typeAnimation}${
                    carousel.type == "reverse" ? "-reverse" : ""
                  }`,
                  backgroundImage: `url(${slide.background})`,
                }}
                onClick={() => handleClickSlide(slide.typeAnimation)}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
