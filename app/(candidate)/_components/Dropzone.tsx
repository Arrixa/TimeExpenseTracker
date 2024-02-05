'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone, FileRejection, DropEvent } from 'react-dropzone'
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { getSignature, saveToDatabase } from '../upload/_actions'
import { Button } from '@/app/components/ui/button'

interface FileInfo {
  name: string;
  preview: string;
  // Add other properties as needed
}

const Dropzone = () => {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [rejected, setRejected] = useState<FileRejection[]>([]);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => {
    console.log(event)
    if (acceptedFiles?.length) {
      setFiles(previousFiles => [
        // If allowing multiple files
        // ...previousFiles,
        ...acceptedFiles.map(file =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      ])
    }
    setRejected(fileRejections);
    // if (rejectedFiles?.length) {
      // setRejected(previousFiles => [...previousFiles, ...rejectedFiles])
    // }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': []
    },
    maxSize: 1024 * 1000,
    maxFiles: 1,
    onDrop
  })

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach(file => URL.revokeObjectURL(file.preview))
  }, [files])



  async function action() {
    const file = files[0]
    console.log(file)
    if (!file) return

    // get a signature using server action
    const { timestamp, signature } = await getSignature()

    // upload to cloudinary using the signature
    const formData = new FormData()

    files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    if (
      process.env.NEXT_PUBLIC_CLOUDINARY_URL &&
      process.env.CLOUDINARY_API_KEY &&
      signature &&
      timestamp
    ) {
      // Append other parameters
      formData.append('api_key', process.env.CLOUDINARY_API_KEY);
      formData.append('signature', signature); // Assuming 'signature' and 'timestamp' are already defined
      formData.append('timestamp', timestamp);
      formData.append('folder', 'next');

      // Your fetch logic here
      const url = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
      const data = await fetch(url, {
        method: 'POST',
        body: formData,
      }).then((res) => res.json());

      console.log(data);
      await saveToDatabase({
        version: data?.version,
        signature: data?.signature,
        public_id: data?.public_id
      })
    } else {
      console.error('Some required values are undefined');
    }
  };

  return (
    <form action={action}>
      <div className='p-16 mt-10 border border-input'>
        <input {...getInputProps({ name: 'file' })} />
        <div className='flex flex-col items-center justify-center gap-4'>
          <ArrowUpTrayIcon className='h-5 w-5 fill-current' />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag & drop files here, or click to select files</p>
          )}
        </div>
      </div>
    </form>
  )
}

export default Dropzone

  // const removeFile = name => {
  //   setFiles(files => files.filter(file => file.name !== name))
  // }

  // const removeAll = () => {
  //   setFiles([])
  //   setRejected([])
  // }

  // const removeRejected = name => {
  //   setRejected(files => files.filter(({ file }) => file.name !== name))
  // }

      {/* Preview */}
      {/* <section className='mt-10'>
        <div className='flex gap-4'>
          <h2 className='title text-3xl font-semibold'>Preview</h2>
          <button
            type='button'
            onClick={removeAll}
            className='mt-1 rounded-md border border-rose-400 px-3 text-[12px] font-bold uppercase tracking-wider text-stone-500 transition-colors hover:bg-rose-400 hover:text-white'
          >
            Remove all files
          </button>
          <button
            type='submit'
            className='ml-auto mt-1 rounded-md border border-purple-400 px-3 text-[12px] font-bold uppercase tracking-wider text-stone-500 transition-colors hover:bg-purple-400 hover:text-white'
          >
            Upload to Cloudinary
          </button>
        </div>

        {/* Accepted files */}
        {/*<h3 className='title mt-10 border-b pb-3 text-lg font-semibold text-stone-600'>
          Accepted Files
        </h3>
        <ul className='mt-6 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
          {files.map(file => (
            <li key={file.name} className='relative h-32 rounded-md shadow-lg'>
              <Image
                src={file.preview}
                alt={file.name}
                width={100}
                height={100}
                onLoad={() => {
                  URL.revokeObjectURL(file.preview)
                }}
                className='h-full w-full rounded-md object-contain'
              />
              <button
                type='button'
                className='absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center rounded-full border border-rose-400 bg-rose-400 transition-colors hover:bg-white'
                onClick={() => removeFile(file.name)}
              >
                <XMarkIcon className='h-5 w-5 fill-white transition-colors hover:fill-rose-400' />
              </button>
              <p className='mt-2 text-[12px] font-medium text-stone-500'>
                {file.name}
              </p>
            </li>
          ))}
        </ul>

        {/* Rejected Files */}
        {/* <h3 className='title mt-24 border-b pb-3 text-lg font-semibold text-stone-600'>
          Rejected Files
        </h3>
        <ul className='mt-6 flex flex-col'>
          {rejected.map(({ file, errors }) => (
            <li key={file.name} className='flex items-start justify-between'>
              <div>
                <p className='mt-2 text-sm font-medium text-stone-500'>
                  {file.name}
                </p>
                <ul className='text-[12px] text-red-400'>
                  {errors.map(error => (
                    <li key={error.code}>{error.message}</li>
                  ))}
                </ul>
              </div>
              <button
                type='button'
                className='mt-1 rounded-md border border-rose-400 px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-stone-500 transition-colors hover:bg-rose-400 hover:text-white'
                onClick={() => removeRejected(file.name)}
              >
                remove
              </button>
            </li>
          ))}
        </ul>
      </section> */}
