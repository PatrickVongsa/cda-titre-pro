import { Typography } from '@material-tailwind/react';
import { current } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { FaArchive } from 'react-icons/fa';
import { useAppDispatch } from '../../hooks/redux.hook';
import { updateInteraction, archiveInteraction } from '../../redux/interactionSlice';

interface IProps {
  report: IInteraction;
  prospectId: number;
}

function ChatInteraction({ report, prospectId }: IProps) {
  const [updating, setUpdating] = useState(false);
  const [reportValue, setReportValue] = useState(report.report);
  const dispatch = useAppDispatch();

  const handleSubmitKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.stopPropagation();
      e.preventDefault();
      const data = {
        id: report.id,
        report: reportValue,
        reported_by_id: 1, //+++ get user id from token
        reported_at: report.reported_at,
        prospect_id: Number(prospectId),
        modified_by_id: 1,
        modified_at: new Date(),
      };
      await dispatch(updateInteraction(data));

      setUpdating(false);
    }
    if (e.key === 'Escape') {
      setUpdating(false);
    }
  };

  const handleArchiveClick = async (report: IInteraction) => {
    await dispatch(archiveInteraction(report));
  };

  const currentUser = { id: 1 };

  return (
    <>
      {!updating ? (
        <div
          className={`group/message relative w-3/4 mb-3 ${
            currentUser.id === report.reported_by_id ? 'self-end' : ''
          }`}
        >
          <div
            className={`relative mb-1 bg-white rounded p-2 ${
              currentUser.id === report.reported_by_id ? 'bg-blue-100' : 'bg-yellow-100'
            }`}
            onClick={() => setUpdating(!updating)}
          >
            <Typography variant="paragraph">{reportValue}</Typography>
          </div>
          <p className="text-sm text-end">
            {report.reported_by?.firstname} {report.reported_by?.lastname}
          </p>
          <button
            className="absolute top-4 -translate-y-2/4 right-0 text-sm z-10 p-2 rounded-lg border border-gray-400 invisible hover:bg-gray-400 hover:text-white group-hover/message:visible"
            title="Archiver l'intéraction"
            onClick={(e) => {
              e.stopPropagation();
              handleArchiveClick(report);
            }}
          >
            <FaArchive />
          </button>
        </div>
      ) : (
        <div
          className={`relative w-3/4 mb-3 ${
            currentUser.id === report.reported_by_id ? 'self-end' : ''
          }`}
        >
          <textarea
            className="border-0 px-3 py-3 resize-none placeholder-blue-gray-300 text-blue-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            cols={30}
            rows={2}
            value={reportValue}
            onChange={(e) => setReportValue(e.target.value)}
            onKeyUp={(e) => handleSubmitKeyDown(e)}
            autoFocus
          ></textarea>
        </div>
      )}
    </>
  );
}

export default ChatInteraction;
