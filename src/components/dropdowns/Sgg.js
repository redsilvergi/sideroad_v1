import './Sgg.css';
import React from 'react';
// import useInfo from '../../hooks/use-info';
// import { useViewUpdate } from '../../context/view';

const Sgg = ({ options, tmpldc, setTmpldc }) => {
  // const { ldcuid, setLdcuid, scrn } = useInfo();
  // const setView = useViewUpdate();
  const filteredOps = !tmpldc
    ? options
    : options.filter((item, id) => {
        return item[0].slice(0, 2) === tmpldc[0].slice(0, 2);
      });

  const handleCounty = (sggitem) => {
    // const long = sggitem[5];
    // const lat = sggitem[6];
    // const zm = sggitem[7];
    // const zmsm = sggitem[8];
    setTmpldc(sggitem);

    // setLdcuid((prev) => {
    //   if (prev === sggitem) {
    //     setExp(1);
    //     return null;
    //   } else {
    //     setView({
    //       longitude: long,
    //       latitude: lat,
    //       zoom: scrn < 1015 ? zmsm : zm,
    //     });
    //     return sggitem;
    //   }
    // });
  };

  return (
    <div className="sggdd">
      <ul>
        {filteredOps &&
          filteredOps.map((item, id) => {
            // item[x] where x = 0,1,2,3,4,5,6,7,8  => ldc, sido, sigungu, inuse, uid, long, lat, zm, zmsm in DB
            const ldcuidfet = item[0];
            const sigungufet = item[2];

            return (
              <li
                key={id}
                className={`sggdd_option_label ${
                  ldcuidfet === tmpldc[0] ? 'selected' : ''
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
