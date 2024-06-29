'use client'

import React from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { completeOnboarding } from './actions'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { User } from '@/db/schema'
import { motion, AnimatePresence } from 'framer-motion'

export default function OnboardingComponent() {
  const { user } = useUser()
  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    const res = await completeOnboarding(formData)
    if (res?.message) {
      await user?.reload()
      router.push('/')
    }
    if (res?.error) {
      // handle error
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Startup Mentorship Program</CardTitle>
        <CardDescription>
          Apply to our mentorship program and get personalized guidance to grow
          your startup.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="startupper">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="startupper">Employee</TabsTrigger>
            <TabsTrigger value="startup-admin">Founder</TabsTrigger>
          </TabsList>
          <div className="mt-6">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Enter your full name" />
            </div>
          </div>
          <AnimatePresence mode="wait">
            <TabsContent value="startupper" asChild>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mt-4">
                  <Label htmlFor="startup">Startup</Label>
                  <Select>
                    <SelectTrigger id="startup">
                      <SelectValue placeholder="Select your startup" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="acme">Acme Inc.</SelectItem>
                        <SelectItem value="globex">
                          Globex Corporation
                        </SelectItem>
                        <SelectItem value="stark">Stark Industries</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            </TabsContent>
            <TabsContent value="startup-admin" asChild>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mt-4 space-y-4">
                  <div>
                    <Label htmlFor="startup-name">Startup Name</Label>
                    <Input
                      id="startup-name"
                      placeholder="Enter your startup name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about your experience and goals for the mentorship program"
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          className="ml-auto"
          onClick={() => handleSubmit(new FormData())}
        >
          Apply
        </Button>
      </CardFooter>
    </Card>
  )
}
