const useTooltip = () => {
  // getTooltip1 ----------------------------------------------------------------------
  const getTooltip1 = (d) => {
    const roadF = (code) => {
      switch (code) {
        case 3:
          return '지방도';
        case 4:
          return '특별시도';
        case 5:
          return '광역시도';
        case 6:
          return '시도';
        case 7:
          return '군도';
        case 8:
          return '구도';
        case 10:
          return '면리간도로';
        case 11:
          return '부지안도로';
        case 14:
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
        case 1:
          return '아스팔트';
        case 2:
          return '아스팔트콘크리트';
        case 3:
          return '콘크리트';
        case 4:
          return '블록';
        case 5:
          return '비포장';
        case 6:
          return '우레탄';
        case 7:
          return '고무';
        case 99:
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
        case 1:
          return '일방통행';
        case 2:
          return '양방통행';
        default:
          return 'N/A';
      }
    };

    const op = d && d.object && d.object.properties;
    const tooltip = document.querySelector('.custom-tooltip');
    if (d.object && tooltip) {
      tooltip.style.display = 'block';
      tooltip.style.padding = '12px';
      if (op && op.nf_id) {
        // tooltip.style.borderRadius = '0';
        tooltip.innerHTML = `
        <div style="color: #333333; font-weight: bold; font-size: 14px; margin-bottom: 5px">
          ${`도로명: ${op.road_nm ? op.road_nm : op.nf_id}`}
        </div>
        <div style="color: #808080; font-size: 12px;">
          ${`· 도로구분: ${roadF(op.road_se)}`}
        </div>
        <div style="color: #808080; font-size: 12px;">
          ${`· 차로수: ${laneF(op.cartrk_co)}`}
        </div>
        <div style="color: #808080; font-size: 12px;">
         ${`· 도로폭원: ${widthF(op.road_bt)}`}
        </div>
        <div style="color: #808080; font-size: 12px;">
         ${`· 포장재질: ${typeF(op.pmtr_se)}`}
        </div>
        <div style="color: #808080; font-size: 12px;">
         ${`· 분리대유무: ${barrierF(op.edennc_at)}`}
        </div>
        <div style="color: #808080; font-size: 12px;">
         ${`· 일방통행구분: ${onewayF(op.osps_se)}`}
        </div>
      `;
      } else {
        return null;
      }
      // const width = tooltip.offsetWidth;
      const height = tooltip.offsetHeight;
      tooltip.style.transform = `translate(${d.x}px, ${d.y - height}px)`;
    } else {
      const tooltip = document.querySelector('.custom-tooltip');
      if (tooltip) {
        tooltip.style.display = 'none';
      }
    }
  };

  // getTooltip2 ----------------------------------------------------------------------
  const getTooltip2 = (d) => {
    const op = d && d.object && d.object.properties;
    const tooltip = document.querySelector('.custom-tooltip');
    if (d.object && tooltip) {
      tooltip.style.display = 'block';
      tooltip.style.backgroundColor = 'rgba(255, 255, 255, 1)';
      tooltip.style.fontSize = '15px';
      tooltip.style.padding = '12px';
      tooltip.innerHTML = `
          <div style="color: #333333; font-weight: bold; font-size: 0.8rem; line-height: 2;">
            ${op.ctp_eng_nm}
          </div>
        `;
      // const width = tooltip.offsetWidth;
      const height = tooltip.offsetHeight;
      tooltip.style.transform = `translate(${d.x}px, ${d.y - height}px)`;
    } else {
      const tooltip = document.querySelector('.custom-tooltip');
      if (tooltip) {
        tooltip.style.display = 'none';
      }
    }
  };

  // getTooltip3 ----------------------------------------------------------------------
  const getTooltip3 = (d) => {
    const op = d && d.object && d.object.properties;
    const tooltip = document.querySelector('.custom-tooltip');
    if (d.object && tooltip) {
      tooltip.style.display = 'block';
      tooltip.style.backgroundColor = 'rgba(255, 255, 255, 1)';
      tooltip.style.fontSize = '15px';
      tooltip.style.padding = '12px';
      tooltip.innerHTML = `
        <div style="color: #333333; font-weight: bold; font-size: 0.8rem; line-height: 2;">
          ${op.sig_eng_nm}
        </div>
      `;
      // const width = tooltip.offsetWidth;
      const height = tooltip.offsetHeight;
      tooltip.style.transform = `translate(${d.x}px, ${d.y - height}px)`;
    } else {
      const tooltip = document.querySelector('.custom-tooltip');
      if (tooltip) {
        tooltip.style.display = 'none';
      }
    }
  };

  // getTooltip6 ----------------------------------------------------------------------
  const getTooltip6 = (d) => {
    const op = d && d.object && d.object.properties;
    const tooltip = document.querySelector('.custom-tooltip');
    if (d.object && tooltip) {
      tooltip.style.display = 'block';
      //<div style="font-weight: bold; font-size: 14px; margin-bottom: 5px;">
      //   사고 발생지점 (${op.acdnt_no || '정보 없음'})
      // </div>
      tooltip.innerHTML = `
        <div style="font-weight: bold; font-size: 14px; margin-bottom: 5px;">
          사고 발생지점
        </div>
        <div style="color: #666666; font-size: 12px;">
          · 내용: ${op.acdnt_sev || '정보 없음'}
        </div>
        <div style="color: #666666; font-size: 12px;">
          · 유형: ${op.acdnt_type || '정보 없음'}
        </div>
        <div style="color: #666666; font-size: 12px;">
          · 연도: ${op.acdnt_year || '정보 없음'}
        </div>
        <div style="color: #666666; font-size: 12px;">
          · 날씨: ${op.weather || '정보 없음'}
        </div>
      `;
      // const width = tooltip.offsetWidth;
      const height = tooltip.offsetHeight;
      tooltip.style.transform = `translate(${d.x}px, ${d.y - height}px)`;
    } else {
      const tooltip = document.querySelector('.custom-tooltip');
      if (tooltip) {
        tooltip.style.display = 'none';
      }
    }
  };

  // getTooltip4_wb ----------------------------------------------------------------------
  const getTooltip4_wb = (d) => {
    const op = d && d.object && d.object.properties;
    const tooltip = document.querySelector('.custom-tooltip');
    if (d.object && op && op.h_ped_nm) {
      tooltip.style.display = 'block';
      tooltip.innerHTML = `
        <div style="color: #333333; font-weight: bold; font-size: 0.8rem; line-height: 2;">
              보행자우선도로
            </div>
            <div style="color: #333333; font-size: 0.8rem; line-height: 2;">
              ${`도로명: ${op.h_ped_nm ?? '---'}`}
            </div>
            <div style="color: #808080; font-size: 0.8rem; line-height: 2;">
              ${`· 지정일자: ${
                op.reg_dt
                  ? `${op.reg_dt.slice(0, 4)}년 ${op.reg_dt.slice(
                      4,
                      6
                    )}월 ${op.reg_dt.slice(6, 8)}일`
                  : '---'
              }`}
            </div>
            <div style="color: #808080; font-size: 0.8rem; line-height: 2;">
            ${`· 지정목적: ${op.purpose ?? '---'}`}
            </div>
            </div>
      `;
      // const width = tooltip.offsetWidth;
      const height = tooltip.offsetHeight;
      tooltip.style.transform = `translate(${d.x}px, ${d.y - height}px)`;
    } else {
      const tooltip = document.querySelector('.custom-tooltip');
      if (tooltip) {
        tooltip.style.display = 'none';
      }
    }
  };

  const getTooltip5_wb = (d) => {
    const op = d && d.object && d.object.properties;
    const tooltip = document.querySelector('.custom-tooltip');
    if (d.object && op && op.bd_nb_full) {
      tooltip.style.display = 'block';
      tooltip.innerHTML = `
        <div style="color: #808080; font-size: 0.8rem; display: flex; align-items: center; width: max-content; height: 10px;">
          ${`${op.bd_nb_full ?? '---'}`}
        </div>
      `;
      // const width = tooltip.offsetWidth;
      const height = tooltip.offsetHeight;
      tooltip.style.transform = `translate(${d.x}px, ${d.y - height}px)`;
    } else {
      const tooltip = document.querySelector('.custom-tooltip');
      if (tooltip) {
        tooltip.style.display = 'none';
      }
    }
  };

  return {
    getTooltip1,
    getTooltip2,
    getTooltip3,
    getTooltip6,
    getTooltip4_wb,
    getTooltip5_wb,
  };
};

export default useTooltip;
