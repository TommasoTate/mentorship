'use client'

import React, { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Startup } from '@/db/schema'
import FounderForm from './founder-form'
import MentorForm from './mentor-form'
import StartupperForm from './startupper-form'
import { AnimatePresence, motion } from 'framer-motion'

export default function OnboardingForm({
  startupsPromise,
}: {
  startupsPromise: Promise<Startup[]>
}) {
  const [role, setRole] = useState<Role>('mentor')

  return (
    <div className="w-full flex flex-col justify-start max-w-2xl mx-auto space-y-6">
      <Tabs value={role} onValueChange={(value) => setRole(value as Role)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger
            className="transition-colors duration-300 ease-in-out"
            value="mentor"
          >
            Mentor
          </TabsTrigger>
          <TabsTrigger
            className="transition-colors duration-300 ease-in-out"
            value="startup_admin"
          >
            Founder
          </TabsTrigger>
          <TabsTrigger
            className="transition-colors duration-300 ease-in-out"
            value="startupper"
          >
            Employee
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="relative h-[600px]">
        <AnimatePresence mode="wait">
          {role === 'mentor' && (
            <motion.div
              key="mentor"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MentorForm />
            </motion.div>
          )}
          {role === 'startup_admin' && (
            <motion.div
              key="founder"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FounderForm />
            </motion.div>
          )}
          {role === 'startupper' && (
            <motion.div
              key="startupper"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <StartupperForm startupsPromise={startupsPromise} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
