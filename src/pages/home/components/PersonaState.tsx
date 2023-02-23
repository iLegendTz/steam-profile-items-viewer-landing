import React from 'react';
import { useState, useEffect } from 'react';

interface Props {
    personastate: number
}

export const PersonaState = ({ personastate }: Props) => {
    const [inputClasses, setInputClasses] = useState<string[]>(['text-slate-600']);
    const [stateText, setStateText] = useState('Offline');

    useEffect(() => {
        switch (personastate) {
            // offline
            case 0:
                setInputClasses(['text-slate-600']);
                setStateText('Offline')
                break;

            //online
            case 1:
                setInputClasses(['text-lime-600']);
                setStateText('Online')
                break;

            //busy
            case 2:
                setInputClasses(['text-red-600']);
                setStateText('Busy')
                break;

            // away
            case 3:
                setInputClasses(['text-amber-600']);
                setStateText('Away')
                break;

            // snooze
            case 4:
                setInputClasses(['text-violet-600']);
                setStateText('Snooze')
                break;

            // looking to trade
            case 5:
                setInputClasses(['text-white']);
                setStateText('Looking to Trade')
                break;

            // looking to play
            case 6:
                setInputClasses(['text-white']);
                setStateText('Looking to Play')
                break;

            default:
                setInputClasses(['text-slate-600']);
                setStateText('Offline')
                break;
        }

    }, [personastate]);


    return (
        <>
            <label>Status: </label>
            <input className={`${inputClasses.join(' ')} block w-full`} value={stateText} readOnly />
        </>
    )
}
