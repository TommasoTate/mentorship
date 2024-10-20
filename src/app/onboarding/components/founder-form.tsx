'use client'

import React from 'react'
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
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { startupAdminOnboardingAction } from '../actions'
import { founderSchema } from '../formSchemas'
import { useRouter } from 'next/navigation'

const FounderForm = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((_, ref) => {
  const router = useRouter()
  const { form, handleSubmitWithAction } = useHookFormAction(
    startupAdminOnboardingAction,
    zodResolver(founderSchema),
    {
      formProps: {
        mode: 'onBlur',
        defaultValues: {
          name: '',
          startupName: '',
          description: '',
        },
      },
      actionProps: {
        onSuccess: (data) => {
          router.push('/')
        },
        onError: (error) => {
          console.log('onError', error)
        },
      },
    },
  )

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction}>
        <Card ref={ref}>
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
            <Button
              type="submit"
              className="ml-auto"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
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
})

FounderForm.displayName = 'FounderForm'

export default FounderForm
