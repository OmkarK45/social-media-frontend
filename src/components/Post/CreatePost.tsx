/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import router from 'next/router'
import { object, z } from 'zod'
import { EmojiData } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import { HiXCircle } from 'react-icons/hi'

import Form, { useZodForm } from '../ui/Form/Form'
import { FileInput } from '../ui/Form/FileInput'
import { Card } from '../ui/Card'
import { TextArea } from '../ui/TextArea'
import { EmojiPicker } from '../ui/EmojiPicker'
import { GIFPicker } from '../ui/GIFPicker'

import {
	CreatePostMutation,
	CreatePostMutationVariables,
} from './__generated__/CreatePost.generated'

const oneOf = (keys: string[]) => (val: any) => {
	for (const k of keys) {
		if (val[k] !== undefined) return true
	}
	return false
}

const CreatePostSchema = object({
	caption: z.string().nonempty('Caption is required.').max(400),
	media: z.any().optional(),
	gifLink: z.string().optional(),
}).refine(oneOf(['caption', 'media']), {
	message: 'Please include a text body for posts without images.',
	path: ['caption'],
})

const CREATE_POST_MUTATION = gql`
	mutation CreatePostMutation($input: CreatePostInput!) {
		createPost(input: $input) {
			id
		}
	}
`

export function CreatePost() {
	const [createPost] = useMutation<
		CreatePostMutation,
		CreatePostMutationVariables
	>(CREATE_POST_MUTATION, {
		onCompleted(data) {
			router.push(`/post/${data.createPost.id}`)
		},
	})

	const form = useZodForm({
		schema: CreatePostSchema,
	})

	function handleEmojiPick(emote: EmojiData) {
		//The types provided by these types are incorrect. I promise there's a native obj here
		// @ts-ignore
		form.setValue('caption', form.watch('caption') + emote.native)
	}

	const [currentGIF, setCurrentGIF] = useState('')

	function handleGIFPick(gif: any) {
		setCurrentGIF(gif.images.original.url)
	}

	return (
		<div>
			<Form
				form={form}
				onSubmit={async (values) => {
					await createPost({
						variables: {
							input: {
								caption: values.caption,
								media: values?.media?.[0],
								gifLink: currentGIF,
							},
						},
					})
				}}
			>
				<Card.Body className="space-y-5">
					<div className="relative">
						<TextArea
							label="Caption"
							placeholder="Include body for your post."
							{...form.register('caption')}
						/>
						<div className="absolute bottom-3 left-3 flex space-x-3">
							<EmojiPicker onEmojiPick={handleEmojiPick} />
							<GIFPicker
								disabled={currentGIF !== ''}
								onGIFPick={handleGIFPick}
							/>
						</div>
					</div>

					{/* GIF Preview */}
					<div>
						<label className="mb-1 font-medium dark:text-white ">
							GIF Post
						</label>
						{currentGIF ? (
							<div className="relative md:w-1/2 lg:w-1/2 mx-auto">
								<img src={currentGIF} alt="GIF" />
								<button
									onClick={() => setCurrentGIF('')}
									className="absolute top-4 right-4"
								>
									<HiXCircle className="w-6 h-6 hover:text-gray-500" />
								</button>
							</div>
						) : (
							<p className="text-muted">
								Select a GIF from selector to post a GIF post!
							</p>
						)}
					</div>

					<FileInput
						name="media"
						accept="image/png, image/jpg, image/jpeg, image/gif"
					/>
				</Card.Body>
				<Card.Footer className="flex justify-end">
					<Form.SubmitButton size="lg">Upload</Form.SubmitButton>
				</Card.Footer>
			</Form>
		</div>
	)
}
