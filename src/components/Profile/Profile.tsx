/* eslint-disable @next/next/no-img-element */
import {
	HiBadgeCheck,
	HiOfficeBuilding,
	HiOutlineCalendar,
	HiOutlineDotsVertical,
} from 'react-icons/hi'
import { Button } from '../ui/Button'

interface ProfileProps {
	username: string
}

export function Profile({ username }: ProfileProps) {
	return (
		<div>
			<div>
				<img
					className="h-32 w-full object-cover lg:h-48"
					src="http://res.cloudinary.com/dogecorp/image/upload/v1631192257/dogesocial/v1/images/e7jpyiortr4aljxpatnv.jpg"
					alt=""
				/>
				{/* <div className="h-32 w-full lg:h-48  bg-gradient-to-r from-purple-500 to-pink-500 bg-pink-400"></div> */}
			</div>
			<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 ">
				<div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
					<div className="flex">
						<img
							className="h-24 w-24 rounded-full ring-4 ring-brand-500 sm:h-32 sm:w-32"
							src="https://github.com/ashwinkhode.png"
							alt=""
						/>
					</div>
				</div>
				<div className=" sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
					<div className="space-y-4 2xl:block mt-6 min-w-0 flex-1">
						<div className="flex justify-between items-center">
							<div>
								<h1 className="text-2xl font-bold flex truncate items-center">
									Ashwin Khode
									<HiBadgeCheck className="w-6 h-6 ml-2" />
								</h1>
								<p className="text-muted text-sm">@{username}</p>
							</div>
							<div className=" flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
								<HiOutlineDotsVertical className="w-5 h-5" />
								<Button size="lg">
									<span>Follow</span>
								</Button>
							</div>
						</div>

						<p className="prose text-gray-200">
							A software engineer specializing in Web technologies & I design
							things too. <br /> ReactJS | TypeScript | GraphQL Community -
							@neogcamp ❤
						</p>
						<div>
							<dl className="mt-6 flex flex-col  sm:mt-1 sm:flex-row sm:flex-wrap">
								<dt className="sr-only">Company</dt>
								<dd className="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
									<HiOfficeBuilding
										className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
										aria-hidden="true"
									/>
									XYZ Corp, Inc
								</dd>
								<dt className="sr-only">Account status</dt>
								<dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
									<HiOutlineCalendar
										className="flex-shrink-0 mr-1.5 h-5 w-5"
										aria-hidden="true"
									/>
									Joined June, 2021
								</dd>
							</dl>
						</div>
						<div className="flex space-x-4">
							<div className="flex">
								<span className="font-bold mr-2">99</span>
								<p className="text-muted">Followers</p>
							</div>
							<div className="flex">
								<span className="font-bold mr-2">149</span>
								<p className="text-muted">Following</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
