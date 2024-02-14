import { useState } from "react";

export type TypeAnimations =
  | "rigth-to-left"
  | "left-to-bottom"
  | "bottom-to-rigth"
  | "bottom-right-to-top"
  | "rigth-to-left-reverse"
  | "left-to-bottom-reverse"
  | "bottom-to-rigth-reverse"
  | "bottom-right-to-top-reverse";
interface Slide {
  id: number;
  typeAnimation: TypeAnimations;
  background: string;
  title: string;
  description: string;
  primaryColor: string;
  secundaryColor: string;
  videoUrl: string;
}

interface Carousel {
  slides: Slide[];
  type: "" | "reverse";
}

export const useCarousel = () => {
  const [carousel, setSlides] = useState<Carousel>({
    slides: [
      {
        id: 1,
        typeAnimation: "rigth-to-left",
        background: "/public/images/geto.png",
        title: "Suguru Geto",
        description:
          "Impedir meus planos ninguém vai! Esse é o Cortejo do Youkais! Não me culpem em segundos eu trarei seu fim! Em um loop, de exorcizar e consumir!",
        primaryColor: "#BF7E8A",
        secundaryColor: "#0D0D0D",
        videoUrl:
          "https://utfs.io/f/2fd72636-7dda-41d6-bb44-4315075be3d0-befkad.mp4",
      },
      {
        id: 2,
        typeAnimation: "left-to-bottom",
        background: "/public/images/sukuna.png",
        title: "Ryomen Sukuna",
        description:
          "Nós lutaremos até a morte. Se você vencer, eu irei salvá-lo sem minhas condições e se eu vencer, você ganhará vida sob minhas ordens.",
        primaryColor: "#D96F66",
        secundaryColor: "#0D0D0D",
        videoUrl:
          "https://utfs.io/f/f3da367f-eb4c-4fd6-b9a9-13bdc70c3597-nvf3vp.mp4",
      },
      {
        id: 3,
        typeAnimation: "bottom-to-rigth",
        background: "/public/images/gojo.png",
        title: "Satoro Gojo",
        description:
          "Afinal, eu sou o mais forte que existe. Morrer para vencer e arriscar a morte para vencer são coisas completamente diferentes. Tudo o que estou sentindo agora é a alegria deste mundo.",
        primaryColor: "#1B1E59",
        secundaryColor: "#E3DCF2",
        videoUrl:
          "https://utfs.io/f/4d98ad06-1003-4fea-953b-4bc28099f876-f4038b.mp4",
      },
      {
        id: 4,
        typeAnimation: "bottom-to-rigth",
        background: "/public/images/yuta.png",
        title: "Yuta Okkotsu",
        description:
          "Para quebrar maldições, primeiro você precisa entendê-las A maldição colocada em você também pode salvar pessoas, dependendo de como for usada.",
        primaryColor: "#323640",
        secundaryColor: "#898C88",
        videoUrl:
          "https://utfs.io/f/437fd76d-d19a-41ff-b586-89636581f1ac-v0608y.mp4",
      },
      {
        id: 5,
        typeAnimation: "bottom-right-to-top",
        background: "/public/images/toji.png",
        title: "Toji Fushigoro",
        description:
          "pensei que eu... finalmente tinha engolido esse orgulho de merda...mas acho que eu tava errado - falava o assassino de feiticeiros Toji Fushiguro, onde se encontrava quase morrendo pelo seu ferimento gigantesco vindo de seu lado esquerdo.",
        primaryColor: "#081E36",
        secundaryColor: "#F2E2DF",
        videoUrl:
          "https://utfs.io/f/9203ed8b-f2b6-4cf6-8e98-fb91a1c0b8c1-o5zz6p.mp4",
      },
    ],
    type: "",
  });

  const nextSlide = (quantity: number = 1) => {
    let cloneSlides: Slide[] = [...carousel.slides];
    for (let i = 1; i <= quantity; i++) {
      cloneSlides = cloneSlides.map((slide, i) => {
        if (i != cloneSlides.length - 1) {
          return {
            ...slide,
            typeAnimation: cloneSlides[i + 1].typeAnimation,
          };
        } else {
          return {
            ...slide,
            typeAnimation: cloneSlides[0].typeAnimation,
          };
        }
      });
    }

    setSlides({ slides: cloneSlides, type: "" });
  };
  const prevSlide = (quantity: number = 1) => {
    let cloneSlides: Slide[] = [...carousel.slides];
    for (let i = 1; i <= quantity; i++) {
      cloneSlides = cloneSlides.map((slide, i) => {
        if (i != 0) {
          return {
            ...slide,
            typeAnimation: cloneSlides[i - 1].typeAnimation,
          };
        } else {
          return {
            ...slide,
            typeAnimation: cloneSlides[cloneSlides.length - 1].typeAnimation,
          };
        }
      });
    }

    setSlides({ slides: cloneSlides, type: "reverse" });
  };

  const slideCurrent = carousel.slides.find((slide) =>
    slide.typeAnimation.includes("rigth-to-left")
  );
  return {
    carousel,
    nextSlide,
    prevSlide,
    slideCurrent,
  };
};
