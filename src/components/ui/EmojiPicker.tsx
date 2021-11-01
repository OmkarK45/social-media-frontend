import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { AiOutlineSmile } from 'react-icons/ai'
import { Picker, EmojiData } from 'emoji-mart'

import clsx from 'clsx'
import React from 'react'

interface EmojiPickerProps {
	className?: string
	onEmojiPick: (emote: EmojiData) => void
}

export function EmojiPicker({ className, onEmojiPick }: EmojiPickerProps) {
	return (
		<div className={clsx(className)}>
			<Popover className="relative">
				{({ open }) => (
					<>
						<Popover.Button className="rounded-full group hover:bg-brand-400 p-1">
							<AiOutlineSmile className="w-7 h-7 text-brand-500 group-hover:text-brand-100" />
						</Popover.Button>
						<Transition
							as={Fragment}
							enter="transition ease-in duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95"
						>
							<Popover.Panel className=" absolute z-10  mt-3 sm:px-0 ">
								<div className="overflow-hidden rounded-lg shadow-lg  ">
									<div className="relative  lg:grid-cols-2">
										<Picker
											set="twitter"
											showSkinTones={false}
											showPreview={false}
											onSelect={(emoji) => onEmojiPick(emoji)}
											theme="auto"
										/>
									</div>
								</div>
							</Popover.Panel>
						</Transition>
					</>
				)}
			</Popover>
		</div>
	)
}
