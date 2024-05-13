import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button'
import {PlaidLinkOptions, PlaidLinkOnSuccess, usePlaidLink} from 'react-plaid-link'
import { useRouter } from 'next/navigation';
import { createLinkToken } from '@/lib/actions/user.action';
import { exchangePublicToken } from '@/lib/actions/user.action';

const PlaidLink = ({user, variant}:PlaidLinkProps) => {
    const [error, setError] = useState(null);

    const router = useRouter()

    const [token, setToken] = useState('');

    useEffect(() => {
        const getLinkedToken = async () => {
            try {
                const data = await createLinkToken(user);
                setToken(data?.linkToken);
            } catch (error:any) {
                setError(error.message  || 'An unknown error occurred'); // Update error state if token creation fails
            }
        };

        getLinkedToken();
    }, [user]);

    const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
        try {
            await exchangePublicToken({
                publicToken: public_token,
                user,
            });
            router.push('/');
        } catch (error:any) {
            setError(error.message); // Update error state if token exchange fails
        }
    }, [user, router]);

    const config:PlaidLinkOptions = {
        token,
        onSuccess
    }
    const {open, ready} = usePlaidLink(config);
  return (
    <>
    { variant === 'primary' ? (
        <Button onClick={()=> open()} disabled={!ready} className='plaidlink-primary'>Connect Bank</Button>
    ) : variant === 'ghost' ? (
        <Button>Connect Bank</Button>
    ) : (
        <Button>Connect Bank</Button>
    )}
    </>
  )
}

export default PlaidLink