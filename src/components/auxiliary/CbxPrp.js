import './CbxPrp.css';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import useInfo from '../../hooks/use-info';

const CbxPrp = ({ name, checklist }) => {
  const objRef = useRef(checklist.filter((item) => item.name === name)[0]);
  const obj = objRef.current;
  const list = obj.options;
  const { prpall } = useInfo();
  const [prpcbxes, setPrpcbxes] = useState(() => {
    const initialprpcbxes = {};

    for (let i = 0; i < list.length; i++) {
      initialprpcbxes[`checkbox${i + 1}`] = true;
    }

    return initialprpcbxes;
  });

  useEffect(() => {
    if (prpall) {
      setPrpcbxes(() => {
        const boxes = {};

        for (let i = 0; i < list.length; i++) {
          boxes[`checkbox${i + 1}`] = true;
        }

        return boxes;
      });
    } else {
      setPrpcbxes(() => {
        const boxes = {};

        for (let i = 0; i < list.length; i++) {
          boxes[`checkbox${i + 1}`] = false;
        }

        return boxes;
      });
    }
  }, [prpall, list.length]);

  const updateF = useCallback(() => {
    const sortedItems = Object.values(prpcbxes).reduce((acc, val, i) => {
      if (val) {
        acc.push([...list][i]);
      }
      return acc;
    }, []);
    obj.updateInfo(sortedItems, Object.values(prpcbxes));
  }, [prpcbxes, obj, list]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setPrpcbxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [name]: checked,
    }));
  };

  useEffect(() => {
    updateF();
  }, [updateF]);

  return (
    <form>
      {list.map((item, index) => (
        <div key={`checkbox${index + 1}`}>
          <label className="prp_chk_lb">
            <input
              className="prp_custom_cb"
              type="checkbox"
              name={`checkbox${index + 1}`}
              checked={prpcbxes[`checkbox${index + 1}`]}
              onChange={handleCheckboxChange}
            />
            {index !== list.length - 1 ? (
              <div className="prp_chk_item">{item}</div>
            ) : (
              <div className="prp_chk_item" style={{ marginBottom: '10px' }}>
                {item}
              </div>
            )}
          </label>
        </div>
      ))}
    </form>
  );
};

export default CbxPrp;
