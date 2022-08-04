import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa";

import data from "./data";
const App = () => {
  const [people, setPeople] = useState(data);
  const [value, setValue] = useState(0);

  const checkValue = (value) => {
    if (value > people.length - 1) {
      return 0;
    }
    if (value < 0) {
      return people.length - 1;
    }
    return value;
  };

  const onPrevReview = () => {
    setValue((value) => {
      const newValue = value - 1;
      return checkValue(newValue);
    });
  };

  const onNextReview = () => {
    setValue((value) => {
      const newValue = value + 1;
      return checkValue(newValue);
    });
  };

  useEffect(() => {
    let slider = setInterval(() => {
      setValue((value) => {
        const newValue = value + 1;
        return checkValue(newValue);
      });
    }, 5000);
    return () => {
      clearInterval(slider);
    };
    // eslint-disable-next-line
  }, [value]);

  return (
    <section className="section">
      <div className="title">
        <h2>
          <span>/</span>reviews
        </h2>
      </div>
      <div className="section-center">
        {people.map((person, index) => {
          const { id, image, name, title, quote } = person;

          let position = "nextSlide";
          if (index === value) {
            position = "activeSlide";
          }
          if (
            index === value - 1 ||
            (value === 0 && index === people.length - 1)
          ) {
            position = "lastSlide";
          }

          return (
            <article className={position} key={id}>
              <img src={image} alt={name} className="person-img" />
              <h4>{name}</h4>
              <p className="title">{title}</p>
              <p className="text">{quote}</p>
              <FaQuoteRight className="icon" />
            </article>
          );
        })}
        <button className="prev" onClick={onPrevReview}>
          <FiChevronLeft />
        </button>
        <button className="next" onClick={onNextReview}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
};

export default App;
