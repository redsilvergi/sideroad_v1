const useTooltip = () => {
  // getTooltip ----------------------------------------------------------------------
  const getTooltip = ({ object }) => {
    const op = object && object.properties;
    const roadF = (code) => {
      switch (code) {
        case 'RDC003':
          return '지방도';
        case 'RDC004':
          return '특별시도';
        case 'RDC005':
          return '광역시도';
        case 'RDC006':
          return '시도';
        case 'RDC007':
          return '군도';
        case 'RDC008':
          return '구도';
        case 'RDC010':
          return '면리간도로';
        case 'RDC011':
          return '부지안도로';
        case 'RDC014':
          return '소로';
        default:
          return 'N/A';
      }
    };
    const laneF = (cartrk_co) => {
      return cartrk_co;
    };
    const widthF = (road_bt) => {
      return `${road_bt.toFixed(1)}m`;
    };
    const typeF = (pmtr_se) => {
      switch (pmtr_se) {
        case 'PVM001':
          return '아스팔트';
        case 'PVM002':
          return '아스팔트콘크리트';
        case 'PVM003':
          return '콘크리트';
        case 'PVM004':
          return '블록';
        case 'PVM005':
          return '비포장';
        case 'PVM006':
          return '우레탄';
        case 'PVM007':
          return '고무';
        case 'PVM999':
          return '기타';
        default:
          return 'N/A';
      }
    };
    const barrierF = (edennc_at) => {
      switch (edennc_at) {
        case '1':
          return '유';
        case '0':
          return '무';
        default:
          return 'N/A';
      }
    };
    const onewayF = (osps_se) => {
      switch (osps_se) {
        case 'OWI001':
          return '일방통행';
        case 'OWI002':
          return '양방통행';
        default:
          return 'N/A';
      }
    };
    return (
      op &&
      op.NF_ID && {
        html: `
        <div style="color: #333333; font-weight: bold; font-size: 0.8rem; line-height: 2;">
          ${`도로명: (ID: ${op.NF_ID})`}
        </div>
          <div style="color: #808080; font-size: 0.8rem; line-height: 2;">
            ${`· 도로구분: ${roadF(op.ROAD_SE)}`}
          </div>
          <div style="color: #808080; font-size: 0.8rem; line-height: 2;">
          ${`· 차로수: ${laneF(op.CARTRK_CO)}`}
          </div>
          <div style="color: #808080; font-size: 0.8rem; line-height: 2;">
          ${`· 도로폭원: ${widthF(op.ROAD_BT)}`}
          </div>
          <div style="color: #808080; font-size: 0.8rem; line-height: 2;">
          ${`· 포장재질: ${typeF(op.PMTR_SE)}`}
          </div>
          <div style="color: #808080; font-size: 0.8rem; line-height: 2;">
          ${`· 분리대유무: ${barrierF(op.EDENNC_AT)}`}
          </div>
          <div style="color: #808080; font-size: 0.8rem; line-height: 2;">
          ${`· 일방통행구분: ${onewayF(op.OSPS_SE)}`}
          </div>
        `,
      }
    );
  };

  // getTooltip2 ----------------------------------------------------------------------
  const getTooltip2 = ({ object }) => {
    const op = object && object.properties;
    return (
      (op &&
        op.sig_eng_nm && {
          html: `
        <div style="color: #333333; font-weight: bold; font-size: 0.8rem; line-height: 2;">
          ${op.sig_eng_nm}
        </div>
        `,
        }) ||
      (op &&
        op.ctp_eng_nm && {
          html: `
        <div style="color: #333333; font-weight: bold; font-size: 0.8rem; line-height: 2;">
          ${op.ctp_eng_nm}
        </div>
        `,
        })
    );
  };

  return { getTooltip, getTooltip2 };
};

export default useTooltip;
