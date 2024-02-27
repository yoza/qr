'use client'
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef, useReducer, useCallback, createContext } from 'react';

import Button from "@/components/Button";
import TextField from '@/components/TextField';
import AvatarField from '@/components/AvatarField';
import formReducer, { FormContext, UPDATE_FORM, /* UPDATE_FIELD */ } from "@/form/formReducer";
import initialForm, { getFormErrors, getFormData } from "@/form";
import { userFields } from "@/constants";
import { User } from '@/dbschema/interfaces';
import { type PutBlobResult } from '@vercel/blob';
import { upload } from '@vercel/blob/client';
import { uuid } from 'edgedb/dist/codecs/ifaces';
import SpinnerIcon from "@/components/svgs/spinner.svg";
import { useAppSelector, useAppDispatch } from "@/lib/redux";
import { updateUser, selectUsersStatus } from "@/lib/redux/slices";
// import { useRouter } from 'next/navigation';
import { avatarPath } from '@/constants/urls';
import clsx from 'clsx';


export const UserFormContext = createContext({} as FormContext);

export default function UserForm({ user }: { user: User }) {
  const formRef = useRef<HTMLFormElement>(null);
  const usersStatus = useAppSelector(selectUsersStatus)
  const [disabled, setDisabled] = useState<boolean>(usersStatus === 'loading' || false);
  const [state, dispatch] = useReducer(formReducer, userFields);
  const context: FormContext = { state, dispatch };
  const { name, email, avatar/* , error */ } = state;
  // const router = useRouter();

  // console.log(error)
  const appDispatch = useAppDispatch();

  /*   if (!formRef.current?.files) {
      throw new Error('No file selected');
    } */

  useEffect(() => {
    formRef.current?.reset();
    initialForm(user, context);
  }, [user]);

  const handleUser = useCallback(async (id: uuid, data: Partial<User>) => {
    const resultAction = await appDispatch(updateUser({ id: id, ...data }));

    if (updateUser.fulfilled.match(resultAction)) {
      setDisabled(false);
      // const userId = resultAction.payload;
      // console.log(resultAction)
      // TODO: update setCustomers or some else
    } else {
      if (resultAction.payload) {
        // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, those types will be available here.
        // formikHelpers.setErrors(resultAction.payload.field_errors)
        console.log("here", resultAction.payload)
        //TODO:
        // dispatch({ type: UPDATE_FORM, payload: resultAction.payload.errorMessage });
      } else {
        console.log('error', `Update failed: ${resultAction.error}`)
      }
    }
  }, [appDispatch]);


  async function handleFormSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    const errors = getFormErrors(state);
    setDisabled(true);
    if (Object.keys(errors).length) {
      dispatch({ type: UPDATE_FORM, payload: errors });
      console.log(errors);
    } else {
      const cleanData = getFormData(state);
      const id: uuid = user.id;
      const data: Partial<User> = {
        name: cleanData.name,
        email: cleanData.email,
      }

      if (!(cleanData.avatar instanceof File)) {
        await handleUser(id, data);
      } else {
        const newBlob: PutBlobResult = await upload(avatarPath + cleanData.avatar.name, cleanData.avatar, {
          access: 'public',
          handleUploadUrl: '/api/avatar/upload',
        });
        data.avatar = newBlob.url
        if (user.avatar?.length) {
          /* delete old picture */
          await fetch('api/file', {
            method: "DELETE",
            body: JSON.stringify({
              url: user.avatar,
            }),
          });
        }
        // setBlob(newBlob);
        await handleUser(id, data);
      }
      // router.refresh();
    }
  }

  return (
    <UserFormContext.Provider value={context}>
      <form className="max-w-sm grid grid-flow-row gap-4 m-auto" onSubmit={handleFormSubmit} ref={formRef}>

        <TextField props={name} context={UserFormContext} />

        <TextField props={email} context={UserFormContext} />

        <AvatarField props={{ ...avatar, name: 'file' }} context={UserFormContext} />

        <Button
          disabled={disabled}
          type="submit"
          className={clsx('flex justify-center items-center hover:bg-blue-500 text-white rounded-lg text-xl p-2',
            {
              'bg-blue-500': disabled === true,
              'bg-blue-700': disabled === false,
            }
          )}
        >
          {disabled ?
            <SpinnerIcon className='text-white text-sm stroke-white inline w-5 h-5 me-2 animate-spin fill-white' />
            : <span className='w-5 h-5 me-2' />
          }
          Submit
        </Button>
      </form>
    </UserFormContext.Provider>
  )
}
