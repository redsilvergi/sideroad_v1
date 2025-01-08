import './LeftBar.css';
import React, { useState, useCallback } from 'react';
import AccrdGen1 from '../accordions/AccrdGen1';
import AccrdRsk1 from '../accordions/AccrdRsk1';
// import AccrdPrp from '../accordions/AccrdPrp';
import Srvy from '../container/Srvy';
import AccrdPfr from '../accordions/AccrdPfr';
import useInfo from '../../hooks/use-info';
import Modal from '../tools/Modal';
import guide from '../../img/guide2.png';
import nstreets from '../../img/nstreets.svg';
import login from '../../img/login.svg';
import pedprior from '../../img/pedprior.svg';
import risk from '../../img/risk.svg';
// import status from '../../img/status.svg';
import survey from '../../img/survey.svg';
// import { MdStackedBarChart } from 'react-icons/md';
import { FaFilter, FaMagnifyingGlassChart } from 'react-icons/fa6';
import { CgFileDocument } from 'react-icons/cg';
import { FaMapMarkedAlt } from 'react-icons/fa';
import Txtballoon from '../tools/Txtballoon';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
// import { FaDraftingCompass } from 'react-icons/fa';
// import { ReactComponent as Ped } from '../../img/pedprior.svg';

const LeftBar = () => {
  //setup ----------------------------------------------------------------------
  const navigate = useNavigate();
  const {
    bar,
    setBar,
    left,
    setLeft,
    right,
    setRight,
    reset,
    // allset,
    setPrpall,
    scrn,
  } = useInfo();
  const { user, logout } = useAuth();

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
    (newBar, propAll = false) => {
      if (bar !== newBar) {
        setBar(newBar);
        reset();
        if (propAll) setPrpall(true);
      }
    },
    [bar, reset, setBar, setPrpall]
  );

  return (
    <div>
      <div className="left_column">
        <a href="./">
          <img src={nstreets} alt="n-street" className="nstrtimg" />
          <div className="hvd_title">도시지역 이면도로 현황</div>
        </a>

        <div className="titleline"></div>

        <div
          className={`genBT ${bar === 1 ? 'active' : ''}`}
          onClick={() => handleSetBar(1)}
        >
          <div className="hvd">지역 일반현황</div>
          <div className="topicons">
            {/* <img src={status} alt="status" className="lb_icon1" /> */}
            <FaMapMarkedAlt className="lb_icon1" />
          </div>
        </div>

        <div
          className={`riskBT ${bar === 2 ? 'active' : ''}`}
          onClick={() => handleSetBar(2)}
        >
          <div className="hvd">교통사고 위험도</div>
          <div className="topicons">
            <img src={risk} alt="risk" className="lb_icon2" />
          </div>
        </div>

        <div
          className={`priorBT ${bar === 3 ? 'active' : ''}`}
          onClick={() => {
            handleSetBar(3, true);
          }}
        >
          <div className="hvd">보행자 우선도로</div>
          <div className="topicons">
            <img src={pedprior} alt="pedprior" className="lb_icon3" />
          </div>
        </div>

        <div
          className={`propBT ${bar === 4 ? 'active' : ''}`}
          onClick={() => handleSetBar(4, true)}
        >
          <div className="hvd">이면도로 실태조사</div>
          <div className="topicons">
            <img src={survey} alt="survey" className="lb_icon4" />
          </div>
        </div>

        <div className="filter">
          <div
            className={`bottom_cont ${left ? 'active' : ''}`}
            onClick={toggleLeft}
          >
            <div className="hvd_bottom">필터 도구</div>
            <div className="bottomicons">
              <FaFilter className="filtericon" />
            </div>
          </div>
        </div>

        <div className="search">
          <div
            className={`bottom_cont ${right ? 'active' : ''}`}
            onClick={toggleRight}
          >
            <div className="hvd_bottom">속성/검색 도구</div>
            <div className="bottomicons">
              <FaMagnifyingGlassChart className="searchicon" />
            </div>
          </div>
        </div>

        <div className="login">
          {!user ? (
            <div className={`bottom_cont`} onClick={() => navigate('/login')}>
              <div className="hvd_bottom">로그인</div>
              <div className="bottomicons">
                <img src={login} alt="login" className="loginicon" />
              </div>
            </div>
          ) : (
            <div className={`bottom_cont`} onClick={logout}>
              <div className="hvd_bottom">로그아웃</div>
              <div className="bottomicons">
                <img src={login} alt="login" className="loginicon" />
              </div>
            </div>
          )}
        </div>

        <div className="guide">
          <div
            className={`bottom_cont ${showModal ? 'active' : ''}`}
            onClick={handleModOpen}
          >
            <div className="hvd_bottom">데이터 설명서</div>
            <div className="bottomicons">
              <CgFileDocument className="guideicon" />
            </div>
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
          <div className="dtl_ttl">유형별 사고위험도</div>
          <div className="accordion_div">
            <AccrdRsk1 />
            <Txtballoon />
          </div>
        </div>
      )}

      {left && bar === 3 && (
        <div className="detail_div">
          <div className="dtl_ttl">보행자 우선도로</div>
          <div className="accordion_div">
            <AccrdPfr />
          </div>
        </div>
      )}

      {left && bar === 4 && (
        <div className="detail_div">
          <div className="dtl_ttl">이면도로 실태조사</div>
          <div className="accordion_div">
            <Srvy />
            {/* <AccrdPrp /> */}
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
