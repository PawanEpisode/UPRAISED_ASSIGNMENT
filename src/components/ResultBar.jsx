import React, { useEffect, useRef, useState } from "react";
import Outer from "../assets/Outer.png";
import SquareBlank from "../assets/SquareBlank.png";
import RectangleBlank from "../assets/RectangleBlank.png";

import "./ResultBar.scss";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    let id = setInterval(() => {
      savedCallback.current();
    }, delay);
    return () => clearInterval(id);
  }, [delay]);
}

const ResultBar = ({ numberOfQuestion, correctAnswerCount }) => {
  const [counter, setCounter] = useState(0);
  const resultPercent = (correctAnswerCount * 100) / numberOfQuestion;
  const resultDegree = (resultPercent * 180) / 100 || 1;

  useInterval(() => {
    if (counter < resultPercent) {
      setCounter(counter + 1);
    }
  }, resultDegree / 2);

  return (
    <>
      <div className="outergradient">
        <svg
          className="outergradientSVG"
          xmlns="http://www.w3.org/2000/svg"
          width="500"
          height="260"
          viewBox="0 0 500 260"
          fill="none"
        >
          <path
            d="M490 250C490 117.452 382.548 10 250 10C117.452 10 10 117.452 10 250"
            stroke="url(#paint0_linear_86_5)"
            stroke-width="20"
            stroke-linecap="round"
          />
          <defs>
            <linearGradient
              id="paint0_linear_86_5"
              x1="490"
              y1="10"
              x2="10"
              y2="10"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#44B77B" />
              <stop offset="0.479043" stop-color="#FFD033" />
              <stop offset="1" stop-color="#FF3B3F" />
            </linearGradient>
          </defs>
        </svg>
        <img src={Outer} alt="Outer" className="backgroundCircle" />
        <div className="outer">
          <svg
            className="outerSVG"
            xmlns="http://www.w3.org/2000/svg"
            width="320"
            height="320"
            viewBox="0 0 320 320"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M160 320C248.366 320 320 248.366 320 160C320 71.6344 248.366 0 160 0C71.6344 0 0 71.6344 0 160C0 248.366 71.6344 320 160 320Z"
              fill="white"
            />
          </svg>
          <div className="inner">
            <svg
              className="innerSVG"
              xmlns="http://www.w3.org/2000/svg"
              width="280"
              height="280"
              viewBox="0 0 280 280"
              fill="none"
            >
              <path
                d="M279 140C279 216.768 216.768 279 140 279C63.2324 279 1 216.768 1 140C1 63.2324 63.2324 1 140 1C216.768 1 279 63.2324 279 140Z"
                stroke="#EBEDF5"
                stroke-width="2"
              />
            </svg>
            <div className="innerMore">
              <svg
                className="innerMoreSVG"
                xmlns="http://www.w3.org/2000/svg"
                width="430"
                height="430"
                viewBox="0 0 430 430"
                fill="none"
              >
                <g opacity="0.0414109" filter="url(#filter0_f_86_9)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M215 375C303.366 375 375 303.366 375 215C375 126.634 303.366 55 215 55C126.634 55 55 126.634 55 215C55 303.366 126.634 375 215 375Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_f_86_9"
                    x="0.634365"
                    y="0.634365"
                    width="428.731"
                    height="428.731"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    />
                    <feGaussianBlur
                      stdDeviation="27.1828"
                      result="effect1_foregroundBlur_86_9"
                    />
                  </filter>
                </defs>
              </svg>
              <div className="innerMost">
                <svg
                  className="innerMostSVG"
                  xmlns="http://www.w3.org/2000/svg"
                  width="160"
                  height="292"
                  viewBox="0 0 160 292"
                  fill="none"
                  style={{
                    "--rotation": `${resultDegree - 90}deg`,
                    "--animationDuration": `${resultDegree * 50}ms`,
                  }}
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M79.6683 0C78.4606 0 77.375 0.73619 76.9281 1.85813L0 195H1.80997C0.624386 200.479 0 206.166 0 212C0 256.183 35.8172 292 80 292C124.183 292 160 256.183 160 212C160 206.166 159.376 200.479 158.19 195H159.356L154.771 183.49C154.494 182.764 154.206 182.043 153.909 181.327L82.4084 1.85789C81.9615 0.736075 80.8759 0 79.6683 0Z"
                    fill="#1E1E28"
                  />
                </svg>
                <div className="value">
                  <img src={SquareBlank} alt="SquareBlank" />
                  <img src={RectangleBlank} alt="RectangleBlank" />
                  {`${counter}%`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultBar;
