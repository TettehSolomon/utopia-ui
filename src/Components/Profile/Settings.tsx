import { useEffect, useState } from 'react'
import TitleCard from '../TitleCard'
import InputText from '../Input/InputText'
import TextAreaInput from '../Input/TextAreaInput'
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'
import * as React from 'react'

import 'react-toastify/dist/ReactToastify.css';

export function Settings({useAuth}) {

  const { user, updateUser, loading } = useAuth();

  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");


  useEffect(() => {
    setId(user?.id ? user.id : "");
    setName(user?.first_name ? user.first_name : "");
    setText(user?.description ? user.description : "");
    setEmail(user?.email ? user.email : "");
    setPassword(user?.password ? user.password : "");


  }, [user])

  const navigate = useNavigate();


  const onUpdateUser = () => {
    toast.promise(
      updateUser({ id: id, first_name: name, description: text, email: email, password: password }),
      {
        pending: 'updating Profile  ...',
        success: 'Profile updated',
        error: 'Error'
      })
      .then(() => navigate("/"));
  }


  const updateFormValue = (val: string) => {
    console.log(val)
  }

  return (
    <main className="tw-flex-1 tw-overflow-y-auto tw-overflow-x-hidden tw-pt-8 tw-px-6 tw-bg-base-200 tw-min-w-80 tw-flex tw-justify-center" >
      <div className='tw-w-full xl:tw-max-w-6xl'>
        <TitleCard title="Profile Settings" topMargin="tw-mt-2">


          <div className="tw-grid tw-grid-cols-1 tw-md:grid-cols-2 tw-gap-6">
            <InputText labelTitle="Name" defaultValue={user?.first_name ? user.first_name : ""} updateFormValue={(v) => setName(v)} />
          </div>
          <div className="tw-grid tw-grid-cols-1 tw-md:grid-cols-1 tw-gap-6 tw-pt-6 tw-pb-6">
            <TextAreaInput labelTitle="About" defaultValue={user?.description ? user.description : ""} updateFormValue={(v) => setText(v)} />
          </div>
          <div className="tw-divider" ></div>


          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
          <InputText type='email' labelTitle="E-Mail" defaultValue={user?.email ? user.email : ""} updateFormValue={(v) => setEmail(v)} />
          <InputText type='password' labelTitle="Password" defaultValue={user?.password ? user.password : ""} updateFormValue={(v) => setPassword(v)} />
            {/* <ToogleInput updateType="syncData" labelTitle="Sync Data" defaultValue={true} updateFormValue={updateFormValue}/> */}
          </div>

          <div className="tw-mt-8"><button className={loading ? " tw-loading tw-btn-disabled tw-btn tw-btn-primary tw-float-right" : "tw-btn tw-btn-primary tw-float-right"} onClick={() => onUpdateUser()}>Update</button></div>

        </TitleCard>
      </div>
    </main>
  )
}