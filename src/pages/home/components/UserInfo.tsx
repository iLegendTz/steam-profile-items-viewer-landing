import React from 'react';

import { SteamUser } from '../../../interfaces/SteamUser';
import { PersonaState } from './PersonaState';

interface Props {
    user: SteamUser
}

export const UserInfo = ({ user: { player, items } }: Props) => {
    return (
        <div>
            <div className='flex flex-col items-center'>
                <img src={player.avatarfull} alt='profile' className='w-56 h-56' />

                <div className='w-56'>
                    <div>
                        <label>steamid: </label>
                        <input className='text-black block w-full' value={player.steamid} readOnly />
                    </div>

                    <div>
                        <label>Nickname: </label><input className='text-black block w-full' value={player.personaname} readOnly />
                    </div>

                    <div>
                        <label>Nombre Real: </label><input className='text-black block w-full' value={player.realname} readOnly />
                    </div>

                    <div>
                        <label>Pais: </label><input className='text-black block w-full' value={player.loccountrycode} readOnly />
                    </div>

                    <div>
                        <PersonaState personastate={player.personastate} />
                    </div>
                </div>
            </div>

            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

            <div className='flex flex-col items-center gap-5 md:justify-evenly lg:gap-0 md:flex-row'>
                {/* Avatar */}
                <div className='w-full max-w-56'>
                    <div>
                        <img src={`${items.avatar.src}`} alt='avatar' className='w-full' />
                        {
                            (items.avatar.gameId && items.avatar.gameName)
                            &&
                            (
                                <h4 className='text-center mt-1 underline'>
                                    <a href={`https://store.steampowered.com/app/${items.avatar.gameId}`}
                                        target="_blank"
                                        rel="noreferrer">
                                        {items.avatar.gameName}
                                    </a>
                                </h4>
                            )
                        }
                    </div>
                </div>

                {/* Frame */}
                <div className='w-full max-w-56'>
                    <div>
                        <img src={`${items.frame.src}`} alt='frame' className='w-full' />
                        {
                            (items.frame.gameId && items.frame.gameName)
                            &&
                            (
                                <h4 className='text-center mt-1 underline'>
                                    <a href={`https://store.steampowered.com/app/${items.frame.gameId}`}
                                        target="_blank"
                                        rel="noreferrer">
                                        {items.frame.gameName}
                                    </a>
                                </h4>
                            )
                        }
                    </div>
                </div>

                {/* Background */}
                <div className='w-full max-w-96' >
                    <div>
                        {
                            items.background.src?.includes('.mp4')
                                ? <video controls loop autoPlay src={`${items.background.src}`} className='w-full' />
                                : <img src={`${items.background.src}`} alt='background' className='w-full' />
                        }

                        {
                            (items.background.gameId && items.background.gameName)
                            &&
                            (
                                <h4 className='text-center mt-1 underline'>
                                    <a href={`https://store.steampowered.com/app/${items.background.gameId}`}
                                        target="_blank"
                                        rel="noreferrer">
                                        {items.background.gameName}
                                    </a>
                                </h4>
                            )
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}
