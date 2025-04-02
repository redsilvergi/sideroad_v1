{
  "short_name": "React App",
  "name": "Create React App Sample",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}


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

//footnote ----------------------------------------------------------------------
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

//LAYER ----------------------------------------------------------------------
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


//table1 ----------------------------------------------------------------------

        tdataF = () => {
          const keys = ['sum', 'age0_12', 'age13_64', 'age65_200'];
          const res = keys.map((key, id) => {
            const transformed = [];
            const transformed_pd = [];
            tmp &&
              tmp.forEach((item) => {
                //   const yrint = yr ? parseInt(yr.slice(0, 4), 10) : 2023;
                if (
                  parseInt(item.yr, 10) <= yrint &&
                  parseInt(item.yr, 10) >= yrint - 4
                ) {
                  transformed.push(item[key]);
                  transformed_pd.push(item[`${key}_pd`]);
                }
              });
            return { transformed: transformed, transformed_pd: transformed_pd };
          });
          return res;
        };

        tdata =
          tmp &&
          tmp.map((item, id) => {l).reverse();

              const yrint = parseInt(yr.slice(0,4),10);
              if (parseInt(item.yr,10) <= yrint && parseInt(item.yr,10) >= yrint - 4) {
                  return [item.sum2, item.age0_12, item.age13_64, item.age65_200];
              } else {
                  return null
              }

            }).filter((item)=>item!==nul
        tdata =
          genfo &&
          genfo
            .slice(0, 5)
            .map((item, id) => {
              return [item.sum, item.age0_12, item.age13_64, item.age65_200];
            })
            .reverse();

        return (
          data &&
          data.map((item, id, arr) => {
            if (id === genfo.length - 1) {
              return { ...item, sum_pd: null };
            } else {
              const cursum = parseFloat(item.sum2);
              const presum = parseFloat(arr[id + 1].sum2);
              console.log('cursum & presum:', cursum, presum);
              const sum_pd = (cursum / presum - 1) * 100;
              return { ...item, sum_pd: parseFloat(sum_pd.toFixed(2)) };
            }
          })
        );

        updowndata =
          genfo &&
          genfo
            .slice(0, genfo.length - 1)
            .map((item, index) => {
              return [
                ((item.sum - genfo[index + 1].sum) / genfo[index + 1].sum) * 100,
                ((item.age0_12 - genfo[index + 1].age0_12) /
                  genfo[index + 1].age0_12) *
                  100,
                ((item.age13_64 - genfo[index + 1].age13_64) /
                  genfo[index + 1].age13_64) *
                  100,
                ((item.age65_200 - genfo[index + 1].age65_200) /
                  genfo[index + 1].age65_200) *
                  100,
              ];
            })
            .reverse();



            {/* 
          <td>
            {tdata && tdata[id] && !isNaN(tdata[id][4]) ? tdata[id][4] : ''}
          </td>
          <td>
            {tdata_pd && tdata_pd[id] && !isNaN(tdata_pd[id][4])
              ? tdata_pd[id][4]
              : ''}
          </td>
          <td>
            {tdata && tdata[id] && !isNaN(tdata[id][3]) ? tdata[id][3] : ''}
          </td>
          <td>
            {tdata_pd && tdata_pd[id] && !isNaN(tdata_pd[id][3])
              ? tdata_pd[id][3]
              : ''}
          </td>
          <td>
            {tdata && tdata[id] && !isNaN(tdata[id][2]) ? tdata[id][2] : ''}
          </td>
          <td>
            {tdata_pd && tdata_pd[id] && !isNaN(tdata_pd[id][2])
              ? tdata_pd[id][2]
              : ''}
          </td>
          <td>
            {tdata && tdata[id] && !isNaN(tdata[id][1]) ? tdata[id][1] : ''}
          </td>
          <td>
            {tdata_pd && tdata_pd[id] && !isNaN(tdata_pd[id][1])
              ? tdata_pd[id][1]
              : ''}
          </td>
          <td>
            {tdata && tdata[id] && !isNaN(tdata[id][0]) ? tdata[id][0] : ''}
          </td>
          <td>
            {tdata_pd && tdata_pd[id] && !isNaN(tdata_pd[id][0])
              ? tdata_pd[id][0]
              : ''}
          </td> */}