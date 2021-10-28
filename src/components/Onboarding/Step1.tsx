export function Step1() {
	return (
		<div className="space-y-6">
			<div
				style={{
					backgroundPosition: 'center',

					backgroundImage:
						'url(https://res.cloudinary.com/dogecorp/image/upload/v1635431084/dogesocial/covers/bg_nakcmn.svg)',
				}}
				className="py-8 mx-auto w-full sm:py-10 my-6 relative  lg:max-w-2xl overflow-hidden rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 lg:py-8 md:px-6 lg:flex lg:items-center lg:justify-between md:shadow-xl md:bg-purple-1000"
			>
				{/* <div className="absolute top-0 right-0 hidden w-full -mt-20 transform rotate-45 translate-x-1/2 bg-white sm:block h-96 opacity-5"></div> */}
				{/* <div className="absolute top-0 left-0 hidden w-full -mt-20 transform rotate-45 -translate-x-1/2 bg-pink-300 sm:block h-96 opacity-5"></div> */}
				<div className="relative p-4 rounded-lg md:p-0 ">
					<h2 className="text-3xl font-extrabold leading-9 tracking-tight text-white sm:text-4xl sm:leading-10">
						<div>Welcome to DogeSocial!</div>
					</h2>
					<p className="w-full mt-5 text-base leading-6 text-pink-100 md:w-3/4">
						A social network for dogs.
					</p>
				</div>
			</div>
		</div>
	)
}
