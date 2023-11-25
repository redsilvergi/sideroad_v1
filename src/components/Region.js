import "./Region.css";
import React, { useState, useEffect, useRef } from "react";
import useInfo from "../hooks/use-info";
import Dropdown from "./Dropdown";
import { AiOutlineClose } from "react-icons/ai";

const Region = ({ setView }) => {
  const { region, setRegion } = useInfo();
  const [exp, setExp] = useState(0);
  const divEl = useRef();
  ///////////////////////////////////////////////////////////////
  useEffect(() => {
    const handler = (event) => {
      if (!divEl.current) {
        return;
      }
      if (!divEl.current.contains(event.target)) {
        if (!region.city) {
          setExp(0);
        } else {
          setExp(2);
        }
      }
    };
    document.addEventListener("click", handler, true);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, [region.city]);
  ///////////////////////////////////////////////////////////////
  const cityOps = [
    [4200000000, "강원특별자치도", 127.923, 37.779, 7.8],
    [4100000000, "경기도", 126.81143943313904, 37.48086497178761, 8.3],
    [4800000000, "경상남도"],
    [4700000000, "경상북도"],
    [2900000000, "광주광역시"],
    [2700000000, "대구광역시"],
    [3000000000, "대전광역시"],
    [2600000000, "부산광역시"],
    [1100000000, "서울특별시"],
    [3600000000, "세종특별자치시"],
    [3100000000, "울산광역시"],
    [2800000000, "인천광역시"],
    [4600000000, "전라남도"],
    [4500000000, "전라북도"],
    [5000000000, "제주특별자치도"],
    [4400000000, "충청남도"],
    [4300000000, "충청북도"],
    [9000000000, " 기타"],
  ];

  var countyOps = [];

  switch (region.city.cd) {
    case 4200000000:
      countyOps = [
        [4215000000, "강릉시", 128.802, 37.766, 10],
        [4282000000, "고성군", 128.54913869750638, 38.260094409103274, 13],
        [4217000000, "동해시", 129.07663769443872, 37.5318401602037, 11.2],
        [4223000000, "삼척시", 129.0570995721673, 37.33502441460068, 9.8],
        [4221000000, "속초시", 128.5525172423722, 38.19428164936962, 12],
        [4280000000, "양구군", 127.98301959185277, 38.10193030144841, 13.6],
        [4283000000, "양양군", 128.5969073690258, 38.06402868878728, 10.7],
        [4275000000, "영월군", 128.43034657659436, 37.184417064503826, 9.84],
        [4213000000, "원주시", 127.85297874244075, 37.29878263154614, 10.4],
        [4281000000, "인제군", 128.08784545898334, 38.061756303431984, 10],
        [4277000000, "정선군", 128.69168111071068, 37.34705902009774, 10.3],
        [4278000000, "철원군", 127.292987355462, 38.13391211833746, 13.3],
        [4211000000, "춘천시", 127.64667394317705, 37.85954571993549, 10.55],
        [4219000000, "태백시", 128.97048583138425, 37.14424054464401, 11.6],
        [4276000000, "평창군", 128.44111462402293, 37.52923367316702, 10],
        [4272000000, "홍천군", 127.88487866291572, 37.702330064694465, 10.55],
        [4279000000, "화천군", 127.62959310977406, 38.09659060524887, 11.1],
        [4273000000, "횡성군", 128.06362120661868, 37.482342594671294, 11.64],
      ];
      break;
    case 4100000000:
      countyOps = [
        [4182000000, "가평군", 127.41656047621701, 37.774415702375165, 11],
        [
          4128100000,
          "고양시덕양구",
          126.82475245930345,
          37.64535054616015,
          11.3,
        ],
        [
          4128500000,
          "고양시일산동구",
          126.7802297163904,
          37.667955783575934,
          12.45,
        ],
        [
          4128700000,
          "고양시일산서구",
          126.74236182336597,
          37.67997651577498,
          12.9,
        ],
        [4129000000, "과천시", 126.98695434593596, 37.433763187324196, 12.38],
        [4121000000, "광명시", 126.84915483480005, 37.44882283820062, 12.38],
        [4161000000, "광주시", 127.24468888163041, 37.43121528583686, 11, 29],
        [4131000000, "구리시", 127.11555776231233, 37.6029477375203, 12.38],
        [4141000000, "군포시", 126.9073296260474, 37.343048903592084, 12.38],
        [4157000000, "김포시", 126.66110570569478, 37.622385274220164, 11.84],
        [4136000000, "남양주시", 127.18667598839215, 37.64857189355002, 11.29],
        [4125000000, "동두천시", 127.02844111697974, 37.92146773977092, 12],
        [4119000000, "부천시", 126.76887494059422, 37.501831120964354, 12.38],
        [
          4113500000,
          "성남시분당구",
          127.09571219619298,
          37.37740650857778,
          12.38,
        ],
        [
          4113100000,
          "성남시수정구",
          127.10126531052643,
          37.44063216726221,
          12.38,
        ],
        [
          4113300000,
          "성남시중원구",
          127.14433523130194,
          37.4368352441815,
          12.93,
        ],
        [
          4111300000,
          "수원시권선구",
          126.96954830195335,
          37.26304703369819,
          12.38,
        ],
        [
          4111700000,
          "수원시영통구",
          127.03976582974732,
          37.27060757795758,
          12.38,
        ],
        [
          4111100000,
          "수원시장안구",
          126.9867594940995,
          37.301302283082045,
          12.93,
        ],
        [
          4111500000,
          "수원시팔달구",
          127.00688739789224,
          37.277608213886,
          12.93,
        ],
        [4139000000, "시흥시", 126.73794880129677, 37.387688617496124, 11.29],
        [
          4127300000,
          "안산시단원구",
          126.64671219632729,
          37.28810855389751,
          10.74,
        ],
        [
          4127100000,
          "안산시상록구",
          126.84234689311101,
          37.32208036854105,
          11.84,
        ],
        [4155000000, "안성시", 127.20205063243849, 37.02378836146025, 10.74],
        [
          4117300000,
          "안양시동안구",
          126.94064195539873,
          37.388696690007215,
          12.38,
        ],
        [
          4117100000,
          "안양시만안구",
          126.89916593016108,
          37.403147669924195,
          12.38,
        ],
        [4163000000, "양주시", 126.9750339768823, 37.80783340726425, 10.74],
        [4183000000, "양평군", 127.48805605688955, 37.4909422205982, 10.74],
        [4167000000, "여주시", 127.59792937657842, 37.29076791400684, 11.28],
        [4180000000, "연천군", 127.05755395284014, 38.04035306278178, 12.38],
        [4137000000, "오산시", 127.04185646877482, 37.16312889796046, 12.38],
        [
          4146300000,
          "용인시기흥구",
          127.08612800484426,
          37.27008738178079,
          11.83,
        ],
        [
          4146500000,
          "용인시수지구",
          127.0865737764456,
          37.32168313933436,
          12.93,
        ],
        [
          4146100000,
          "용인시처인구",
          127.16972142846379,
          37.2352330174943,
          10.74,
        ],
        [4143000000, "의왕시", 126.94581450114812, 37.35368219444962, 11.83],
        [4115000000, "의정부시", 127.04700701465333, 37.73054477146703, 12.38],
        [4150000000, "이천시", 127.45896699201093, 37.21931934401445, 10.74],
        [4148000000, "파주시", 126.7820379324687, 37.77728865444422, 11.29],
        [4122000000, "평택시", 126.93800377633433, 37.028799780699714, 10.74],
        [4165000000, "포천시", 127.18184279220914, 37.96075184293798, 10.19],
        [4145000000, "하남시", 127.1702267866361, 37.52753037168803, 11.84],
        [4159000000, "화성시", 126.85341425665037, 37.16741147162163, 10.74],
      ];
      break;
    case 4800000000:
      countyOps = [
        [4831000000, "거제시"],
        [4888000000, "거창군"],
        [4882000000, "고성군"],
        [4825000000, "김해시"],
        [4884000000, "남해군"],
        [4827000000, "밀양시"],
        [4824500000, "사천남양출장소"],
        [4824000000, "사천시"],
        [4886000000, "산청군"],
        [4833000000, "양산시"],
        [4833200000, "양산시웅상출장소"],
        [4872000000, "의령군"],
        [4825200000, "장유출장소"],
        [4817000000, "진주시"],
        [4874000000, "창녕군"],
        [4812000000, "창원시"],
        [4812500000, "창원시 마산합포구"],
        [4812700000, "창원시 마산회원구"],
        [4812300000, "창원시 성산구"],
        [4812100000, "창원시 의창구"],
        [4812900000, "창원시 진해구"],
        [4822000000, "통영시"],
        [4885000000, "하동군"],
        [4873000000, "함안군"],
        [4887000000, "함양군"],
        [4889000000, "합천군"],
      ];
      break;
    case 4700000000:
      countyOps = [
        [4729000000, "경산시"],
        [4713000000, "경주시"],
        [4783000000, "고령군"],
        [4719000000, "구미시"],
        [4715000000, "김천시"],
        [4728000000, "문경시"],
        [4792000000, "봉화군"],
        [4725000000, "상주시"],
        [4784000000, "성주군"],
        [4717000000, "안동시"],
        [4777000000, "영덕군"],
        [4776000000, "영양군"],
        [4721000000, "영주시"],
        [4723000000, "영천시"],
        [4790000000, "예천군"],
        [4794000000, "울릉군"],
        [4793000000, "울진군"],
        [4773000000, "의성군"],
        [4782000000, "청도군"],
        [4775000000, "청송군"],
        [4785000000, "칠곡군"],
        [4711000000, "포항시"],
        [4711100000, "포항시 남구"],
        [4711300000, "포항시 북구"],
      ];
      break;
    case 2900000000:
      countyOps = [
        [2920000000, "광산구"],
        [2915500000, "남구"],
        [2911000000, "동구"],
        [2917000000, "북구"],
        [2914000000, "서구"],
      ];
      break;
    case 2700000000:
      countyOps = [
        [2772000000, "군위군"],
        [2720000000, "남구"],
        [2729000000, "달서구"],
        [2771000000, "달성군"],
        [2714000000, "동구"],
        [2723000000, "북구"],
        [2717000000, "서구"],
        [2726000000, "수성구"],
        [2711000000, "중구"],
      ];
      break;
    case 3000000000:
      countyOps = [
        [3023000000, "대덕구"],
        [3011000000, "동구"],
        [3017000000, "서구"],
        [3020000000, "유성구"],
        [3014000000, "중구"],
      ];
      break;
    case 2600000000:
      countyOps = [
        [2644000000, "강서구"],
        [2641000000, "금정구"],
        [2671000000, "기장군"],
        [2629000000, "남구"],
        [2617000000, "동구"],
        [2626000000, "동래구"],
        [2623000000, "부산진구"],
        [2632000000, "북구"],
        [2653000000, "사상구"],
        [2638000000, "사하구"],
        [2614000000, "서구"],
        [2650000000, "수영구"],
        [2647000000, "연제구"],
        [2620000000, "영도구"],
        [2611000000, "중구"],
        [2635000000, "해운대구"],
      ];
      break;
    case 1100000000:
      countyOps = [
        [1168000000, "강남구"],
        [1174000000, "강동구"],
        [1130500000, "강북구"],
        [1150000000, "강서구"],
        [1162000000, "관악구"],
        [1121500000, "광진구"],
        [1153000000, "구로구"],
        [1154500000, "금천구"],
        [1135000000, "노원구"],
        [1132000000, "도봉구"],
        [1123000000, "동대문구"],
        [1159000000, "동작구"],
        [1144000000, "마포구"],
        [1141000000, "서대문구"],
        [1165000000, "서초구"],
        [1120000000, "성동구"],
        [1129000000, "성북구"],
        [1171000000, "송파구"],
        [1147000000, "양천구"],
        [1156000000, "영등포구"],
        [1117000000, "용산구"],
        [1138000000, "은평구"],
        [1111000000, "종로구"],
        [1114000000, "중구"],
        [1126000000, "중랑구"],
      ];
      break;
    case 3600000000:
      countyOps = [[3611000000, "세종특별자치시"]];
      break;
    case 3100000000:
      countyOps = [
        [3114000000, "남구"],
        [3117000000, "동구"],
        [3120000000, "북구"],
        [3171000000, "울주군"],
        [3111000000, "중구"],
      ];
      break;
    case 2800000000:
      countyOps = [
        [2871000000, "강화군"],
        [2824500000, "계양구"],
        [2820000000, "남동구"],
        [2814000000, "동구"],
        [2817700000, "미추홀구"],
        [2823700000, "부평구"],
        [2826000000, "서구"],
        [2826500000, "서구검단출장소"],
        [2818500000, "연수구"],
        [2872000000, "옹진군"],
        [2811000000, "중구"],
        [2811400000, "중구영종출장소"],
        [2811800000, "중구용유출장소"],
      ];
      break;
    case 4600000000:
      countyOps = [
        [4681000000, "강진군"],
        [4677000000, "고흥군"],
        [4672000000, "곡성군"],
        [4623000000, "광양시"],
        [4673000000, "구례군"],
        [4617000000, "나주시"],
        [4671000000, "담양군"],
        [4611000000, "목포시"],
        [4684000000, "무안군"],
        [4678000000, "보성군"],
        [4615000000, "순천시"],
        [4691000000, "신안군"],
        [4613000000, "여수시"],
        [4687000000, "영광군"],
        [4683000000, "영암군"],
        [4689000000, "완도군"],
        [4688000000, "장성군"],
        [4680000000, "장흥군"],
        [4690000000, "진도군"],
        [4686000000, "함평군"],
        [4682000000, "해남군"],
        [4679000000, "화순군"],
      ];
      break;
    case 4500000000:
      countyOps = [
        [4579000000, "고창군"],
        [4513000000, "군산시"],
        [4521000000, "김제시"],
        [4519000000, "남원시"],
        [4573000000, "무주군"],
        [4580000000, "부안군"],
        [4577000000, "순창군"],
        [4571000000, "완주군"],
        [4514000000, "익산시"],
        [4514500000, "익산시함열출장소"],
        [4575000000, "임실군"],
        [4574000000, "장수군"],
        [4511000000, "전주시"],
        [4511300000, "전주시 덕진구"],
        [4511100000, "전주시 완산구"],
        [4511800000, "전주시효자출장소"],
        [4518000000, "정읍시"],
        [4572000000, "진안군"],
      ];
      break;
    case 5000000000:
      countyOps = [
        [5013000000, "서귀포시"],
        [5011000000, "제주시"],
      ];
      break;
    case 4400000000:
      countyOps = [
        [4425000000, "계룡시"],
        [4415000000, "공주시"],
        [4471000000, "금산군"],
        [4423000000, "논산시"],
        [4427000000, "당진시"],
        [4418000000, "보령시"],
        [4476000000, "부여군"],
        [4421000000, "서산시"],
        [4477000000, "서천군"],
        [4420000000, "아산시"],
        [4481000000, "예산군"],
        [4413000000, "천안시"],
        [4413100000, "천안시 동남구"],
        [4413300000, "천안시 서북구"],
        [4479000000, "청양군"],
        [4482500000, "태안군"],
        [4480000000, "홍성군"],
      ];
      break;
    case 4300000000:
      countyOps = [
        [4376000000, "괴산군"],
        [4380000000, "단양군"],
        [4372000000, "보은군"],
        [4374000000, "영동군"],
        [4373000000, "옥천군"],
        [4377000000, "음성군"],
        [4315000000, "제천시"],
        [4374500000, "증평군"],
        [4375000000, "진천군"],
        [4311000000, "청주시"],
        [4311100000, "청주시 상당구"],
        [4311200000, "청주시 서원구"],
        [4311400000, "청주시 청원구"],
        [4311300000, "청주시 흥덕구"],
        [4313000000, "충주시"],
      ];
      break;
    case 9000000000:
      countyOps = [[9999999999, "기타"]];
      break;

    default:
      break;
  }

  const handleCity = (code, str, long, lat, zm) => {
    setRegion((prev) => {
      if (prev.city.cd === code) {
        return {
          city: { cd: null, name: null },
          county: { cd: null, name: null },
        };
      } else {
        setView({
          longitude: long ? long : 127.251,
          latitude: lat ? lat : 35.865,
          zoom: zm ? zm : 6,
        });
        return {
          city: { cd: code, name: str },
          county: { cd: null, name: null },
        };
      }
    });
  };
  const handleCounty = (code, str, long, lat, zm) => {
    setRegion((prev) => {
      if (prev.county.cd === code) {
        return { ...prev, county: { cd: null, name: null } };
      } else {
        setView({
          longitude: long ? long : 127.251,
          latitude: lat ? lat : 35.865,
          zoom: zm ? zm : 6,
        });
        return {
          ...prev,
          county: { cd: code, name: str },
        };
      }
    });
  };

  const handleClose = () => {
    setExp(0);
    setRegion({
      city: { cd: null, name: null },
      county: { cd: null, name: null },
    });
  };
  ///////////////////////////////////////////////////////////////

  var rendered;

  switch (exp) {
    case 1:
      rendered = (
        <div
          ref={divEl}
          className={`regionExp ${region.city.cd ? "exp1" : ""}`}
        >
          <div
            className="region"
            style={{ border: "0px", top: "15px", left: "291px" }}
            onClick={() => setExp(1)}
          >
            지역선택
          </div>
          <div className="city">
            <div className="reg_ttl">
              {region.city.cd ? region.city.name : "시/도"}
            </div>
            <Dropdown
              options={cityOps}
              handleOps={handleCity}
              type={"city_dd"}
            />
          </div>
          {region.city.cd && (
            <div className="county">
              <div className="reg_ttl">
                {region.county.cd ? region.county.name : "시/군/구"}
              </div>
              <Dropdown
                options={countyOps}
                handleOps={handleCounty}
                type={"coun_dd"}
              />
            </div>
          )}
          <AiOutlineClose
            className={`close ${region.city.cd ? "exp1" : ""}`}
            onClick={handleClose}
          />
        </div>
      );
      break;
    case 2:
      rendered = !region.city.cd ? (
        <div className="region" onClick={() => setExp(1)}>
          지역선택
        </div>
      ) : (
        <div
          ref={divEl}
          className={`regionExp ${region.county.cd ? "exp1" : ""} exp2`}
        >
          <div
            className="region"
            style={{ border: "0px", top: "15px", left: "291px" }}
            onClick={() => setExp(1)}
          >
            지역선택
          </div>
          <div className="city">
            <div className="reg_ttl">{region.city.name}</div>
          </div>

          {region.county.cd && (
            <div className="county">
              <div className="reg_ttl">{region.county.name}</div>
            </div>
          )}
          <AiOutlineClose
            className={`close ${region.county.cd ? "exp1" : ""}`}
            onClick={handleClose}
          />
        </div>
      );
      break;
    default:
      rendered = (
        <div className="region" onClick={() => setExp(1)}>
          지역선택
        </div>
      );
      break;
  }
  ////////////////////////////////////////////////////////////
  return rendered;
};

export default Region;
