import React from "react";

const HeroTitles = () => {
  return (
    <section className="container mx-auto text-center mb-10">
      <h1 className="text-4xl font-semi-bold italic mb-4 uppercase">
        Quelque chose de vieux, Quelque chose de neuf, Quelque chose
        d&apos;emprunté, Quelque chose de bleu
      </h1>

      <h2 className="text-lg font-light mb-8 uppercase">
        Laissez-vous séduire par cette ancienne coutume et créons ensemble un
        bijou, LE bijou qui vous ressemble, qui vous honore et qui rend hommage
        à votre lignée familiale.
      </h2>
      <a
        href="/tradition"
        className="bg-gray-800 py-2 px-4 rounded-md shadow-md"
        style={{ color: "var(--whiteSmoke)" }}
      >
        Êtes-vous curieuse ? Si oui, c&apos;est par ici
      </a>
    </section>
  );
};

export default HeroTitles;
