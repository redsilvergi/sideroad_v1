import { useEffect, useState } from 'react';
import './AccrdRsk2b.css';
import useInfo from '../../hooks/use-info';
import CbxRsk from '../auxiliary/CbxRsk';
import { FiPlus, FiMinus } from 'react-icons/fi';
import Bar3 from '../charts/Bar3';
import useDb from '../../hooks/use-db';

const AccrdRsk2b = () => {
  // setup ----------------------------------------------------------------------
  const { rnfo0, rnfo1, setRnfo0, setRnfo1, ldcuid } = useInfo();
  const { getRiskPrcnt } = useDb();
  const [exp, setExp] = useState([true, false]);
  const [pedac, setPedac] = useState(null);
  const [pred, setPred] = useState(null);
  // console.log('topexptopexp\n', topexp);

  //useeffect ----------------------------------------------------------------------
  useEffect(() => {
    const handleData = async (col) => {
      const result = await getRiskPrcnt({
        col: col,
        ldc: ldcuid && ldcuid[4],
      });
      // console.log('result\n', result);
      const sum = result.reduce((acc, item) => acc + Number(item.cnt), 0);
      const tmpDataLst =
        result &&
        result.reduce((acc, item, id) => {
          if (item.val === 0) {
            acc['매우좋음'] = ((item.cnt / sum) * 100).toFixed(3);
          } else if (item.val === 1) {
            acc['좋음'] = ((item.cnt / sum) * 100).toFixed(3);
          } else if (item.val === 2) {
            acc['보통'] = ((item.cnt / sum) * 100).toFixed(3);
          } else if (item.val === 3) {
            acc['나쁨'] = ((item.cnt / sum) * 100).toFixed(3);
          } else if (item.val === 4) {
            acc['매우나쁨'] = ((item.cnt / sum) * 100).toFixed(3);
          }
          return acc;
        }, {});

      // console.log('sum, tmpDataLst\n', sum, tmpDataLst);

      if (col === 'pedac_rk') {
        setPedac([tmpDataLst]);
      } else if (col === 'pred') {
        setPred([tmpDataLst]);
      } else {
        console.log('col is not defined');
      }
    };
    if (exp[0]) {
      handleData('pedac_rk');
    }
    if (exp[1]) {
      handleData('pred');
    }
  }, [ldcuid, exp, getRiskPrcnt]);

  // data ----------------------------------------------------------------------
  // const data_pedac_rk = [
  //   {
  //     name: '교통사고 위험도 현황',
  //     매우나쁨: 5,
  //     나쁨: 15.6,
  //     보통: 30,
  //     좋음: 15,
  //     매우좋음: 34.4,
  //   },
  // ];
  // const data_pred = [
  //   {
  //     name: '교통사고 위험도 현황',
  //     매우나쁨: 35,
  //     나쁨: 15.6,
  //     보통: 10,
  //     좋음: 15,
  //     매우좋음: 34.4,
  //   },
  // ];

  // items ----------------------------------------------------------------------
  const checklists = [
    ['매우 나쁨', '나쁨', '보통', '좋음', '매우 좋음'],
    ['매우 나쁨', '나쁨', '보통', '좋음', '매우 좋음'],
  ];

  const items = [
    {
      id: '교통사고위험도현황',
      label: '교통사고 위험도 현황',
      content: (
        <div className="crwdac">
          <Bar3 data={pedac} />
          <CbxRsk
            list={checklists[0]}
            rnfo={rnfo0}
            setRnfo={setRnfo0}
            exp={exp}
          />
        </div>
      ),
    },
    {
      id: '보행환경양호도평가',
      label: '보행환경 양호도 평가',
      content: (
        <div className="crwdac">
          <Bar3 data={pred} />
          <CbxRsk
            list={checklists[1]}
            rnfo={rnfo1}
            setRnfo={setRnfo1}
            exp={exp}
          />
        </div>
      ),
    },
  ];
  // useeffect ----------------------------------------------------------------------
  useEffect(() => {
    if (exp[0] & exp[1]) {
      setRnfo0([false, false, false, false, true]);
      setRnfo1([false, false, false, false, true]);
    } else if (exp[0] & !exp[1]) {
      setRnfo0([true, true, true, true, true]);
      setRnfo1(null);
    } else if (!exp[0] & exp[1]) {
      setRnfo0(null);
      setRnfo1([true, true, true, true, true]);
    } else if (!exp[0] & !exp[1]) {
      setRnfo0(null);
      setRnfo1(null);
    }
  }, [exp, setRnfo0, setRnfo1]);

  // handle ----------------------------------------------------------------------
  const handleClick = (id) => {
    setExp((prev) => {
      const newExp = [...prev];
      newExp[id] = !newExp[id];
      return newExp;
    });
  };

  // renderfunc ----------------------------------------------------------------------
  const renderedItems = items.map((item, id) => {
    // const isExpanded = rsk === item.id;

    return (
      <div key={item.id} className="rsk2b_accitem">
        <div
          className={`rsk2b_d1 ${exp[id] && 'active'}`}
          onClick={() => handleClick(id)}
        >
          <div className={`rsk2b_label ${exp[id] && 'active'}`}>
            {item.label}
          </div>
          <div className={`rsk2b_icon ${exp[id] && 'active'}`}>
            {exp[id] ? <FiMinus /> : <FiPlus />}
          </div>
        </div>
        {exp[id] && <div className="rsk2b_expanded">{item.content}</div>}
      </div>
    );
  });

  // return ----------------------------------------------------------------------
  return <div className={`accordion`}>{renderedItems}</div>;
};

export default AccrdRsk2b;
