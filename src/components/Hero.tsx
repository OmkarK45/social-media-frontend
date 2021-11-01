import { HiOutlineArrowRight } from 'react-icons/hi'
import { useUser } from '~/utils/useUser'

export function Hero() {
	const { user } = useUser()

	return (
		<section className="antialiased h-full pt-6 bg-white bg-gradient-to-b from-white to-gray-200 dark:bg-gray-800 dark:bg-gradient-to-t dark:from-gray-800 dark:to-black">
			<div className="px-12 mx-auto max-w-7xl ">
				<div className="flex flex-col items-center w-full py-10 lg:space-x-10 lg:flex-row">
					<div className="relative z-10 w-full space-y-10 lg:w-1/2">
						<h1 className="text-5xl font-bold sm:text-7xl xl:text-7xl tracking-tighter">
							Capture and share the world's moments
						</h1>
						<p className="text-base text-gray-500 sm:text-lg">
							Welcome to DogeSocial. A social media platform made for people
							like you! Come, share and see what others are up to!
						</p>
						<div className="flex flex-col items-center w-full space-x-5 lg:flex-row">
							<a
								href={user?.id ? '/feed/all' : '/auth/signup'}
								className="w-full px-6 py-6 text-xl font-medium text-center text-white bg-brand-700 shadow-xl xl:px-12 xl:text-2xl lg:w-auto hover:bg-brand-800 rounded"
							>
								<span className="flex space-x-2 items-center justify-center">
									{user?.id ? (
										<p>Go to your feed</p>
									) : (
										<>
											<p>Sign Up</p> <HiOutlineArrowRight />{' '}
										</>
									)}
								</span>
							</a>
						</div>
					</div>
					<div className="relative z-0 w-full mt-8 lg:w-1/2">
						<img
							src="https://res.cloudinary.com/dogecorp/image/upload/q_69/v1635767865/Saly-1245_eqly7l.png"
							className="transform xl:translate-x-20 lg:ml-0  lg:scale-125"
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
