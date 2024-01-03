'use client';
import { useState, useEffect } from 'react';

import { Dialog } from '../ui/dialog';
import Modal from '../Modal';
import MusicSelector from './MusicSelector';
import MusicStarter from './MusicStarter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getUserCountdown, createCountdown, finishCountdown, pauseCountdown } from '@/app/apiFns/timerApis';
import useGetUser from '@/app/lib/hooks/useGetUser';
import CountdownClock from './CountdownClock';
import CountdownSetup from './CountdownSetup';
import CountdownControl from './CountdownControl';

const Countdown = () => {
  const [totalSeconds, setTotalSeconds] = useState(60);
  const [totalMilliseconds, setTotalMiliseconds] = useState(totalSeconds * 1000); // 1 hour = 3600 seconds = 3600000 milliseconds
  const [countdown, setCountdown] = useState(totalMilliseconds);
  const [cd, setCd] = useState({
    hours: Math.floor(countdown / 1000 / 60 / 60),
    minutes: Math.floor(countdown / 1000 / 60),
    seconds: Math.floor((countdown / 1000) % 60)
  })
  const [isRunning, setIsRunning] = useState(false);
  const [active, setActive] = useState(false);

  
  const [cdId, setCdId] = useState(undefined);
  const [err, setErr] = useState('');

  const user = useGetUser()
  const {data } = useQuery({
    queryKey: ['countdown'],
    queryFn: () => getUserCountdown(user || '')
  })

  useEffect(() => {
    if (data){
      setCdId(data.id)
      setCountdown(data.countdown)
      setIsRunning(true);
      setActive(true);
      setCd({
        hours: Math.floor(data.countdown / 60 / 60),
        minutes: Math.floor(data.countdown / 60),
        seconds: Math.floor((data.countdown) % 60)
      })
    }
  }, [data])


  // Online timer + CRUD operations + Notification + Tracker connection + Music randomizzer
  const mutCreate = useMutation({
    mutationFn: (body) => createCountdown(body),
    onSuccess: () => {
      setIsRunning(true);
      setActive(true);
      setCountdown(totalMilliseconds);
      setCdId(data.id)
    },
    onError: () => {
      setErr('Something went wrong')
    }
})

  const mutFinish = useMutation({
    mutationFn: (id) => finishCountdown(id),
    onSuccess: () => {
      setIsRunning(false);
      setActive(false);
      setCountdown(120*1000);
      setCd({ hours: Math.floor(120 / 60 / 60), minutes: Math.floor(120  / 60), seconds: Math.floor((120 ) % 60) })
    },
    onError: () => {
      setErr('Something went wrong')
    }
})

  const mutPause = useMutation({
    mutationFn: (body) => pauseCountdown(cdId, body),
    onSuccess: () => {
      setIsRunning(false);
      setActive(false);
    },
    onError: () => {
      setErr('Something went wrong')
    }
})



  const createBeTimer = () => {
    let body = {
      user_id: user,
      countdown: totalMilliseconds
    }
    if (user && !active){
      mutCreate.mutate(body)
    }
  }

  const pauseBeTimer = async() => {
    // Elapsed time 
    let t = totalMilliseconds / 1000 - countdown
    let body = {
      elapsed: t,
    }
    if (cdId){
      mutPause.mutate(body)
    } 
  }

  const startTimer = async() => {
    if (!active && !isRunning){
      createBeTimer()
    }
  }

  const resumeTimer = () => {
    setIsRunning(true);
    setCountdown(countdown)
  }

  const stopTimer = () => {
    setIsRunning(false);

  }

  const resetTimer = async() => {
    if (cdId){
      mutFinish.mutate(cdId)
      setCdId(undefined)
    }
  }

  useEffect(() => {
    if (isRunning && countdown > 0) {
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 10);
      }, 10);
      return () => clearInterval(interval);
    } else {
      setIsRunning(false);
    }
    //@ts-ignore
  }, [countdown, isRunning]);

  useEffect(() => {
    if (isRunning && countdown > 0) {
      setCd({
        hours: Math.floor(countdown / 1000 / 60 / 60),
        minutes: Math.floor(countdown / 1000 / 60),
        seconds: Math.floor((countdown / 1000) % 60)
      });
    }
  }, [countdown, isRunning]);

  const renderDialog = () => {
    return <Modal title='Add some music' description='via YT music' content={<MusicSelector/>}/>
  }

  return <div className='flex flex-col justify-between items-center h-full gap-2'>
    {/* <TimerWidget /> */}
    <Dialog>
      <CountdownClock countdown={countdown} totalMilliseconds={totalMilliseconds} cd={cd} data={data} setCountdown={setCountdown} setTotalMiliseconds={setTotalMiliseconds} setTotalSeconds={setTotalSeconds} />
      {err && <div className='typo-long text-red-500'>{err}</div>}
      {cdId && <>{cdId}</>}
      <CountdownControl active={active} isRunning={isRunning} startTimer={startTimer} stopTimer={stopTimer} resetTimer={resetTimer} resumeTimer={resumeTimer} />
      <div className='box-dark h-[100px]'>
        {!active && !isRunning && <CountdownSetup cd={cd} setCd={setCd}  />}
        {active && <MusicStarter/>}
      </div>
      {renderDialog()}
      {countdown === 0 && <div className='typo-long'>Save</div>}
    </Dialog>
    <div className='typo-label'>tbd add footer</div>
    <div className='box-dark'>
          Project
    </div>
  </div>
}

export default Countdown