const useTooltip = () => {
  // getTooltip_past ----------------------------------------------------------------------
  // const getTooltip_past = ({ object }) => {
  //   const op = object && object.properties;
  //   const roadF = (code) => {
  //     switch (code) {
  //       case 'RDC003':
  //         return '지방도';
  //       case 'RDC004':
  //         return '특별시도';
  //       case 'RDC005':
  //         return '광역시도';
  //       case 'RDC006':
  //         return '시도';
  //       case 'RDC007':
  //         return '군도';
  //       case 'RDC008':
  //         return '구도';
  //       case 'RDC010':
  //         return '면리간도로';
  //       case 'RDC011':
  //         return '부지안도로';
  //       case 'RDC014':
  //         return '소로';
  //       default:
  //         return 'N/A';
  //     }
  //   };
  //   const laneF = (cartrk_co) => {
  //     return cartrk_co;
  //   };
  //   const widthF = (road_bt) => {
  //     return `${road_bt.toFixed(1)}m`;
  //   };
  //   const typeF = (pmtr_se) => {
  //     switch (pmtr_se) {
  //       case 'PVM001':
  //         return '아스팔트';
  //       case 'PVM002':
  //         return '아스팔트콘크리트';
  //       case 'PVM003':
  //         return '콘크리트';
  //       case 'PVM004':
  //         return '블록';
  //       case 'PVM005':
  //         return '비포장';
  //       case 'PVM006':
  //         return '우레탄';
  //       case 'PVM007':
  //         return '고무';
  //       case 'PVM999':
  //         return '기타';
  //       default:
  //         return 'N/A';
  //     }
  //   };
  //   const barrierF = (edennc_at) => {
  //     switch (edennc_at) {
  //       case '1':
  //         return '유';
  //       case '0':
  //         return '무';
  //       default:
  //         return 'N/A';
  //     }
  //   };
  //   const onewayF = (osps_se) => {
  //     switch (osps_se) {
  //       case 'OWI001':
  //         return '일방통행';
  //       case 'OWI002':
  //         return '양방통행';
  //       default:
  //         return 'N/A';
  //     }
  //   };

  //   // render ----------------------------------------------------------------------
  //   const renderTip = () => {
  //     if (op && op.NF_ID) {
  //       return {
  //         html: `
  //         <div style="color: #333333; font-weight: bold; font-size: 14px; margin-bottom: 5px">
  //           ${`도로명: (ID: ${op.NF_ID})`}
  //         </div>
  //           <div style="color: #808080; font-size: 12px;">
  //             ${`· 도로구분: ${roadF(op.ROAD_SE)}`}
  //           </div>
  //           <div style="color: #808080; font-size: 12px;">
  //           ${`· 차로수: ${laneF(op.CARTRK_CO)}`}
  //           </div>
  //           <div style="color: #808080; font-size: 12px;">
  //           ${`· 도로폭원: ${widthF(op.ROAD_BT)}`}
  //           </div>
  //           <div style="color: #808080; font-size: 12px;">
  //           ${`· 포장재질: ${typeF(op.PMTR_SE)}`}
  //           </div>
  //           <div style="color: #808080; font-size: 12px;">
  //           ${`· 분리대유무: ${barrierF(op.EDENNC_AT)}`}
  //           </div>
  //           <div style="color: #808080; font-size: 12px;">
  //           ${`· 일방통행구분: ${onewayF(op.OSPS_SE)}`}
  //           </div>
  //         `,
  //         style: {
  //           backgroundColor: 'rgba(255, 255, 255, 1)',
  //           lineHeight: '1.5',
  //           borderRadius: '0',
  //           padding: '12px',
  //         },
  //       };
  //     } else if (op && op.acdnt_no) {
  //       return {
  //         html: `
  //             <div style="font-weight: bold; font-size: 14px; margin-bottom: 5px;">
  //               보행교통사고 발생지점 (${op.acdnt_no})
  //             </div>
  //             <div style="color: #666666;">
  //               · 내용: ${op.acdnt_sev || '정보 없음'}
  //             </div>
  //             <div style="color: #666666;">
  //               · 유형: ${op.acdnt_type || '정보 없음'}
  //             </div>
  //             <div style="color: #666666;">
  //               · 시간: ${op.acdnt_time || '정보 없음'}
  //             </div>
  //             <div style="color: #666666;">
  //               · 날씨: ${op.weather || '정보 없음'}
  //             </div>
  //         `,
  //         style: {
  //           // backgroundColor: 'rgba(255, 255, 255, 1)',
  //           borderRadius: '8px',
  //           boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  //           fontFamily: 'Arial, sans-serif',
  //           color: '#333333',
  //           fontSize: '12px',
  //           lineHeight: '1.5',
  //           padding: '12px',
  //           // position: 'absolute',
  //           // top: '0',
  //           // marginTop: '0',
  //           // transform:
  //           //   'translate(778px, 464px)' /* Centers and positions it above the cursor */,
  //         },
  //       };

  //       // return {
  //       //   html: `
  //       //   <div style="color: #333333; font-weight: bold; font-size: 0.8rem; line-height: 2;">
  //       //     ${`도로명: (ID: ${op.acdnt_no})`}
  //       //   </div>
  //       //   <div style="color: #808080; font-size: 0.8rem; line-height: 2;">
  //       //     ${`· 도로구분: ${op.acdnt_sev}`}
  //       //   </div>
  //       //   <div style="color: #808080; font-size: 0.8rem; line-height: 2;">
  //       //   ${`· 차로수: ${op.acdnt_time}`}
  //       //   </div>
  //       //   <div style="color: #808080; font-size: 0.8rem; line-height: 2;">
  //       //   ${`· 도로폭원: ${op.acdnt_type}`}
  //       //   </div>
  //       //   <div style="color: #808080; font-size: 0.8rem; line-height: 2;">
  //       //   ${`· 포장재질: ${op.weather}`}
  //       //   </div>
  //       //   `,
  //       //   style: {
  //       //     backgroundColor: '#333',
  //       //     fontSize: '50px',
  //       //     borderRadius: '8px',
  //       //     boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  //       //     fontFamily: 'Arial, sans-serif',
  //       //     color: '#333333',
  //       //     fontSize: '0.85rem',
  //       //     lineHeight: '1.5',
  //       //     whiteSpace: 'nowrap',
  //       //   },
  //       // };
  //     } else {
  //       return null;
  //     }
  //   };

  //   // return ----------------------------------------------------------------------
  //   return renderTip();
  // };

  // getTooltip_past2 ----------------------------------------------------------------------
  // const getTooltip_past2 = ({ object }) => {
  //   const op = object && object.properties;
  //   return (
  //     (op &&
  //       op.sig_eng_nm && {
  //         html: `
  //       <div style="color: #333333; font-weight: bold; font-size: 0.8rem; line-height: 2;">
  //         ${op.sig_eng_nm}
  //       </div>
  //       `,
  //         style: {
  //           backgroundColor: 'rgba(255, 255, 255, 1)',
  //           borderRadius: '8px',
  //           boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  //           fontFamily: 'Arial, sans-serif',
  //           color: '#333333',
  //           fontSize: '15px',
  //           lineHeight: '1.5',
  //           padding: '12px',
  //         },
  //       }) ||
  //     (op &&
  //       op.ctp_eng_nm && {
  //         html: `
  //       <div style="color: #333333; font-weight: bold; font-size: 0.8rem; line-height: 2;">
  //         ${op.ctp_eng_nm}
  //       </div>
  //       `,
  //         style: {
  //           backgroundColor: 'rgba(255, 255, 255, 1)',
  //           borderRadius: '8px',
  //           boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  //           fontFamily: 'Arial, sans-serif',
  //           color: '#333333',
  //           fontSize: '15px',
  //           lineHeight: '1.5',
  //           padding: '12px',
  //         },
  //       })
  //   );
  // };

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
      if (op && op.NF_ID) {
        // tooltip.style.borderRadius = '0';
        tooltip.innerHTML = `
        <div style="color: #333333; font-weight: bold; font-size: 14px; margin-bottom: 5px">
          ${`도로명: ${op.ROAD_NM ? op.ROAD_NM : op.NF_ID}`}
        </div>
        <div style="color: #808080; font-size: 12px;">
          ${`· 도로구분: ${roadF(op.ROAD_SE)}`}
        </div>
        <div style="color: #808080; font-size: 12px;">
          ${`· 차로수: ${laneF(op.CARTRK_CO)}`}
        </div>
        <div style="color: #808080; font-size: 12px;">
         ${`· 도로폭원: ${widthF(op.ROAD_BT)}`}
        </div>
        <div style="color: #808080; font-size: 12px;">
         ${`· 포장재질: ${typeF(op.PMTR_SE)}`}
        </div>
        <div style="color: #808080; font-size: 12px;">
         ${`· 분리대유무: ${barrierF(op.EDENNC_AT)}`}
        </div>
        <div style="color: #808080; font-size: 12px;">
         ${`· 일방통행구분: ${onewayF(op.OSPS_SE)}`}
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
      tooltip.innerHTML = `
        <div style="font-weight: bold; font-size: 14px; margin-bottom: 5px;">
          사고 발생지점 (${op.acdnt_no || '정보 없음'})
        </div>
        <div style="color: #666666; font-size: 12px;">
          · 내용: ${op.acdnt_sev || '정보 없음'}
        </div>
        <div style="color: #666666; font-size: 12px;">
          · 유형: ${op.acdnt_type || '정보 없음'}
        </div>
        <div style="color: #666666; font-size: 12px;">
          · 시간: ${op.acdnt_time || '정보 없음'}
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

  return { getTooltip1, getTooltip2, getTooltip3, getTooltip6, getTooltip4_wb };
};

export default useTooltip;
