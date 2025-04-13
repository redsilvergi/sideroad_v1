import './AccrdRsk1.css';
import { useState, useMemo } from 'react';
import useInfo from '../../hooks/use-info';
import { FiPlus, FiMinus } from 'react-icons/fi';
// import AccrdRsk2a from './AccrdRsk2a';
import AccrdRsk2b from './AccrdRsk2b';

const AccrdRsk1 = () => {
  // setup ----------------------------------------------------------------------
  const { setRnfo0, setRnfo1 } = useInfo();
  // const [expandedIndex, setExpandedIndex] = useState([0, 1]);
  const [exp, setExp] = useState([true]);

  // items ----------------------------------------------------------------------
  const items = useMemo(() => {
    return [
      {
        id: '등급별구성비',
        label: '등급별 구성비',
        content: (
          <div className="lane roadItem">
            <AccrdRsk2b topexp={exp} />
          </div>
        ),
      },
    ];
  }, [exp]);

  // handle ----------------------------------------------------------------------
  const handleClick = (id) => {
    if (exp[0]) {
      setRnfo0(null);
      setRnfo1(null);
    }
    setExp((prev) => {
      const newExp = [...prev];
      newExp[id] = !newExp[id];
      return newExp;
    });
  };

  // useEffect(() => {
  //   console.log('expexpexp\n', exp);
  // }, [exp]);

  // renderfunc ----------------------------------------------------------------------
  const renderedItems = items.map((item, id) => {
    // const isExpanded = expandedIndex.includes(id);

    return (
      <div key={item.id} className={`${item.id + '_accitem'}`}>
        {/* {item.id === '위험구간' && <div className="rsk1_line"></div>} */}
        <div
          className={`rsk1_d1 ${item.id + '_rsk1_d1'} ${exp[id] && 'active'}`}
          // onClick={() => setExp()}
          onClick={() => handleClick(id)}
        >
          <div className={`rsklbl ${exp[id] && 'active'}`}>{item.label}</div>
          <div className={`rsk1_icon ${exp[id] && 'active'}`}>
            {exp[id] ? <FiMinus /> : <FiPlus />}
          </div>
        </div>
        {exp[id] && (
          <div className={`rsk1_expanded ${item.id + '_rsk1_exp'}`}>
            {item.content}
          </div>
        )}
        {/* <div className="rsk1_line"></div> */}
      </div>
    );
  });

  // return ----------------------------------------------------------------------
  return <div className={`accordion`}>{renderedItems}</div>;
};

export default AccrdRsk1;
