import React from 'react';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux.hook';
import { getProspectStatus } from '../../redux/prospectStatusSlice';
import { getProspects } from '../../redux/prospectSlice';

import ProspectLine from './ProspectLine.component';
import LineContainer from './LineContainer.component';

function ListView({ color = 'light', seeArchive = false }) {
  const { status, loading: loadingStatus } = useAppSelector((state) => state.prospectStatus);
  const { prospects, loading: loadingProspect } = useAppSelector((state) => state.prospects);

  let prospectsNotArchive = prospects.filter((prospect: IProspect, i: number) => {
    if (!prospect.is_archived) {
      return prospect;
    }
  });
  if (seeArchive) {
    prospectsNotArchive = prospects.filter((prospect: IProspect, i: number) => {
      if (prospect.is_archived) {
        console.log(prospect);
        return prospect;
      }
    });
    console.log(prospectsNotArchive);
  }

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProspects());
    dispatch(getProspectStatus());
  }, []);

  return (
    <>
      <div className={'relative flex flex-col min-w-0 break-words w-full  h-[90%] mb-6 rounded'}>
        {!seeArchive &&
          status.map((sts, i) => {
            return (
              <LineContainer
                prospects={prospectsNotArchive}
                status={sts.name}
                key={i + sts.name + sts.id}
                color={color}
                seeArchive={seeArchive}
              />
            );
          })}
        {seeArchive && (
          <LineContainer
            prospects={prospectsNotArchive}
            status={'Archivé'}
            color={color}
            seeArchive={seeArchive}
          />
        )}
      </div>
    </>
  );
}

export default ListView;
