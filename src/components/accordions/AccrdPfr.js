import React, { useEffect, useState, useMemo, useRef } from 'react';
import useInfo from '../../hooks/use-info';
import useDb from '../../hooks/use-db';
import '../auxiliary/CbxGen1.css';
import './AccrdPfr.css';
import { FiPlus, FiMinus } from 'react-icons/fi';
import AccrdPfr2a from './AccrdPfr2a';
import { useViewUpdate } from '../../context/view';

const AccrdPfr = () => {
  const {
    pfrjs,
    ldcuid,
    checkedPfr,
    setCheckedPfr,
    pfrLegendCbx,
    setPfrLegendCbx,
    setPfrInfo,
    setPfrPick,
  } = useInfo();
  const { getPfrdata } = useDb();
  const setView = useViewUpdate();
  const [expandedIndex, setExpandedIndex] = useState([]);
  const [expInner, setExpInner] = useState([true, true]);
  const isFirstFetch = useRef(false);

  useEffect(() => {
    if (ldcuid) {
      setExpandedIndex([0, 1]);
      isFirstFetch.current = false;
      setPfrLegendCbx([true, true, true, true, true]);
    }
  }, [ldcuid, setPfrLegendCbx]);

  const { roadNames, roadIds } = useMemo(() => {
    if (pfrjs?.features && ldcuid?.[0]) {
      const filteredFeatures = pfrjs.features.filter(
        (feature) => feature.properties?.sig_cd === ldcuid[0]
      );

      return {
        roadNames: filteredFeatures.map((feature) =>
          feature.properties.h_ped_nm
            ? feature.properties.h_ped_nm
            : feature.properties.id
        ),
        roadIds: filteredFeatures.map((feature) => feature.properties?.id),
      };
    }
    return { roadNames: [], roadIds: [] };
  }, [pfrjs, ldcuid]);

  useEffect(() => {
    setCheckedPfr(roadIds);
  }, [roadIds, setCheckedPfr]);

  const handleCheck = (index) => {
    setCheckedPfr((prev) =>
      prev.map((state, i) =>
        i === index ? (state === false ? roadIds[index] : false) : state
      )
    );
  };

  const handlePfrLgCbx = (index) => {
    setPfrLegendCbx((prev) =>
      prev.map((value, i) => (i === index ? !value : value))
    );
  };

  const handleExpInner = (index) => {
    setExpInner((prev) =>
      prev.map((value, i) => (i === index ? !value : value))
    );
  };

  const items = [
    {
      id: '우선도로지정',
      label: '보행자우선도로 지정 현황',
      content: (
        <div className="road priority">
          {ldcuid && (
            <div className="pfr_list">
              <div className="pfr_list_nb">
                <React.Fragment>
                  <span>보행자우선도로 지정개소</span>
                  <span>{roadNames.length}개</span>
                </React.Fragment>
              </div>

              <form>
                {roadNames.map((item, index) => (
                  <div
                    key={`pfrcheckbox${index + 1}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <label className="pfrlist_chk_lb">
                      <input
                        className="pfr_custom_cb"
                        type="checkbox"
                        name={`pfrcheckbox${index + 1}`}
                        checked={checkedPfr[index] ?? true}
                        onChange={() => handleCheck(index)}
                      />
                      <div className="pfr_chk_item"></div>
                    </label>
                    <div
                      className="pfr_chk_word"
                      onClick={() => {
                        const feature = pfrjs.features.find(
                          (f) => f.properties?.id === roadIds[index]
                        );

                        if (feature) {
                          const g = feature.geometry.coordinates;
                          const length = Math.floor(g.length / 2);

                          setPfrInfo(feature.properties);
                          setPfrPick(null);
                          setView((prev) => ({
                            ...prev,
                            longitude:
                              g[length][Math.floor(g[length].length / 2)][0],
                            latitude:
                              g[length][Math.floor(g[length].length / 2)][1],
                            zoom: 16,
                          }));
                        } else {
                          console.error(
                            'Feature not found for road ID in pfrjs:',
                            roadIds[index]
                          );
                        }
                      }}
                    >
                      {item}
                    </div>
                  </div>
                ))}
              </form>
            </div>
          )}
        </div>
      ),
    },

    {
      id: '우선도로필요',
      label: '보행자우선도로 필요 구간',
      content: (
        <div className="road priorityCd">
          <div>
            <AccrdPfr2a />
          </div>
        </div>
      ),
    },

    {
      id: '안전보호시설',
      label: '보행유발 및 보호시설',
      content: (
        <div className="road safefacs">
          {ldcuid && ldcuid[0] && (
            <div className="pfr_lg_container">
              <div className="pfrlg_ttl" onClick={() => handleExpInner(0)}>
                <div className="pfrlg_lbl">보호구역</div>
                <div className="pfrlg_icon">
                  {expInner[0] ? <FiMinus /> : <FiPlus />}
                </div>
              </div>

              {expInner[0] && (
                <div className="pfrlg_content">
                  <div
                    className="pfrlg_clickbox"
                    onClick={() => handlePfrLgCbx(0)}
                  >
                    <label className="pfr_chk_lb">
                      <input
                        className="pfr_custom_cb"
                        type="checkbox"
                        name="pfrlgcheckbox1"
                        checked={pfrLegendCbx[0]}
                        onChange={() => handlePfrLgCbx(0)}
                      />
                      <div className="pfr_chk_item">
                        <div className="pfrlg_chk_word">어린이 보호구역</div>
                      </div>
                    </label>
                    <div className="pfrlg_dashline" />
                  </div>

                  <div
                    className="pfrlg_color"
                    style={{ backgroundColor: '#FFFF75' }}
                  ></div>
                </div>
              )}

              {expInner[0] && (
                <div className="pfrlg_content">
                  <div
                    className="pfrlg_clickbox"
                    onClick={() => handlePfrLgCbx(1)}
                  >
                    <label className="pfr_chk_lb">
                      <input
                        className="pfr_custom_cb"
                        type="checkbox"
                        name="pfrlgcheckbox2"
                        checked={pfrLegendCbx[1]}
                        onChange={() => handlePfrLgCbx(1)}
                      />
                      <div className="pfr_chk_item">
                        <div className="pfrlg_chk_word">노인 보호구역</div>
                      </div>
                    </label>
                    <div className="pfrlg_dashline" />
                  </div>

                  <div
                    className="pfrlg_color"
                    style={{ backgroundColor: '#FFC400' }}
                  ></div>
                </div>
              )}

              <div className="pfrlg_ttl" onClick={() => handleExpInner(1)}>
                <div className="pfrlg_lbl">보행유발시설</div>
                <div className="pfrlg_icon">
                  {expInner[1] ? <FiMinus /> : <FiPlus />}
                </div>
              </div>

              {expInner[1] && (
                <div className="pfrlg_content">
                  <div
                    className="pfrlg_clickbox"
                    onClick={() => handlePfrLgCbx(2)}
                  >
                    <label className="pfr_chk_lb">
                      <input
                        className="pfr_custom_cb"
                        type="checkbox"
                        name="pfrlgcheckbox3"
                        checked={pfrLegendCbx[2]}
                        onChange={() => handlePfrLgCbx(2)}
                      />
                      <div className="pfr_chk_item">
                        <div className="pfrlg_chk_word">학교</div>
                      </div>
                    </label>
                    <div className="pfrlg_dashline" />
                  </div>

                  <div
                    className="pfrlg_color"
                    style={{ backgroundColor: '#C0EEFA' }}
                  ></div>
                </div>
              )}

              {expInner[1] && (
                <div className="pfrlg_content">
                  <div
                    className="pfrlg_clickbox"
                    onClick={() => handlePfrLgCbx(3)}
                  >
                    <label className="pfr_chk_lb">
                      <input
                        className="pfr_custom_cb"
                        type="checkbox"
                        name="pfrlgcheckbox4"
                        checked={pfrLegendCbx[3]}
                        onChange={() => handlePfrLgCbx(3)}
                      />
                      <div className="pfr_chk_item">
                        <div className="pfrlg_chk_word">공원</div>
                      </div>
                    </label>
                    <div className="pfrlg_dashline" />
                  </div>

                  <div
                    className="pfrlg_color"
                    style={{ backgroundColor: '#2DC400' }}
                  ></div>
                </div>
              )}

              {expInner[1] && (
                <div className="pfrlg_content">
                  <div
                    className="pfrlg_clickbox"
                    onClick={() => handlePfrLgCbx(4)}
                  >
                    <label className="pfr_chk_lb">
                      <input
                        className="pfr_custom_cb"
                        type="checkbox"
                        name="pfrlgcheckbox5"
                        checked={pfrLegendCbx[4]}
                        onChange={() => handlePfrLgCbx(4)}
                      />
                      <div className="pfr_chk_item">
                        <div className="pfrlg_chk_word">다중이용시설</div>
                      </div>
                    </label>
                    <div className="pfrlg_dashline" />
                  </div>

                  <div className="pfrlg_color_toggle">
                    ?
                    <div className="pfrlg_mfac_tooltip">
                      <div className="mfac_ttp_content">
                        <div
                          className="pfrlg_color_inner"
                          style={{ backgroundColor: '#7C91BC' }}
                        ></div>
                        문화 및 집회시설
                      </div>
                      <div className="mfac_ttp_content">
                        <div
                          className="pfrlg_color_inner"
                          style={{ backgroundColor: '#E85A4C' }}
                        ></div>
                        판매 및 영업시설
                      </div>
                      <div className="mfac_ttp_content">
                        <div
                          className="pfrlg_color_inner"
                          style={{ backgroundColor: '#8BE883' }}
                        ></div>
                        운동시설
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ),
    },
  ];

  const handleClick = async (nextIndex) => {
    setExpandedIndex((currentExpandedIndex) => {
      if (currentExpandedIndex.includes(nextIndex)) {
        if (nextIndex === 2) {
          setPfrLegendCbx([false, false, false, false, false]);
        }
        return currentExpandedIndex.filter((item) => item !== nextIndex);
      } else {
        return [...currentExpandedIndex, nextIndex];
      }
    });

    if (nextIndex === 2 && ldcuid && ldcuid[0]) {
      if (!isFirstFetch.current) {
        await getPfrdata();
        isFirstFetch.current = true;
      } else {
        setPfrLegendCbx([true, true, true, true, true]);
      }
    }
  };

  const renderedItems = items.map((item, index) => {
    const isExpanded = expandedIndex.includes(index);

    return (
      <div key={item.id} className={`${item.id + '_accitem'}`}>
        <div
          className={`pfr1_d1 ${item.id + '_pfr1_d1'}`}
          onClick={() => handleClick(index)}
        >
          <div className="pfrlbl">{item.label}</div>
          <div className="pfr1_icon">
            {isExpanded ? <FiMinus /> : <FiPlus />}
          </div>
        </div>
        {isExpanded && (
          <div className={`pfr1_expanded ${item.id + '_pfr1_exp'}`}>
            {item.content}
          </div>
        )}
        <div
          style={{
            marginBottom: index === 2 ? '60px' : '',
          }}
        ></div>
      </div>
    );
  });

  return <div className={`accordion`}>{renderedItems}</div>;
};

export default AccrdPfr;
