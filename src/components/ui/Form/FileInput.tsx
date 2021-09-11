/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx'
import React, { useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'
import { HiOutlinePhotograph } from 'react-icons/hi'
import { Alert } from '../Alert'

interface FileInputProps
	extends React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	label?: string
	name: string
	existingimage?: string | null
}

const maxSize = 5242880

export function FileInput(props: FileInputProps) {
	const { name, label = name, existingimage } = props

	const { register, unregister, setValue, watch } = useFormContext()

	const files: File[] = watch(name)

	const onDrop = useCallback(
		(droppedFiles) => {
			setValue(name, droppedFiles, { shouldValidate: true })
		},
		[setValue, name]
	)

	const {
		getRootProps,
		getInputProps,
		isDragActive,
		isDragReject,
		acceptedFiles,
		fileRejections,
	} = useDropzone({
		onDrop,
		accept: props.accept,
		maxSize,
	})

	useEffect(() => {
		register(name)
		return () => {
			unregister(name)
		}
	}, [register, unregister, name])

	const isFileTooLarge =
		fileRejections.length > 0 && fileRejections[0].file.size > maxSize

	return (
		<div>
			<label className="block font-medium mb-1 capitalize" htmlFor={name}>
				{label}
			</label>
			<div {...getRootProps()}>
				<input
					{...props}
					className="shadow appearance-none border rounded w-full py-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id={name}
					{...getInputProps()}
				/>
				<div
					className={clsx(
						'border-2 border-gray-300 dark:border-gray-500 border-dashed rounded-md  flex justify-center  overflow-hidden',
						isDragActive
							? 'bg-gray-400 dark:bg-gray-800'
							: 'bg-white dark:bg-gray-800'
					)}
					style={
						existingimage && !files?.length
							? {
									backgroundImage: `url(${existingimage})`,
									backgroundRepeat: 'no-repeat',
									backgroundSize: '100%',
									backgroundPosition: 'center center',
							  }
							: {}
					}
				>
					{!files?.length ? (
						<>
							{isFileTooLarge ? (
								<div>
									<Alert
										status="error"
										message="Your image is too large to upload. Consider keeping it below 5 MB. Click to upload again."
									/>
								</div>
							) : (
								<div className="space-y-1 py-3">
									<div className="z-10">
										<HiOutlinePhotograph className="mx-auto h-10 w-10 text-brand-600  dark:text-brand-700" />
										<div className="flex text-sm">
											<label className="relative text-center cursor-pointer text-brand-600 dark:text-brand-400 rounded-md font-medium ">
												<p>Upload a file or drag and drop</p>
											</label>
										</div>
										<p className="text-xs  text-center">
											PNG, JPG, GIF up to 5MB
										</p>
									</div>
								</div>
							)}
						</>
					) : null}

					{!!files?.length && (
						<div>
							{files.map((file) => {
								return (
									<div key={file.name}>
										<img
											className="mx-auto max-w-sm object-cover"
											src={URL.createObjectURL(file)}
											alt={file.name}
										/>
									</div>
								)
							})}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
