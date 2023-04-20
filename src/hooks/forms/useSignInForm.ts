import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { isError } from 'react-query'

import { useAuth } from '~hooks'
import { SignInFormValues } from '~types/authForms'

const defaultValues: SignInFormValues = {
  // TODO: Reset this values when building production app
  email: 'test@example.com',
  password: '123456',
  confirm: false,
}

export const useSignInForm = () => {
  const { signIn } = useAuth()
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { t } = useTranslation()

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormValues>({
    mode: 'onTouched',
    defaultValues,
  })

  const onSubmit = async (data: SignInFormValues) => {
    try {
      setIsSubmitting(true)
      setError('')
      await signIn(data)
    } catch (e) {
      if (isError(e)) {
        setError(e.message)
      } else {
        setError(t('errors.something_went_wrong'))
      }
      impactAsync(ImpactFeedbackStyle.Medium)
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    submit: handleSubmit(onSubmit),
    isSubmitting,
    setIsSubmitting,
    control,
    errors,
    error,
  }
}
