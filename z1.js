const [hl, setHl] = useState(null);
const layer2 = useMemo(() => {
  return new MVTLayer({
    id: "mvt-layer2",
    data: `https://api.mapbox.com/v4/redsilver522.4vi5iskr/{z}/{x}/{y}.vector.pbf?access_token=${MAPBOX_ACCESS_TOKEN}`,
    lineWidthScale: 20,
    lineWidthMinPixels: 1,
    lineWidthMaxPixels: 15,
    pickable: true,
    visible: view.zoom >= 11 && view.zoom <= 20,
    getLineColor: (d) => {
      if (hl && d.properties.fid === hl) {
        return [255, 0, 0, 128]; // Highlighted color
      }
      return [0, 128, 0, 128]; // Regular color
    },
    onHover: (d) => {
      if (d && d.object) {
        setHl(d.object.properties.fid);
      } else {
        setHl(null);
      }
    },
    onClick: (d) => console.log(d.object.properties),
    updateTriggers: {
      getLineColor: hl,
    },
  });
}, [view.zoom, hl]);

//footnote -----------------------------------------------------
<div className="footnote">
  <div className="fnt">데이터 출처</div>
  <div style={{ marginTop: "7px" }}>
    ㆍ2022, 국가기본도DB (도로링크 데이터), 국토지리정보원
  </div>
  <div style={{ marginBottom: "5px" }}>
    ㆍ2023, 국가중점데이터(토지이용계획정보), 국가공간정보포털
  </div>
  <div>*시차로 인한 속성정보 누락구간에 유의·활용 바랍니다.</div>
</div>;

//LAYER ---------------------------------------------------
const layer2 = useMemo(() => {
  return new MVTLayer({
    id: "mvt-layer2",
    data,
    // data: `https://api.mapbox.com/v4/redsilver522.blb67rex/{z}/{x}/{y}.vector.pbf?access_token=${MAPBOX_ACCESS_TOKEN}`,
    // data: `https://api.mapbox.com/v4/redsilver522.nationalroad/{z}/{x}/{y}.vector.pbf?access_token=${MAPBOX_ACCESS_TOKEN}`,
    // data: `https://tiles-sideroad.s3.ap-northeast-2.amazonaws.com/tiles_ext2/{z}/{x}/{y}.pbf`,
    // lineWidthScale: 20,
    lineWidthMinPixels: view.zoom <= 8 ? 3 : 1,
    lineWidthMaxPixels: view.zoom < 14 ? 2 : view.zoom < 17 ? 5 : 10,
    getLineWidth: 500,
    pickable: true,
    visible: isFilter && view.zoom >= 6 && view.zoom <= 20,
    getLineColor: (d) => {
      return getRoadColor(d);
    },
    onClick: (d) => console.log(d.object.properties),
    updateTriggers: {
      getLineColor: [info, region],
    },
  });
}, [data, view.zoom, isFilter, info, getRoadColor, region]);
const layers = [layer2];
