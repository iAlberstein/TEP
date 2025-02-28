import React from "react";
import "../styles/Historia.css";

function Historia() {
  return (
    <div className="historia-container">
      <div className="historia-content">
        <h1>HISTORIA</h1>
        <p>
          <strong>Un edificio único, con una historia centenaria.</strong>
        </p>
        <p>
          La Sociedad Española de Socorros Mutuos de Pigüé fue fundada el 14 de junio de 1894, apenas
          diez años después de la creación de la ciudad. Treinta años más tarde, se emprendió una gran
          iniciativa: la construcción de un teatro, convirtiéndose en la única sala concebida y edificada
          desde el inicio de la ciudad con ese propósito, inaugurado el 26 de abril de 1926.
        </p>
        <p>
          Declarado <strong>monumento histórico provincial mediante la Ley 11535</strong> en mayo de 1994, el edificio
          del Teatro Español fue diseñado por el ingeniero Marseillán, oriundo de Bahía Blanca, y
          construido por la empresa de Don Domingo Oresti. Este destacado empresario, reconocido
          por su labor en numerosas obras particulares e institucionales en Pigüé y la región, dejó un
          legado que aún es visible en la actualidad.
        </p>
        <p>
          El teatro, con su clásico formato en herradura, cuenta con palcos altos y bajos, palcos laterales
          y platea, albergando hasta 446 espectadores. Su extraordinaria acústica lo ha consolidado
          como un espacio de referencia para la cultura y las artes escénicas.
        </p>
        <p>
          Entre 2021 y 2024, la Sociedad Española estableció un convenio de uso con la Municipalidad
          de Saavedra-Pigüé, retomando una idea impulsada por Jorge Capotosti, quien no pudo
          concretarla en vida durante su gestión como concejal y secretario de cultura municipal. No
          obstante, a partir de 2025, la Sociedad Española decidió retomar la administración plena del
          teatro, con el propósito de focalizarse en la conmemoración del centenario de la construcción
          del edificio. En este nuevo ciclo, la gestión del espacio se encuentra a cargo de Anita Lopez
          Holzmann y Bruno Alberstein.
        </p>
        <p>
          De esta forma, se proyecta la puesta en valor del edificio y se garantiza el acceso transversal
          para toda la comunidad artística, reafirmando su papel fundamental en la vida cultural de
          Pigüé y la región.
        </p>
        
      </div>
      <div className="historia-image-container">
        <img
          src="/uploads/teatropanoramica.jpg"
          alt="Teatro Español Panorámica"
          className="historia-image"
        />
      </div>
    </div>
  );
}

export default Historia;