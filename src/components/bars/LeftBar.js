import './LeftBar.css';
import React, { useState, useCallback } from 'react';
import AccrdGen1 from '../accordions/AccrdGen1';
import AccrdRsk1 from '../accordions/AccrdRsk1';
// import AccrdPrp from '../accordions/AccrdPrp';
import Srvy from '../container/Srvy';
import AccrdPfr from '../accordions/AccrdPfr';
import useInfo from '../../hooks/use-info';
import Modal from '../tools/Modal';

// import guide from '../../img/guide2.png';
import manual from '../../img/nstreets_manual_title.png';
import nstreets from '../../img/nstreets.svg';
import login from '../../img/login.svg';
import pedprior from '../../img/pedprior_new.svg';
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
import { MdPerson } from 'react-icons/md';
import useDb from '../../hooks/use-db';

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
    // setPrpall,
    scrn,
    setExp,
    setIstgl,
  } = useInfo();
  const { user, logout } = useAuth();
  const { fetchManual } = useDb();
  const [showModal, setShowModal] = useState(false);

  // handlers ----------------------------------------------------------------------
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
    (newBar) => {
      //newBar, propAll = false
      if (bar !== newBar) {
        setBar(newBar);
        reset();
        // if (propAll) setPrpall(true);
      }
    },
    [bar, reset, setBar] //setPrpall
  );

  const handleLogin = useCallback(() => {
    setIstgl(false);
    setExp(0);
    navigate('/login');
  }, [setIstgl, setExp, navigate]);

  const handleMypage = useCallback(() => {
    setIstgl(false);
    setExp(0);
    navigate(`/mypage/${user.username}`);
  }, [setIstgl, setExp, navigate, user]);

  // return ----------------------------------------------------------------------
  return (
    <div>
      <div className={`left_column ${bar === 0 ? 'bar0' : ''}`}>
        <a href="./">
          <img src={nstreets} alt="n-street" className="nstrtimg" />
          <div className="hvd_title">도시지역 이면도로 현황</div>
        </a>

        <div className="titleline"></div>

        <div className="leftbar_column_wrap">
          <div className="leftbar_column_top">
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
              <div className="hvd">보행자 교통사고</div>
              <div className="topicons">
                <img src={risk} alt="risk" className="lb_icon2" />
              </div>
            </div>

            <div
              className={`priorBT ${bar === 3 ? 'active' : ''}`}
              onClick={() => {
                handleSetBar(3);
              }}
            >
              <div className="hvd">보행자 우선도로</div>
              <div className="topicons">
                <img src={pedprior} alt="pedprior" className="lb_icon3" />
              </div>
            </div>

            <div
              className={`propBT ${bar === 4 ? 'active' : ''}`}
              onClick={() => handleSetBar(4)}
            >
              <div className="hvd">이면도로 실태조사</div>
              <div className="topicons">
                <img src={survey} alt="survey" className="lb_icon4" />
              </div>
            </div>
          </div>

          <div className="leftbar_column_bottom">
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
                <div className={`bottom_cont`} onClick={handleLogin}>
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

            {user && (
              <div className="mypage">
                <div className={`bottom_cont`} onClick={handleMypage}>
                  <div className="hvd_bottom">마이페이지</div>
                  <div className="bottomicons">
                    <MdPerson className="mypageicon" />
                  </div>
                </div>
              </div>
            )}

            <div className="guide">
              <div
                className={`bottom_cont ${showModal ? 'active' : ''}`}
                onClick={() => {
                  handleModOpen();
                }}
              >
                <div className="hvd_bottom">활용 메뉴얼 다운로드</div>
                <div className="bottomicons">
                  <CgFileDocument className="guideicon" />
                </div>
              </div>
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
          <div className="dtl_ttl">보행자 교통사고</div>
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
        <div>
          <div className="modal_dwld_btn" onClick={() => fetchManual()}>
            <span style={{}}>다운로드</span>
            <div className="manual_dwld_btn">
              <CgFileDocument className="pdficon" />
            </div>
          </div>
          <Modal onClose={handleModClose}>
            <img
              src={manual}
              alt="guide1"
              height={scrn < 1015 ? '250%' : '400%'}
              width={'40%'}
            />
          </Modal>
        </div>
      )}
    </div>
  );
};

export default LeftBar;
