'use client'

import React, { useState } from 'react'
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { z } from 'zod'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

const schema = z.object({
  name: z.string().min(2, 'Full name must be at least 2 characters'),
  startupName: z.string().min(3, 'Startup name must be at least 3 characters'),
  description: z.string(),
})

export type FounderFormSchema = z.infer<typeof schema>

export default function FounderForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<FounderFormSchema>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      startupName: '',
      description: '',
    },
  })

  const onSubmit: SubmitHandler<FounderFormSchema> = async (data) => {
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
              name="startupName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="startupName">Startup Name</FormLabel>
                  <FormControl>
                    <Input
                      id="startupName"
                      placeholder="Enter your startup name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="description">{'Bio'}</FormLabel>
                  <FormControl>
                    <Textarea
                      id="description"
                      placeholder="Tell us about your experience and goals for the mentorship program"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
        </Card>
      </form>
    </Form>
  )
}
