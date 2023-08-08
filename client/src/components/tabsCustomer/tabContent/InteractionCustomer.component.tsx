import React, { useState, useEffect } from 'react';
import { Typography } from '@material-tailwind/react';

import { useAppSelector, useAppDispatch } from '../../../hooks/redux.hook';

import { getInteractions, addInteraction } from '../../../redux/interactionSlice';
import ChatInteraction from '../../chat/ChatInteraction.component';
import { IoMdSend } from 'react-icons/io';

interface IProps {
  customer: IProspect;
}

function InteractionCustomer({ customer }: IProps) {
  const dispatch = useAppDispatch();

  const { interactions } = useAppSelector((state) => state.interactions);

  useEffect(() => {
    dispatch(getInteractions());
  }, []);

  /**
   * Create interactions
   */
  const [report, setReport] = useState('');

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const data = {
      report: report,
      reported_by_id: 1, //+++ get user id from token
      reported_at: new Date(),
      prospect_id: Number(customer.id),
    };
    try {
      await dispatch(addInteraction(data)).unwrap();
      setReport('');
    } catch (err) {
      console.error('Failed to save the interaction: ', err);
    }
  };

  return (
    <div className="grow flex flex-col gap-4">
      <div className="grow px-4 lg:p-4 flex flex-col gap-2">
        <div className="grow max-h-[35vh] border border-gray-400 rounded-lg p-2 overflow-auto bg-white flex flex-col">
          {interactions.length > 0 ? (
            interactions.map((interaction: IInteraction, i: number) => {
              if (interaction.prospect_id === customer.id && !interaction.is_archived) {
                return (
                  <ChatInteraction
                    key={i + interaction.report}
                    report={interaction}
                    prospectId={customer.id}
                  />
                );
              }
            })
          ) : (
            <p className="text-center mt-4 font-bold">... pas d'intéractions trouvées ... </p>
          )}
        </div>
        <div className="h-2/6 border border-gray-400 rounded-lg overflow-hidden relative">
          <textarea
            name="interaction"
            id="interaction"
            className="h-full w-full p-2 resize-none pb-9"
            placeholder="Décrire votre intéraction..."
            value={report}
            onChange={(e) => setReport(e.target.value)}
          ></textarea>
          <button
            className="block absolute bottom-2 right-2 bg-green-400 rounded-lg h-fit px-4 py-1"
            onClick={(e) => {
              handleClick(e);
            }}
          >
            <IoMdSend className="text-xl text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default InteractionCustomer;
