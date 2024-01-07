// pages/index.js
import Head from 'next/head';

const Home = () => {
  return (
    <>
      {/* top nav */}
      <nav>
        <div className="nav-container">
          <a href="#" className="nav-logo">
            Sudoku
          </a>
          <div className="dark-mode-toggle" id="dark-mode-toggle">
            <i className="bx bxs-sun"></i>
            <i className="bx bxs-moon"></i>
          </div>
        </div>
      </nav>
      {/* end top nav */}

      {/* main */}
      <div className="main">
        <div className="screen">
          {/* start screen */}
          <div className="start-screen active" id="start-screen">
            <input type="text" placeholder="Your name" maxLength="11" className="input-name" id="input-name" />
            <div className="btn" id="btn-level">
              Easy
            </div>
            <div className="btn" id="btn-continue">Continue</div>
            <div className="btn btn-blue" id="btn-play">
              New game
            </div>
          </div>
          {/* end start screen */}

          {/* game screen */}
          <div className="main-game" id="game-screen">
            <div className="main-sudoku-grid">
              {/* 81 cells */}
              {/* Your grid cells go here */}
            </div>

            <div className="main-game-info">
              <div className="main-game-info-box main-game-info-name">
                <span id="player-name">tuat</span>
              </div>
              <div className="main-game-info-box main-game-info-level">
                <span id="game-level">Easy</span>
              </div>
            </div>

            <div className="main-game-info-box main-game-info-time">
              <span id="game-time">10:20</span>
              <div className="pause-btn" id="btn-pause">
                <i className="bx bx-pause"></i>
              </div>
            </div>

            <div className="numbers">
              {/* Your number buttons go here */}
              <div className="delete" id="btn-delete">
                X
              </div>
            </div>
          </div>
          {/* end game screen */}

          {/* pause screen */}
          <div className="pause-screen" id="pause-screen">
            <div className="btn btn-blue" id="btn-resume">
              Resume
            </div>
            <div className="btn" id="btn-new-game">
              New game
            </div>
          </div>
          {/* end pause screen */}

          {/* result screen */}
          <div className="result-screen" id="result-screen">
            <div className="congrate">Competed</div>
            <div className="info">Time</div>
            <div id="result-time"></div>
            <div className="btn" id="btn-new-game-2">
              New game
            </div>
          </div>
          {/* end result screen */}
        </div>
      </div>
      {/* end main */}

      <script src="/static/js/constant.js"></script>
      <script src="/static/js/sudoku.js"></script>
      <script src="/static/js/app.js"></script>
    </>
  );
};

export default Home;

