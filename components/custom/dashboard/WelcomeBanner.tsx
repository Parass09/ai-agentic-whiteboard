"use client"
import React from 'react'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button';
import { Sparkles, Lightbulb } from 'lucide-react';
import CreateNewBoardDialoge from './CreateNewBoardDialoge';

function WelcomeBanner() {
  const { user } = useUser();

  return (
    <div>
      <div className="relative p-10 border rounded-xl bg-gradient-to-r from-blue-200 to-purple-200 overflow-hidden">

        {/* Small label with sparkle icon */}
        <div className="flex items-center gap-1 text-purple-600 text-sm font-medium mb-2">
          <Sparkles className="w-4 h-4" />
          Your creative workspace
        </div>

        {/* Heading with gradient name */}
        <h2 className="text-2xl font-bold">
          Welcome back,{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {user?.firstName}
          </span>{" "}
          👋
        </h2>

        <p className="mt-2 text-gray-600">
          Turn your ideas into diagrams, notes and visuals on an infinite canvas.
        </p>

        {/* Buttons row */}
        <div className="mt-5 flex items-center gap-2">
          <CreateNewBoardDialoge />
          <Button
            variant="outline"
            className="bg-white text-purple-600 border-purple-300 hover:bg-purple-50"
          >
            <Sparkles className="w-4 h-4 mr-1" />
            Ask AI
          </Button>
        </div>

        {/* Decorative mock card - right side */}
        <div className="hidden md:block absolute top-6 right-6 bg-white rounded-lg shadow-md p-3 w-40">
          <div className="flex gap-1 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
          </div>
          <div className="flex gap-1 flex-wrap mb-2">
            <span className="flex items-center gap-1 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full shadow-sm">
              <Lightbulb className="w-3 h-3" />
              New Idea
            </span>
            <span className="flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full shadow-sm">
              <Sparkles className="w-3 h-3" />
              AI Brainstorm
            </span>
          </div>
          <p className="text-xs text-gray-500">Design → Build → Ship</p>
        </div>

      </div>
    </div>
  )
}

export default WelcomeBanner
