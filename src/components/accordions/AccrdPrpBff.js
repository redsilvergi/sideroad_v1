import './AccrdPrpBff.css';
import React from 'react';

const AccrdPrpBff = () => {
  return (
    <div className="prpbff_wrap">
      <div className="prpbff_lbl">버퍼영역</div>
      <div>
        <div key={`checkbox`}>
          <label className="prpbff_chk_lb">
            <input
              className="prpbff_custom_cb"
              type="checkbox"
              name={`checkbox`}
              checked={true}
              onChange={() => console.log('checkbox')}
            />
            <div className="prpbff_chk_item">
              <div className={`prpbffC prpbffCbox`}></div>
              <div className="prpbff_chk_word">helloworld</div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default AccrdPrpBff;
