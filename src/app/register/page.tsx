'use client';

import './style.css';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Step1 from './step1/content';
import Step2 from './step2/content';
import Step3 from './step3/content';

export default function Home(): any {
  const searchParams = useSearchParams();
  const [registerStep, setRegisterStep] = useState(1);
  const router = useRouter();
  const [nameValue, setNameValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [confirmValue, setConfirmValue] = useState('');
  const [genderValue, setGenderValue] = useState('');
  const [birthValue, setBirthValue] = useState('');
  const [next, setNext] = useState('');
  const getValues = (name: string, value: string) => {
    switch (name) {
      case 'name':
        setNameValue(value);
        break;
      case 'phone':
        setPhoneValue(value);
        break;
      case 'confirm':
        setConfirmValue(value);
        break;
      case 'gender':
        setGenderValue(value);
        break;
      case 'birth':
        setBirthValue(value);
        break;
      case 'next':
        setNext(value);
        break;
    }
  };

  const registerAPI = () => {
    fetch(`${process.env.NEXT_BASE_URL}user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        socialEmail: searchParams.get('socialEmail'),
        provider: searchParams.get('provider'),
        username: nameValue,
        gender: genderValue,
        age: birthValue,
        phone: phoneValue,
      }),
    }).then((res) => {
      console.log(res.status);
      if (res.status == 200) {
        router.push('../login');
        return;
      }
    });
  };

  if (next) registerAPI();

  return (
    <>
      {
        [
          <></>,
          <Step1
            setValues={() => {}}
            prevStep={() => {}}
            nextStep={() => {
              setRegisterStep(2);
            }}
            key={1}
          />,
          <Step2
            setValues={getValues}
            prevStep={() => {
              setRegisterStep(1);
            }}
            nextStep={() => {
              setRegisterStep(3);
            }}
            key={1}
          />,
          <Step3
            setValues={getValues}
            prevStep={() => {
              setRegisterStep(2);
            }}
            nextStep={() => {
              registerAPI();
            }}
            key={1}
          />,
        ][registerStep]
      }
    </>
  );
}
