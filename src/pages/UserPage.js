import './UserPage.css';
import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
import LeftBarUser from '../components/bars/LeftBarUser';
import Table3 from '../components/table/Table3';
import Table4 from '../components/table/Table4';
import useInfo from '../hooks/use-info';

function UserPage() {
  // setup ----------------------------------------------------------------------
  // const { username } = useParams();
  const [srvydata, setSrvydata] = useState(null);
  const [editmode, setEditmode] = useState(false);
  const { setPfrPick, setExp } = useInfo();

  // useeffect ------------------------------------------------------------------
  useEffect(() => {
    setPfrPick(null);
    setExp(2);
  }, [setPfrPick, setExp]);

  return (
    <div className="userpage_wrap">
      <LeftBarUser />
      <div className="userpage_container">
        <Table4 setSrvydata={setSrvydata} setEditmode={setEditmode} />
        {srvydata && srvydata.length !== 0 ? (
          <Table3
            srvydata={srvydata}
            setSrvydata={setSrvydata}
            editmode={editmode}
            setEditmode={setEditmode}
          />
        ) : null}
      </div>
    </div>
  );
}

export default UserPage;
