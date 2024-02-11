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
