import { useState } from 'react';

import { SteamUser } from '../interfaces/SteamUser';

import { apiInstance } from '../api/apiInstance';


export const useSteamUser = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<SteamUser | null>(null);
    const [error, setError] = useState<Error | null>(null);

    const handleUser = async (profileId: string, linkProfileType: string): Promise<SteamUser | null> => {
        setLoading(true);

        const url = linkProfileType === 'profiles' ? '/users/user-profile-by-steam-id' : '/users/user-profile-by-custom-id';

        let user: SteamUser | null;

        if (linkProfileType === 'profiles') {
            user = await apiInstance.post<SteamUser>(url, {
                steamid: profileId
            })
                .then(({ data }) => {
                    setUser(data);
                    return data;
                })
                .catch((err) => {
                    setError(new Error(err.message));
                    return null;
                })
                .finally(() => setLoading(false));
        } else {
            user = await apiInstance.post<SteamUser>(url, {
                customId: profileId
            })
                .then(({ data }) => {
                    setUser(data);
                    return data;
                })
                .catch((err) => {
                    setError(new Error(err.message));
                    return null;
                })
                .finally(() => setLoading(false));
        }

        return user;
    }

    return { loading, user, error, handleUser }
}
