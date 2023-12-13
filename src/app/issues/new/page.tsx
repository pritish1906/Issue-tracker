"use client"

import { Button, TextFieldInput, TextFieldRoot } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface IssueForm {
  title: string;
  description: string;
}


const NewIssuePage = () => {
  const {register, control, handleSubmit} = useForm<IssueForm>();
  const router = useRouter();
  return (   
    <form 
    className='max-w-xl space-y-3' 
    onSubmit={handleSubmit(async(data) => {
      await axios.post('/api/issues', data)
      router.push('/issues')
    })}>
        <TextFieldRoot>
            <TextFieldInput placeholder='Title' {...register('title')}/>
        </TextFieldRoot>
        <Controller 
          name='description'
          control={control}
          render={({field}) => <SimpleMDE placeholder='Description' {...field}/>}
        />
        
        <Button>Create New Issue</Button>
    </form>
  )
}

export default NewIssuePage