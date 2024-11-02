import React from "react";

const HeroTitles = () => {
  return (
    <section className="container w-1/3 mx-auto text-center mb-10">
      <h1 className="italic mb-4 uppercase leading-relaxed">
        Quelque chose de vieux, Quelque chose de neuf, Quelque chose
        d&apos;emprunté, Quelque chose de bleu
      </h1>

      <p className="mb-8 uppercase leading-loose space-x-5 tracking-wider">
        Laissez-vous seduire par cette ancienne coutume et creons ensemble un
        bijou, LE bijou qui vous ressemble, qui vous honore et qui rend hommage
        à votre lignee familiale.
      </p>
      <a
        href="/tradition"
        className="bg-gray-800 py-2 px-4 rounded-md shadow-md text-[var(--whiteSmoke)] tracking-wider"
      >
        Etes-vous curieuse ? Si oui, c&apos;est par ici ➡️
      </a>
    </section>
  );
};

export default HeroTitles;
