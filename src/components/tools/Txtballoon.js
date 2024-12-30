import React from 'react';
import './Txtballoon.css';
import useInfo from '../../hooks/use-info';

const txt_map = {
  매우나쁨: {
    매우나쁨:
      "교통사고 위험도의 현황은 '매우나쁨', 예측은 '매우나쁨'을 선택하셨습니다.\n이 구간은 도로 및 주변 환경이 사고 위험에 영향을 미치고 있어, 신속한 교통 안전 및 보행환경 개선이 시급합니다.",
    나쁨: "교통사고 위험도의 현황은 '매우나쁨', 예측은 '나쁨'을 선택하셨습니다.\n이 구간은 환경적 요인으로 인해 사고 위험이 높습니다. 도로 구조와 환경 개선을 통한 위험 완화 조치가 필요합니다.",
    보통: "교통사고 위험도의 현황은 '매우나쁨', 예측은 '보통'을 선택하셨습니다.\n이 구간은 도로 환경과 인적요인이 사고에 영향을 주었으며, 사고 원인 분석과 안전 대책 마련이 필요합니다.",
    좋음: "교통사고 위험도의 현황은 '매우나쁨', 예측은 '좋음'을 선택하셨습니다.\n이 구간은 현재 위험도는 높지만, 물리적 환경은 양호합니다. 인적 요인 개선을 위한 안전 교육과 주의 강화가 필요합니다.",
    매우좋음:
      "교통사고 위험도의 현황은 '매우나쁨', 예측은 '매우좋음'을 선택하셨습니다.\n이 구간은 현재 위험도는 높지만, 환경적 요인의 영향은 낮습니다. 일시적 요인에 대한 안전 확보 조치가 필요합니다.",
  },
  나쁨: {
    매우나쁨:
      "교통사고 위험도의 현황은 '나쁨', 예측은 '매우나쁨'을 선택하셨습니다.\n이 구간은 현재도 위험도가 높은 편이며, 향후 더욱 악화될 수 있어 근본적인 도로 환경 개선이 필요합니다.",
    나쁨: "교통사고 위험도의 현황은 '나쁨', 예측은 '나쁨'을 선택하셨습니다.\n이 구간은 위험도가 높아 추가적인 도로 환경과 구조적 요인에 대한 개선이 필요할 수 있습니다.",
    보통: "교통사고 위험도의 현황은 '나쁨', 예측은 '보통'을 선택하셨습니다.\n이 구간은 사고 위험이 낮아질 가능성이 있지만, 환경적 요인과 인적 요인이 혼재된 구간으로 안전 대책 마련이 필요합니다.",
    좋음: "교통사고 위험도의 현황은 '나쁨', 예측은 '좋음'을 선택하셨습니다.\n이 구간은 인적 요인으로 인한 위험 가능성이 있어 안전 교육 및 주의 강화를 고려해야 합니다.",
    매우좋음:
      "교통사고 위험도의 현황은 '나쁨', 예측은 '매우좋음'을 선택하셨습니다.\n이 구간은 환경적 요인이 양호한 구간으로 향후 개선될 가능성이 큽니다. 일시적 인적 요인을 줄이기 위한 관리를 권장합니다.",
  },
  보통: {
    매우나쁨:
      "교통사고 위험도의 현황은 '보통', 예측은 '매우나쁨'을 선택하셨습니다.\n이 구간은향후 위험도가 크게 증가할 가능성이 있으며, 물리적 환경 요인 개선을 위한 사전 대비가 요구됩니다.",
    나쁨: "교통사고 위험도의 현황은 '보통', 예측은 '나쁨'을 선택하셨습니다.\n이 구간은 환경적 요인에 의해 위험도가 증가할 가능성이 있어 안전 유지에 주의가 필요합니다.",
    보통: "교통사고 위험도의 현황은 '보통', 예측은 '보통'을 선택하셨습니다.\n이 구간은 안전 유지를 위한 기본 관리가 필요합니다.",
    좋음: "교통사고 위험도의 현황은 '보통', 예측은 '좋음'을 선택하셨습니다.\n이 구간은 가벼운 안전 개선을 통해 인적 요인으로 인한 사고 감소가 기대됩니다.",
    매우좋음:
      "교통사고 위험도의 현황은 '보통', 예측은 '매우좋음'을 선택하셨습니다.\n이 구간은 추가적인 개선 없이도 안전적인 상태가 기대됩니다.",
  },
  좋음: {
    매우나쁨:
      "교통사고 위험도의 현황은 '좋음',  예측은 '매우나쁨'을 선택하셨습니다.\n이 구간은 사고 위험이 크게 증가할 가능성이 있으며, 물리적 환경적 요인에 대한 개선이 필요합니다.",
    나쁨: "교통사고 위험도의 현황은 '좋음', 예측은 '나쁨'을 선택하셨습니다.\n이 구간은 위험도가 증가할 가능성이 있어, 안전성을 유지하기 위한 예방적 조치가 필요합니다.",
    보통: "교통사고 위험도의 현황은 '좋음', 예측은 '보통'을 선택하셨습니다.\n이 구간은 안전 상태 유지를 위한 주의가 필요합니다.",
    좋음: "교통사고 위험도의 현황은 '좋음', 예측은 '좋음'을 선택하셨습니다.\n이 구간은 안전한 구간으로, 안전을 유지하기 위한 기본적인 관리가 권장됩니다.",
    매우좋음:
      "교통사고 위험도의 현황은 '좋음', 예측은 '매우좋음'을 선택하셨습니다.\n이 구간은 현재 안전한 상태이며, 향후 더욱 개선될 가능성이 있습니다.",
  },
  매우좋음: {
    매우나쁨:
      "교통사고 위험도의 현황은 '매우좋음', 예측은 '매우나쁨'을 선택하셨습니다.\n이 구간은 현재 매우 안전하나, 환경적 요인으로 사고 위험이 증가할 가능성이 있어 적극적인 사전 조치가 필요합니다.",
    나쁨: "교통사고 위험도의 현황은 '매우좋음', 예측은 '나쁨'을 선택하셨습니다.\n이 구간은 현재 안전하지만, 일부 환경적 요인으로 인해 위험성이 증가할 수 있어 예방 조치가 필요합니다.",
    보통: "교통사고 위험도의 현황은 '매우좋음', 예측은 '보통'을 선택하셨습니다.\n이 구간은 위험도가 높아질 가능성이 있으므로, 기본적인 안전 관리를 통한 대비가 권장됩니다.",
    좋음: "교통사고 위험도의 현황은 '매우좋음', 예측은 '좋음'을 선택하셨습니다.\n이 구간은 안정적인 상태를 유지할 가능성이 크며, 유지 관리를 통해 안전성을 보장할 수 있습니다.",
    매우좋음:
      "교통사고 위험도의 현황은 '매우좋음', 예측은 '매우좋음'을 선택하셨습니다.\n이 구간은 매우 안전하여, 특별한 추가 조치가 필요하지 않은 구간입니다.",
  },
};

const Txtballoon = () => {
  // setup ----------------------------------------------------------------------
  const { rnfo0, rnfo1 } = useInfo();

  // getTxt ----------------------------------------------------------------------
  const ops = ['매우나쁨', '나쁨', '보통', '좋음', '매우좋음'];
  const curr_find = rnfo0 && rnfo0.findIndex((val) => val);
  const pred_find = rnfo1 && rnfo1.findIndex((val) => val);
  const curr_op = ops[curr_find];
  const pred_op = ops[pred_find];
  const txt = txt_map[curr_op]?.[pred_op];

  // return ----------------------------------------------------------------------
  return (
    rnfo0 &&
    rnfo1 && (
      <div className="text-balloon">
        <div>{txt}</div>
      </div>
    )
  );
};

export default Txtballoon;