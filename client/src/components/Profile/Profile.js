import React, { useEffect, useState, useContext } from 'react'
import '../../css/profile.css';
import { Context } from '../../contexts/Context';

export default () => {

  const [profile, setProfile] = useState({isAuthenticated: false, user: {name: '', avatar: ''}})
  const {state} = useContext(Context);

  useEffect(() => {
    document.title = 'Profile';
    setProfile(state);
    return;
  }, [state]);

    return (
      <div className="container">
        <div className="row">
        <div className="col-sm text-center">
            {profile.user.avatar ? <img alt="user-avatar" className="profile-avatar" src={profile.user.avatar}/> : 'Loadig...'}
          </div>
        </div>
        <div className="row">
          <div className="col-sm text-center">
            <h2 className="profile-title">{profile.user.name ? profile.user.name : 'Loading...'}</h2>
          </div>
        </div>
      </div>
    )
}
