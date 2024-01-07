import React, {useEffect, useState} from 'react';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [gameInfo, setGameInfo] = useState(null);
  const [levelIndex, setLevelIndex] = useState(0);
  const [level, setLevel] = useState(CONSTANT.LEVEL[levelIndex]);
  const [timer, setTimer] = useState(null);
  const [pause, setPause] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [su, setSu] = useState(null);
  const [suAnswer, setSuAnswer] = useState(null);
  const [selectedCell, setSelectedCell] = useState(-1);
  const [playerName, setPlayerName] = useState('');
  const [inputName, setInputName] = useState('');

  useEffect(() => {
    const loadLocalStorage = () => {
      const savedDarkMode = JSON.parse(localStorage.getItem('darkmode'));
      const savedGameInfo = JSON.parse(localStorage.getItem('game'));
      const savedPlayerName = localStorage.getItem('player_name');

      setDarkMode(savedDarkMode);
      setGameInfo(savedGameInfo);
      setPlayerName(savedPlayerName);
    };

    const initGameGrid = () => {
      // 初始化游戏格子样式
      let index = 0;

      for (let i = 0; i < Math.pow(CONSTANT.GRID_SIZE, 2); i++) {
        let row = Math.floor(i / CONSTANT.GRID_SIZE);
        let col = i % CONSTANT.GRID_SIZE;
        if (row === 2 || row === 5) cells[index].style.marginBottom = '10px';
        if (col === 2 || col === 5) cells[index].style.marginRight = '10px';

        index++;
      }
    };

    const initGame = () => {
      initGameGrid();
      // 初始化其他游戏相关逻辑
      // ...
    };

    const initCellsEvent = () => {
      cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
          if (!cell.classList.contains('filled')) {
            // Assuming you have a state variable for selected cell index
            setSelectedCell(index);

            // Assuming you have a state variable for cells
            const updatedCells = cells.map((c, i) => {
              if (i === index) {
                c.classList.remove('err');
                c.classList.add('selected');
                resetBg();
                hoverBg(index);
              } else {
                c.classList.remove('selected');
              }
              return c;
            });

            // Update the state with the modified cells
            setCells(updatedCells);
          }
        });
      });
    };

    const initNumberInputEvent = () => {
      number_inputs.forEach((button, index) => {
        button.addEventListener('click', () => {
          // Assuming you have state variables for cells, selectedCell, and
          // suAnswer
          const updatedCells = [...cells];
          const updatedSuAnswer = [...suAnswer];

          if (!updatedCells[selectedCell].classList.contains('filled')) {
            updatedCells[selectedCell].innerHTML = index + 1;
            updatedCells[selectedCell].setAttribute('data-value', index + 1);

            // Add to answer
            const row = Math.floor(selectedCell / CONSTANT.GRID_SIZE);
            const col = selectedCell % CONSTANT.GRID_SIZE;
            updatedSuAnswer[row][col] = index + 1;

            // Save game
            saveGameInfo();

            // Remove errors
            removeErr();

            // Check errors for the newly entered number
            checkErr(index + 1);

            // Add animation
            updatedCells[selectedCell].classList.add('zoom-in');
            setTimeout(() => {
              updatedCells[selectedCell].classList.remove('zoom-in');
            }, 500);

            // Check if the game is won
            if (isGameWin()) {
              removeGameInfo();
              showResult();
            }

            // Update the state with the modified cells and suAnswer
            setCells(updatedCells);
            setSuAnswer(updatedSuAnswer);
          }
        });
      });
    };

    loadLocalStorage();
    initGame();
    initCellsEvent();  // Assuming initCellsEvent and initNumberInputEvent are
                       // functions you've defined elsewhere
    initNumberInputEvent();

    if (playerName) {
      setInputName(playerName);
    } else {
      // Assuming 'name_input' is a ref created using useRef
      name_input.current.focus();
    }

  }, []);  // 空数组表示仅在组件挂载时执行

  const toggleDarkMode = () => {
    // 切换暗黑模式
    setDarkMode((prevDarkMode) => !prevDarkMode);
    const isDarkMode = !darkMode;
    localStorage.setItem('darkmode', isDarkMode);
    // chang mobile status bar color
    document.querySelector('meta[name="theme-color"')
        .setAttribute('content', isDarkMode ? '#1a1a2e' : '#fff');
  };

  const startGame = () => {
    // 开始游戏
    setStartScreenActive(false);
    setGameScreenActive(true);

    setPlayerName(name_input.value.trim());
    setLevel(CONSTANT.LEVEL_NAME[level_index]);
    showTime(seconds);

    setTimer(setInterval(() => {
      if (!pause) {
        setSeconds((prevSeconds) => prevSeconds + 1);
        setGameTime(showTime(seconds));
      }
    }, 1000));
  };

  const returnStartScreen = () => {
    // 返回开始屏幕
    clearInterval(timer);
    setPause(false);
    setSeconds(0);
    setStartScreenActive(true);
    setGameScreenActive(false);
    setPauseScreenActive(false);
    setResultScreenActive(false);
  };

  const handleLevelChange = () => {
    // 处理难度级别变化
    setLevelIndex(
        (prevIndex) =>
            prevIndex + 1 > CONSTANT.LEVEL.length - 1 ? 0 : prevIndex + 1);
    setLevel(CONSTANT.LEVEL[levelIndex]);
  };

  const handlePlayBtnClick = () => {
    // 处理Play按钮点击事件
    if (name_input.trim().length > 0) {
      initSudoku();
      startGame();
    } else {
      setNameInputErr(true);
      setTimeout(() => {
        setNameInputErr(false);
        name_input.current.focus();
      }, 500);
    }
  };

  const handleContinueBtnClick = () => {
    // 处理Continue按钮点击事件
    if (name_input.trim().length > 0) {
      loadSudoku();
      startGame();
    } else {
      setNameInputErr(true);
      setTimeout(() => {
        setNameInputErr(false);
        name_input.current.focus();
      }, 500);
    }
  };

  const handlePauseBtnClick = () => {
    // 处理Pause按钮点击事件
    setPauseScreenActive(true);
    setPause(true);
  };

  const handleResumeBtnClick = () => {
    // 处理Resume按钮点击事件
    setPauseScreenActive(false);
    setPause(false);
  };

  const handleNewGameBtnClick = () => {
    // 处理New Game按钮点击事件
    returnStartScreen();
  };

  const handleDeleteBtnClick = () => {
    // 处理Delete按钮点击事件
    setCellInnerHTML(selectedCell, '');
    setCellDataValue(selectedCell, 0);

    const row = Math.floor(selectedCell / CONSTANT.GRID_SIZE);
    const col = selectedCell % CONSTANT.GRID_SIZE;

    setSuAnswer((prevSuAnswer) => {
      const newSuAnswer = [...prevSuAnswer];
      newSuAnswer[row][col] = 0;
      return newSuAnswer;
    });

    removeErr();
  };

  return (<div className = {`app ${darkMode ? 'dark' : 'light'}`}>{
      /* 其他组件内容 */}<
          div id = 'dark-mode-toggle' onClick = {toggleDarkMode}>{
      /* 切换暗黑模式按钮 */}</div>
      {/ * ...* /}
    </div>);
};

export default App;