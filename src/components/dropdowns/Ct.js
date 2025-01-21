import './Ct.css';
import React from 'react';
// import useInfo from '../../hooks/use-info';
// import { useViewUpdate } from '../../context/view';

const Ct = ({ options, tmpldc, setTmpldc }) => {
  // const { ldcuid, setLdcuid, scrn } = useInfo();
  // const setView = useViewUpdate();

  const handleCity = (ctitem) => {
    // const long = ctitem[5];
    // const lat = ctitem[6];
    // const zm = ctitem[7];
    // const zmsm = ctitem[8];
    setTmpldc(ctitem);
    // setLdcuid((prev) => {
    //   if (prev === ctitem) {
    //     return null;
    //   } else {
    //     setView({
    //       longitude: long,
    //       latitude: lat,
    //       zoom: scrn < 1015 ? zmsm : zm,
    //     });
    //     return ctitem;
    //   }
    // });
  };

  return (
    <div className="ctdd">
      <ul>
        {options &&
          options.map((item, id) => {
            // item[x] where x = 0,1,2,3,4,5,6,7,8  => ldc, sido, sigungu, inuse, uid, long, lat, zm, zmsm in DB
            const ldcuidfet = item[4];
            const sidofet = item[2];

            return (
              <li
                key={id}
                className={`ctdd_option_label ${
                  tmpldc && ldcuidfet.slice(0, 2) === tmpldc[4].slice(0, 2)
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
