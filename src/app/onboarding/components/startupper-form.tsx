'use client'

import React, { use } from 'react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Startup } from '@/db/schema'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
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
import { startupperOnboardingAction } from '../actions'
import { startupperSchema } from '../formSchemas'
import { useRouter } from 'next/navigation'

const StartupperForm = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    startupsPromise: Promise<Startup[]>
  }
>(({ startupsPromise }, ref) => {
  const router = useRouter()
  const startups = use(startupsPromise)
  const { handleSubmitWithAction, form } = useHookFormAction(
    startupperOnboardingAction,
    zodResolver(startupperSchema),
    {
      formProps: {
        mode: 'onBlur',
        defaultValues: {
          name: '',
          startupId: '',
          description: '',
        },
      },
      actionProps: {
        onSuccess: () => {
          console.log('onSuccess')
          router.replace('/')
        },
        onError: (error) => {
          console.error('Error:', error)
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
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="ml-auto"
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

StartupperForm.displayName = 'StartupperForm'

export default StartupperForm
