import './LeftBar.css';
import React, { useState, useCallback } from 'react';
import AccrdGen1 from '../accordions/AccrdGen1';
import AccrdRsk1 from '../accordions/AccrdRsk1';
import AccrdPrp from '../accordions/AccrdPrp';
import useInfo from '../../hooks/use-info';
import Modal from '../tools/Modal';
import guide from '../../img/guide2.png';
import nstreets from '../../img/nstreets.svg';
import { MdStackedBarChart } from 'react-icons/md';
import { FaRoad, FaFilter, FaMagnifyingGlassChart } from 'react-icons/fa6';
import { CgFileDocument } from 'react-icons/cg';

const LeftBar = () => {
  console.log(
    'leftbarleftbarleftbarleftbarleftbarleftbarleftbarleftbarleftbarleftbarleftbarleftbarleftbarleftbarleftbarleftbarleftbarleftbarleftbarleftbarleftbarleftbarleftbarleftbar'
  );
  const {
    bar,
    setBar,
    left,
    setLeft,
    right,
    setRight,
    setRsk,
    reset,
    // allset,
    setPrpall,
    scrn,
  } = useInfo();

  const [showModal, setShowModal] = useState(false);

  const handleModOpen = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleModClose = useCallback(() => {
    setShowModal(false);
  }, []);

  const toggleLeft = useCallback(() => {
    if (scrn < 1015) {
      setRight(false);
    }
    setLeft((prevLeft) => !prevLeft);
  }, [scrn, setLeft, setRight]);

  const toggleRight = useCallback(() => {
    if (scrn < 1015) {
      setLeft(false);
    }
    setRight((prevRight) => !prevRight);
  }, [scrn, setLeft, setRight]);

  const handleSetBar = useCallback(
    (newBar, resetRsk = null, propAll = false) => {
      if (bar !== newBar) {
        setBar(newBar);
        reset();
        setRsk(resetRsk);
        if (propAll) setPrpall(true);
      }
    },
    [bar, reset, setBar, setRsk, setPrpall]
  );

  return (
    <div>
      <div className="left_column">
        <a href="./">
          <img src={nstreets} alt="n-street" width="32px" height="24px" />
          <div className="hvd_title">도시지역 이면도로 현황</div>
        </a>

        <div className="titleline"></div>

        <div
          className={`genBT ${bar === 1 ? 'active' : ''}`}
          onClick={() => handleSetBar(1)}
        >
          <div className="topicons">
            <MdStackedBarChart className="charticon" />
          </div>
          <div className="hvd">지역 일반현황</div>
        </div>

        <div
          className={`riskBT ${bar === 2 ? 'active' : ''}`}
          onClick={() => handleSetBar(2, '교통사고')}
        >
          <div className="topicons">
            <MdStackedBarChart className="charticon" />
          </div>
          <div className="hvd">교통사고 위험도</div>
        </div>

        <div
          className={`propBT ${bar === 4 ? 'active' : ''}`}
          onClick={() => handleSetBar(4, null, true)}
        >
          <div className="topicons">
            <FaRoad className="roadicon" />
          </div>
          <div className="hvd">이면도로 실태조사</div>
        </div>

        <div className="filter">
          <div
            className={`bottom_cont ${left ? 'active' : ''}`}
            onClick={toggleLeft}
          >
            <div className="bottomicons">
              <FaFilter className="filtericon" />
            </div>
            <div className="hvd_bottom">필터 도구</div>
          </div>
        </div>

        <div className="search">
          <div
            className={`bottom_cont ${right ? 'active' : ''}`}
            onClick={toggleRight}
          >
            <div className="bottomicons">
              <FaMagnifyingGlassChart className="searchicon" />
            </div>
            <div className="hvd_bottom">속성/검색 도구</div>
          </div>
        </div>

        <div className="guide">
          <div
            className={`bottom_cont ${showModal ? 'active' : ''}`}
            onClick={handleModOpen}
          >
            <div className="bottomicons">
              <CgFileDocument className="guideicon" />
            </div>
            <div className="hvd_bottom">데이터 설명서</div>
          </div>
        </div>
      </div>

      {left && bar === 1 && (
        <div className="detail_div">
          <div className="dtl_ttl">지역 일반현황</div>
          <div className="accordion_div">
            <AccrdGen1 />
          </div>
        </div>
      )}

      {left && bar === 2 && (
        <div className="detail_div">
          <div className="dtl_ttl">교통사고 위험도</div>
          <div className="accordion_div">
            <AccrdRsk1 />
          </div>
        </div>
      )}

      {left && bar === 4 && (
        <div className="detail_div">
          <div className="dtl_ttl">이면도로 실태조사</div>
          <div className="accordion_div">
            <AccrdPrp />
          </div>
        </div>
      )}

      {showModal && (
        <Modal onClose={handleModClose}>
          <img
            src={guide}
            alt="guide1"
            height={scrn < 1015 ? '250%' : '400%'}
          />
        </Modal>
      )}
    </div>
  );
};

export default LeftBar;

// import './LeftBar.css';
// import React, { useState } from 'react';
// import AccrdGen1 from '../accordions/AccrdGen1';
// import AccrdRsk1 from '../accordions/AccrdRsk1';
// import AccrdPrp from '../accordions/AccrdPrp';
// import useInfo from '../../hooks/use-info';
// import Modal from '../tools/Modal';
// import guide from '../../img/guide2.png';
// import nstreets from '../../img/nstreets.svg';
// import { MdStackedBarChart } from 'react-icons/md';
// import { FaRoad, FaFilter, FaMagnifyingGlassChart } from 'react-icons/fa6';
// import { CgFileDocument } from 'react-icons/cg';

// const LeftBar = () => {
//   const {
//     bar,
//     setBar,
//     left,
//     setLeft,
//     right,
//     setRight,
//     setRsk,
//     reset,
//     allset,
//     setPrpall,
//     scrn,
//   } = useInfo();
//   //Modal/////////////////////////////////////////////////////////////
//   const [showModal, setShowModal] = useState(false);
//   const handleModClose = () => {
//     setShowModal(false);
//   };

//   const handleModOpen = () => {
//     setShowModal(true);
//   };

//   const modal = (
//     <Modal onClose={handleModClose}>
//       <img src={guide} alt="guide1" height={scrn < 1015 ? '250%' : '400%'} />
//     </Modal>
//   );
//   ///////////////////////////////////////////////////////////////
//   return (
//     <div>
//       <div className="left_column">
//         <a href="./">
//           <img src={nstreets} alt="n-street" width="32px" height="24px" />
//           <div className="hvd_title">도시지역 이면도로 현황</div>
//         </a>

//         <div className="titleline"></div>

//         <div
//           className={`genBT ${bar === 1 ? 'active' : ''}`}
//           onClick={() => {
//             setBar(1);
//             // setRsk('교통사고');
//             reset();
//           }}
//         >
//           <div className="topicons">
//             <MdStackedBarChart className="charticon" />
//           </div>
//           <div className="hvd">지역 일반현황</div>
//         </div>

//         <div
//           className={`riskBT ${bar === 2 ? 'active' : ''}`}
//           onClick={() => {
//             setBar(2);
//             setRsk('교통사고');
//             reset();
//           }}
//         >
//           <div className="topicons">
//             <MdStackedBarChart className="charticon" />
//           </div>
//           <div className="hvd">교통사고 위험도</div>
//         </div>

//         <div
//           className={`propBT ${bar === 4 ? 'active' : ''}`}
//           onClick={() => {
//             setBar(4);
//             reset();
//             setRsk(null);
//             allset();
//             setPrpall(true);
//           }}
//         >
//           <div className="topicons">
//             <FaRoad className="roadicon" />
//           </div>
//           <div className="hvd">이면도로 실태조사</div>
//         </div>

//         <div className="filter">
//           <div
//             className={`bottom_cont ${left ? 'active' : ''}`}
//             onClick={() => {
//               if (scrn < 1015) {
//                 setRight(false);
//                 setLeft(!left);
//               } else {
//                 setLeft(!left);
//               }
//             }}
//           >
//             <div className="bottomicons">
//               <FaFilter className="filtericon" />
//             </div>
//             <div className="hvd_bottom">필터 도구</div>
//           </div>
//         </div>

//         <div className="search">
//           <div
//             className={`bottom_cont ${right ? 'active' : ''}`}
//             onClick={() => {
//               if (scrn < 1015) {
//                 setLeft(false);
//                 setRight(!right);
//               } else {
//                 setRight(!right);
//               }
//             }}
//           >
//             <div className="bottomicons">
//               <FaMagnifyingGlassChart className="searchicon" />
//             </div>
//             <div className="hvd_bottom">속성/검색 도구</div>
//           </div>
//         </div>

//         <div className="guide">
//           <div
//             className={`bottom_cont ${showModal ? 'active' : ''}`}
//             onClick={handleModOpen}
//           >
//             <div className="bottomicons">
//               <CgFileDocument className="guideicon" />
//             </div>
//             <div className="hvd_bottom">데이터 설명서</div>
//           </div>
//         </div>
//       </div>

//       {left && bar === 1 && (
//         <div className="detail_div">
//           <div className="dtl_ttl">지역 일반현황</div>

//           <div className="accordion_div">
//             <AccrdGen1 />
//           </div>
//         </div>
//       )}

//       {left && bar === 2 && (
//         <div className="detail_div">
//           <div className="dtl_ttl">교통사고 위험도</div>

//           <div className="accordion_div">
//             <AccrdRsk1 />
//           </div>
//         </div>
//       )}

//       {left && bar === 4 && (
//         <div className="detail_div">
//           <div className="dtl_ttl">이면도로 실태조사</div>

//           <div className="accordion_div">
//             <AccrdPrp />
//           </div>
//         </div>
//       )}

//       {showModal && modal}
//     </div>
//   );
// };

// export default LeftBar;
