import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ErrorText from '../Typography/ErrorText'
import { TextInput } from '../Input/TextInput'
import * as React from 'react'
import { toast } from 'react-toastify'
import { useAuth } from './useAuth'
import { MapOverlayPage} from '../Templates'

export function SetNewPasswordPage() {

    const [password, setPassword] = useState<string>("");

    const { passwordReset, loading } = useAuth();

    const navigate = useNavigate();

    const onReset = async () => {
        const token = window.location.search.split("token=")[1];
        console.log(token);
        
        await toast.promise(
            passwordReset(token, password),
            {
                success: {
                    render() {
                        navigate(`/`);
                        return `New password set`
                    },
                },
                error: {
                    render({ data }) {
                        return `${data}`
                    },
                },
                pending: 'setting password ...'
            });
    }

    return (
        <MapOverlayPage>
            <h2 className='tw-text-2xl tw-font-semibold tw-mb-2 tw-text-center'>Set new Password</h2>
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} className="tw-input tw-input-bordered tw-w-full tw-max-w-xs" />
            <div className="tw-card-actions tw-mt-4">
                <button className={loading ? 'tw-btn tw-btn-disabled tw-btn-block tw-btn-primary' : 'tw-btn tw-btn-primary tw-btn-block'} onClick={() => onReset()}>{loading ? <span className="tw-loading tw-loading-spinner"></span> : 'Set'}</button>
            </div>
        </MapOverlayPage>
    )
}
