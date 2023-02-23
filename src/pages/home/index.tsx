import React from 'react'
import { useForm } from '../../hooks/useForm';
import { useSteamUser } from '../../hooks/useSteamUser';
import { useState, useEffect } from 'react';
import { UserInfo } from './components/UserInfo';
import { useNavigate, useParams } from 'react-router-dom';

interface InitialForm {
    userUrl: string
}

const initialForm: InitialForm = {
    userUrl: ''
}

export const Home = () => {
    const { steamId } = useParams();
    const navigate = useNavigate();

    const [containerClasses, setContainerClasses] = useState<string[]>([])
    const { form: { userUrl }, handleChange, handleBlur } = useForm(initialForm);
    const { user, loading: useSteamUserLoading, handleUser } = useSteamUser();

    const handleUserProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const urlArray = userUrl.split('/');

        const urlType = urlArray.find((value) => value === 'profiles' || value === 'id');
        const profileId = urlArray[urlArray.findIndex((value) => value === 'profiles' || value === 'id') + 1];

        if (!urlType) return;

        await handleUser(profileId, urlType)
            .then((response) => {
                if (response) {
                    navigate(`/${response.player.steamid}`);
                }
            });
    }

    useEffect(() => {
        if (!user) {
            setContainerClasses('flex h-screen items-center'.split(' '));
        } else {
            setContainerClasses('mt-14 mb-7'.split(' '));
        }
    }, [user]);

    useEffect(() => {
        if (steamId) {
            const searchUser = async () => {
                await handleUser(steamId, 'profiles')
                    .then((response) => {
                        if (!response) {
                            navigate('/');
                        }
                    });
            }

            searchUser();
        }
    }, []);

    if (useSteamUserLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`${containerClasses.join(' ')}`}>
            <div className='container mx-auto'>
                <form className='flex' onSubmit={handleUserProfile}>
                    <input
                        className='w-full px-2 text-xl outline-0 text-black rounded-l-lg'
                        name='userUrl'
                        type={'text'}
                        placeholder='Link del perfil de steam'
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        onBlur={(e) => handleBlur(e.target.name, e.target.value)}
                        value={userUrl}
                    />

                    <button
                        type="submit"
                        className="py-3 px-3 text-white bg-blue-700 hover:bg-blue-900 rounded-r-lg">
                        Buscar
                    </button>
                </form>

                {user &&
                    (
                        <>
                            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                            <UserInfo user={user} />
                        </>
                    )
                }
            </div>
        </div>
    );
}
