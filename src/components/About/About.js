import React from "react";
import "./About.css";
import authorImage from "../../images/aboutauthor.jpg";

function About() {
  return (
    <section className="about">
      <img src={authorImage} alt="Author" className="about__image" />
      <div className="about__content">
        <h2 className="about__title">About the author</h2>
        <p className="about__text">
          Hi, I'm Amanda Hoadley. I currently work as a remote health and
          fitness coach, helping people reach their wellness goals. At the same
          time, I've been pursuing my passion for software engineering. This
          final project from TripleTen showcases my skills using HTML, CSS,
          JavaScript, and Node.js, along with connecting to a backend API. I'm
          excited to continue growing in tech and combining my inteerests in
          coaching and coding.
        </p>
        <p className="about__text">
          Through my experience with TripleTen, I’ve gained hands-on skills in
          building real-world applications, solving problems with code, and
          working with modern web technologies. I’m excited to use what I’ve
          learned to create clean, functional solutions that can help meet the
          needs of potential customers.
        </p>
      </div>
    </section>
  );
}

export default About;
