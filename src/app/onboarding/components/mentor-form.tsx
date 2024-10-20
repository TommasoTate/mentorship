'use client'

import * as React from 'react'
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
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { mentorSchema } from '../formSchemas'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { mentorOnboardingAction } from '../actions'
import { useRouter } from 'next/navigation'

const MentorForm = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((_, ref) => {
  const router = useRouter()
  const { form, handleSubmitWithAction } = useHookFormAction(
    mentorOnboardingAction,
    zodResolver(mentorSchema),
    {
      formProps: {
        mode: 'onBlur',
        defaultValues: {
          name: '',
          description: '',
        },
      },
      actionProps: {
        onSuccess: () => {
          router.push('/')
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
            <>
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="description">{'Bio'}</FormLabel>
                    <FormControl>
                      <Textarea
                        id="description"
                        placeholder="Share your background and what you can offer as a mentor"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
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

MentorForm.displayName = 'MentorForm'

export default MentorForm
