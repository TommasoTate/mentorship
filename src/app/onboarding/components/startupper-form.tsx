'use client'

import React, { use, useState } from 'react'
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { selectStartupSchema, Startup } from '@/db/schema'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { z } from 'zod'
import form from './form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

const schema = z.object({
  name: z.string().min(2, 'Full name must be at least 2 characters'),
  startupId: z.string(),
  description: z.string(),
})

export type StartupperFormSchema = z.infer<typeof schema>

export default function StartupperForm({
  startupsPromise,
}: {
  startupsPromise: Promise<Startup[]>
}) {
  const startups = use(startupsPromise)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<StartupperFormSchema>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      startupId: '',
      description: '',
    },
  })

  const onSubmit: SubmitHandler<StartupperFormSchema> = async (data) => {
    setIsSubmitting(true)
    try {
      console.log(data)
    } catch (error) {
      console.error('An error occurred:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Startup Mentorship Program</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startupId"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="startup">Startup From</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your startup" />
                        </SelectTrigger>
                        <SelectContent>
                          {startups.map((startup) => (
                            <SelectItem
                              key={startup.id}
                              value={startup.id.toString()}
                            >
                              {startup.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting} className="ml-auto">
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
        </Card>
      </form>
    </Form>
  )
}
