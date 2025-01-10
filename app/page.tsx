'use client';

import Image from 'next/image';
import TweetGenerator from './components/TweetGenerator';
import LanguageSwitcher from "@/app/components/LanguageSwitcher";

export default function Home() {
  return (
    <main className="App">
      <div className='container'>
          <LanguageSwitcher/>
        <TweetGenerator />
      </div>
    </main>
  )
}