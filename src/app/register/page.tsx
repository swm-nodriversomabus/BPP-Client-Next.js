'use client';

import './style.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Step1 from './step1/content';
import Step2 from './step2/content';
import Step3 from './step3/content';

export default function Home(): any {
  const [registerStep, setRegisterStep] = useState(1);
  const router = useRouter();
  const [nameValue, setNameValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [genderValue, setGenderValue] = useState('');
  const [birthValue, setBirthValue] = useState('');
  const getValues = (name: string, value: string) => {
    switch (name) {
      case 'name':
        setNameValue(value);
        break;
      case 'phone':
        setPhoneValue(value);
        break;
      case 'gender':
        setGenderValue(value);
        break;
      case 'birth':
        setBirthValue(value);
        break;
    }
  };

  const registerAPI = () => {
    fetch('https://dev.yeohaengparty.com/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: nameValue,
        nickname: nameValue,
        gender: 0,
        age: 0,
        phone: phoneValue,
        email: '',
        address: '',
        role: 0,
        blacklist: false,
        personality: '',
        stateMessage: '',
        mannerScore: 0,
        createdUserId: 0,
        updatedUserId: 0,
        isActive: true,
      }),
    }).then((res) => {
      if (res.status == 200) {
        router.push('../');
        return;
      }
    });
  };
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
