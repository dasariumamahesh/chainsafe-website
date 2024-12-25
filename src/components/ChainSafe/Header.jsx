"use client";

import React, { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Switch } from '@/components/ui/switch';
import { Sun, Moon, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import chainSafeLogo from '@/app/images/chainsafe-logo.png';

const HeaderComponent = ({ isDarkMode, onDarkModeChange, typedText }) => (
  <div className="border-b border-[hsl(var(--header-border))] bg-[hsl(var(--header-bg))]">
    <div className="w-full py-3 relative">
      {/* Added Home Button */}
      <div className="absolute left-4 top-1/3 -translate-y-1/2 z-10">
        <Link href="/chainsafe">
          <Button 
            className="h-10 px-4 bg-zinc-200 hover:bg-zinc-400 text-black font-medium flex items-center gap-2 rounded-none rounded dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
            Home
          </Button>
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14">
            <Image src={chainSafeLogo} alt="ChainSafe Logo" className="object-contain" priority fill />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#2F6FEB] to-[#3B82F6] bg-clip-text text-transparent font-inter">
            ChainSafe
          </h1>
        </div>
        <div className="h-5 overflow-hidden">
          <p className="text-sm font-medium text-center font-inter">
            {typedText}
          </p>
        </div>
      </div>

      <div className="absolute top-6 right-6 flex items-center gap-2">
        <Sun className="h-5 w-5 text-yellow-500" />
        <Switch 
          checked={isDarkMode} 
          onCheckedChange={onDarkModeChange} 
          className="data-[state=checked]:bg-purple-500" 
        />
        <Moon className="h-5 w-5 text-blue-500" />
      </div>
    </div>
  </div>
);

HeaderComponent.displayName = 'Header';
export const Header = memo(HeaderComponent);