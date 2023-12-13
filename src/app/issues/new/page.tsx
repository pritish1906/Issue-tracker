"use client"

import { Button, Callout, Text, TextFieldInput, TextFieldRoot } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { AiFillInfoCircle } from 'react-icons/ai';
import { zodResolver } from '@hookform/resolvers/zod'
import { createIssueSchema } from '@/app/validationSchema';
import { z } from 'zod'

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
  const { register, control, handleSubmit, formState:{errors} } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  const router = useRouter();
  const [error, setError] = useState('');
  return (
    <div className='max-w-xl space-y-3'>
      {error &&
        <Callout.Root color='red'>
          <Callout.Icon>
            <AiFillInfoCircle />
          </Callout.Icon>
          <Callout.Text>
            {error}
          </Callout.Text>
        </Callout.Root>
      }
      <form
        className='space-y-3'
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data)
            router.push('/issues')

          } catch (error) {
            setError('An unexpected error occured!')
          }

        })}>
        <TextFieldRoot>
          <TextFieldInput placeholder='Title' {...register('title')} />
        </TextFieldRoot>
        {errors.title && <Text color='red' as='p'>*{errors.title.message}</Text>}
        <Controller
          name='description'
          control={control}
          render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
        />
        {errors.description && <Text color='red' as='p'>*{errors.description.message}</Text>}

        <Button>Create New Issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage