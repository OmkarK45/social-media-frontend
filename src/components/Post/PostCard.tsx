import { HiOutlineChat, HiOutlineShare, HiOutlineThumbUp } from 'react-icons/hi'
import { Interweave } from '../Interweave'
import { Card } from '../ui/Card'

export function PostCard() {
	return (
		<div className=" mx-auto">
			<div className="flex flex-wrap">
				<div className="md:w-2/3 w-full pb-6 md:pb-0 md:pr-6">
					<Card rounded="lg">
						<div className="px-4 py-4  sm:p-4 sm:rounded-lg">
							<div className="flex space-x-3">
								<div className="flex-shrink-0">
									<img
										className="h-10 w-10 rounded-full"
										src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
										alt=""
									/>
								</div>
								<div className="min-w-0 flex-1">
									<p className=" font-medium ">
										<a href="#" className="hover:underline">
											Omkar Kulkarni{' '}
											<span className="text-muted text-sm">@omkar_k45</span>
										</a>
									</p>
									<p className="text-sm text-muted">
										<a href="#" className="hover:underline">
											<time>5 mins ago</time>
										</a>
									</p>
								</div>
							</div>
						</div>
						{/* <img src="http://res.cloudinary.com/dogecorp/image/upload/v1631192257/dogesocial/v1/images/e7jpyiortr4aljxpatnv.jpg" /> */}

						{/* Remove class [ h-24 ] when adding a card block */}
						{/* Remove class [ border-gray-300  dark:border-gray-700 border-dashed border-2 ] to remove dotted border */}
					</Card>
					<Card className="px-4 py-4 ">
						<Interweave content=" #OKOK @omkar_k45 @user asdfasdfasdf #OK" />
					</Card>
					<pre>{JSON.stringify(/^@?(\w){1,15}$/.test('@omkar_k45'))}</pre>
					<Card className="py-4 px-4 flex justify-between space-x-8 rounded-b-lg">
						<div className="flex space-x-6">
							<span className="inline-flex items-center text-sm">
								<button
									type="button"
									className="inline-flex space-x-2  hover:text-gray-500"
								>
									<HiOutlineThumbUp className="h-5 w-5" aria-hidden="true" />
									<span className="font-medium ">99</span>
									<span className="sr-only">likes</span>
								</button>
							</span>
							<span className="inline-flex items-center text-sm">
								<button
									type="button"
									className="inline-flex space-x-2  hover:text-gray-500"
								>
									<HiOutlineChat className="h-5 w-5" aria-hidden="true" />
									<span className="font-medium ">20</span>
									<span className="sr-only">replies</span>
								</button>
							</span>
						</div>
						<div className="flex text-sm">
							<span className="inline-flex items-center text-sm">
								<button
									type="button"
									className="inline-flex space-x-2 hover:text-gray-500"
								>
									<HiOutlineShare className="h-5 w-5" aria-hidden="true" />
									<span className="font-medium ">Share</span>
								</button>
							</span>
						</div>
					</Card>
				</div>
				<div className="hidden md:block md:w-1/3 w-full">
					{/* Remove class [ h-24 ] when adding a card block */}
					{/* Remove class [ border-gray-300  dark:border-gray-700 border-dashed border-2 ] to remove dotted border */}
					<div className="rounded border-gray-300  dark:border-gray-700 border-dashed border-2 h-24" />
				</div>
			</div>
		</div>
	)
}
