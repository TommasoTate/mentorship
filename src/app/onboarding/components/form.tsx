'use client'

import React, { use, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { completeOnboarding } from '../actions'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { Startup } from '@/db/schema'

const schema = z.object({
  role: z.enum(['startupper', 'startup-admin', 'mentor'] as const),
  name: z.string().min(2, 'Full name must be at least 2 characters'),
  startup: z.string().min(1, 'Please select or enter a startup name'),
  description: z.string(),
})

export type OnboardingForm = z.infer<typeof schema>

export default function OnboardingForm({
  startupsPromise,
}: {
  startupsPromise: Promise<Startup[]>
}) {
  const { user } = useUser()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const startups = use(startupsPromise)

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OnboardingForm>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      role: 'startupper',
      name: '',
      startup: '',
      description: '',
    },
  })

  const role = watch('role')

  const onSubmit = async (data: OnboardingForm) => {
    setIsSubmitting(true)
    try {
      const res = await completeOnboarding(data)
      if (res?.message) {
        await user?.reload()
        router.push('/')
      }
      if (res?.error) {
        // handle error
        console.error(res.error)
        // You might want to set an error state here and display it to the user
      }
    } catch (error) {
      console.error('An error occurred:', error)
      // You might want to set an error state here and display it to the user
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRoleChange = (
    newRole: 'startupper' | 'startup-admin' | 'mentor',
  ) => {
    setValue('role', newRole)
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Startup Mentorship Program</CardTitle>
        <CardDescription>
          Apply to our mentorship program as a startupper, founder, or mentor.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <Tabs
            value={role}
            onValueChange={handleRoleChange as (value: string) => void}
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger
                value="startupper"
                className="transition-colors duration-300 ease-in-out"
              >
                Employee
              </TabsTrigger>
              <TabsTrigger
                value="startup-admin"
                className="transition-colors duration-300 ease-in-out"
              >
                Founder
              </TabsTrigger>
              <TabsTrigger
                value="mentor"
                className="transition-colors duration-300 ease-in-out"
              >
                Mentor
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    {...field}
                  />
                )}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <AnimatePresence mode="sync">
              <motion.div
                key={role}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {role === 'startupper' ? (
                  <div>
                    <Label htmlFor="startup-from">Startup From</Label>
                    <Controller
                      name="startup"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger id="startup">
                            <SelectValue placeholder="Select your startup" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {startups.map((startup) => (
                                <SelectItem
                                  key={startup.id}
                                  value={startup.name}
                                >
                                  {startup.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.startup && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.startup.message}
                      </p>
                    )}
                  </div>
                ) : role === 'startup-admin' ? (
                  <div>
                    <Label htmlFor="startup">Startup Name</Label>
                    <Controller
                      name="startup"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="startup"
                          placeholder="Enter your startup name"
                          {...field}
                        />
                      )}
                    />
                    {errors.startup && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.startup.message}
                      </p>
                    )}
                  </div>
                ) : null}
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="sync">
              {(role === 'startup-admin' || role === 'mentor') && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <Label htmlFor="description">
                      {role === 'startup-admin' ? 'Description' : 'Bio'}
                    </Label>
                    <Controller
                      name="description"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          id="description"
                          placeholder={
                            role === 'startup-admin'
                              ? 'Tell us about your experience and goals for the mentorship program'
                              : 'Share your background and what you can offer as a mentor'
                          }
                          className="min-h-[100px]"
                          {...field}
                        />
                      )}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="ml-auto" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Apply'
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
