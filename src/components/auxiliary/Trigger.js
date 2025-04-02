import React from 'react';
import './Trigger.css';
import useInfo from '../../hooks/use-info';

const Trigger = () => {
  // setup ----------------------------------------------------------------------
  const { ldcuid, bar, srvy } = useInfo();

  // renderfunc ----------------------------------------------------------------------
  const renderTrig = () => {
    if (bar === 1) {
      return (
        <div className="trig_cont trig_cont_x">
          {'연도와 지역을 선택하세요'}
        </div>
      );
    } else if (bar === 3) {
      if (ldcuid && ldcuid[0].slice(2) !== '000') {
        return null;
      } else {
        return (
          <div className="trig_cont trig_cont_x">
            {'지역(시군구)을 선택하세요'}
          </div>
        );
      }
    } else if (bar === 4) {
      if (srvy) {
        return (
          <div className="trig_cont trig_cont_x">
            {'실태조사할 도로링크를 최소 1개 선택하세요'}
          </div>
        );
      } else {
        return null;
      }
    }
  };

  // return ----------------------------------------------------------------------
  return renderTrig();
};

export default Trigger;
