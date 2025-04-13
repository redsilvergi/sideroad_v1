import './Sgg.css';
import React from 'react';

const Sgg = ({ sggrf, tmpldc, setTmpldc }) => {
  const filteredSgg = !tmpldc
    ? sggrf
    : sggrf.filter((item, id) => {
        return item.ldc.slice(0, 2) === tmpldc[0].slice(0, 2);
      });

  filteredSgg.sort((a, b) => a.sigungu.localeCompare(b.sigungu, 'ko'));

  const handleCounty = (sggitem) => {
    // console.log('sggitem', sggitem);
    // console.log('after listise', Object.values(sggitem));
    setTmpldc(Object.values(sggitem));
  };

  return (
    <div className="sggdd">
      <ul>
        {filteredSgg &&
          filteredSgg.map((item, id) => {
            // order  => ldc, sido, sigungu, inuse, uid, long, lat, zm, zmsm in DB
            const ldcfet = item.ldc;
            const sigungufet = item.sigungu;

            return (
              <li
                key={id}
                className={`sggdd_option_label ${
                  ldcfet === tmpldc[0] ? 'selected' : ''
                }`}
                onClick={() => handleCounty(item)}
              >
                {sigungufet}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Sgg;
