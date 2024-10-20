'use client'

import React, { useMemo, useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Startup } from '@/db/schema'
import FounderForm from './founder-form'
import MentorForm from './mentor-form'
import StartupperForm from './startupper-form'
import useMeasure from 'react-use-measure'
import { TransitionPanel } from '@/components/ui/transition-panel'

export default function OnboardingForm({
  startupsPromise,
}: {
  startupsPromise: Promise<Startup[]>
}) {
  const [role, setRole] = useState<Role>('mentor')
  const [ref, { height }] = useMeasure()
  const [activeIndex, setActiveIndex] = useState(0)

  const forms = [MentorForm, FounderForm, StartupperForm]

  return (
    <div className="w-full flex flex-col justify-start max-w-2xl mx-auto space-y-6 overflow-hidden p-2 absolute top-36">
      <Tabs value={role} onValueChange={(value) => setRole(value as Role)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger
            className="transition-colors duration-300 ease-in-out"
            value="mentor"
            onClick={() => {
              setActiveIndex(0)
            }}
          >
            Mentor
          </TabsTrigger>
          <TabsTrigger
            className="transition-colors duration-300 ease-in-out"
            value="startup-admin"
            onClick={() => {
              setActiveIndex(1)
            }}
          >
            Founder
          </TabsTrigger>
          <TabsTrigger
            className="transition-colors duration-300 ease-in-out"
            value="startupper"
            onClick={() => {
              setActiveIndex(2)
            }}
          >
            Employee
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <TransitionPanel
        activeIndex={activeIndex}
        variants={{
          enter: {
            opacity: 0,
            height: height > 0 ? height : 'auto',
            position: 'initial',
          },
          center: {
            zIndex: 1,
            opacity: 1,
            height: height > 0 ? height : 'auto',
          },
          exit: {
            zIndex: 0,
            opacity: 0,
            position: 'absolute',
            top: 0,
            width: '100%',
          },
        }}
        transition={{
          opacity: { type: 'spring', duration: 0.3 },
        }}
      >
        {forms.map((Form, index) => (
          <Form ref={ref} key={index} startupsPromise={startupsPromise} />
        ))}
      </TransitionPanel>
    </div>
  )
}
