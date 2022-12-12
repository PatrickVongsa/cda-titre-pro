import React from 'react';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux.hook';
import { getProspectStatus } from '../../redux/prospectStatusSlice';
import { getProspects } from '../../redux/prospectSlice';

import ProspectLine from './ProspectLine.component';
import LineContainer from './LineContainer.component';

function ListView({ color = 'light' }) {
  const { status, loading: loadingStatus } = useAppSelector((state) => state.prospectStatus);
  const { prospects, loading: loadingProspect } = useAppSelector((state) => state.prospects);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProspects());
    dispatch(getProspectStatus());
  }, []);

  return (
    <>
      <div
        className={
          'relative flex flex-col min-w-0 break-words w-full mb-6 rounded'
        }
      >
        {status.map((sts, i) => {
            return (
              <LineContainer
                prospects={prospects}
                status={sts.name}
                key={i + sts.name + sts.id}
                color={color}
              />
            );
          })}
      </div>
    </>
  );
}

export default ListView;
