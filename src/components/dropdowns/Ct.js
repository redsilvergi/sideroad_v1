import './Ct.css';
import React from 'react';

const Ct = ({ ctrf, tmpldc, setTmpldc }) => {
  const handleCity = (ctitem) => {
    // console.log('ctitem', ctitem);
    // console.log('after listise', Object.values(ctitem));
    setTmpldc(Object.values(ctitem));
  };

  ctrf.sort((a, b) => a.sido.localeCompare(b.sido, 'ko'));

  return (
    <div className="ctdd">
      <ul>
        {ctrf &&
          ctrf.map((item, id) => {
            // order => ldc, sido, sigungu, inuse, uid, long, lat, zm, zmsm in DB
            const ldcfet = item.ldc;
            const sidofet = item.sigungu;

            return (
              <li
                key={id}
                className={`ctdd_option_label ${
                  tmpldc && ldcfet.slice(0, 2) === tmpldc[0].slice(0, 2)
                    ? 'selected'
                    : ''
                }`}
                onClick={() => handleCity(item)}
              >
                {sidofet}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Ct;
