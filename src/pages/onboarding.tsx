import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Step1 } from '~/components/Onboarding/Step1'
import { Step2 } from '~/components/Onboarding/Step2'
import { Step3 } from '~/components/Onboarding/Step3'
import { Button } from '~/components/ui/Button'
import { Card } from '~/components/ui/Card'
import { Heading } from '~/components/ui/Heading'
import { Link } from '~/components/ui/Link'

const onboardingTabs = [
	{
		label: 'Welcome',
		panel: <Step1 />,
		id: 0,
	},
	{
		label: 'Follow',
		panel: <Step2 />,
		id: 1,
	},
	{
		label: 'Your Profile',
		panel: <Step3 />,
		id: 2,
	},
]

export default function Onboarding() {
	const router = useRouter()
	const [currentStep, setCurrentStep] = useState<number>(
		router.query.step ? parseInt(router.query.step as string) : 0
	)

	function handleChange(idx: number) {
		setCurrentStep(idx)
		router.push(
			{
				pathname: '/onboarding',
				query: {
					step: idx.toString(), // update the query param
				},
			},
			undefined,
			{ shallow: true }
		)
	}
	function handleNext() {
		setCurrentStep(currentStep + 1)
	}

	function handleBack() {
		setCurrentStep(currentStep - 1)
	}

	return (
		<div className="px-2 md:px-0 min-h-screen">
			<div className="fixed top-0 w-full z-50 bg-white dark:bg-gray-700">
				<div className="py-2 flex justify-center items-center">
					<Link href="/">
						<svg
							className="hi-solid hi-cube-transparent inline-block w-10 h-10 mr-1  text-brand-600"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z"
								clipRule="evenodd"
							/>
						</svg>
					</Link>
					<Heading size="h5">DogeSocial</Heading>
				</div>
				<div className={`w-full bg-gray-200 rounded-full h-2.5`}>
					<div
						className="bg-brand-500 h-2.5 rounded-full"
						style={{
							width:
								currentStep === 0
									? `${100 / 3}%`
									: currentStep === 1
									? `${100 / 2}%`
									: `${100 / 1}%`,
						}}
					></div>
				</div>
			</div>
			<div className="lg:px-8 mt-10 py-6 mx-auto w-full sm:py-6 lg:py-10 max-w-2xl">
				<Tab.Group
					onChange={(idx) => handleChange(idx)}
					defaultIndex={currentStep}
				>
					<Tab.List
						className="-mb-px overflow-hideen border-b border-gray-200 relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
						aria-label="Tabs"
					>
						{onboardingTabs.map((step, tabIdx) => {
							return (
								<Tab
									key={step.id}
									className={({ selected }) =>
										clsx(
											currentStep === step.id
												? 'bg-brand-100 text-brand-700'
												: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
											tabIdx === 0 ? 'rounded-l-lg' : '',
											tabIdx === onboardingTabs.length - 1
												? 'rounded-r-lg'
												: '',
											'group relative min-w-0 flex-1  overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10'
										)
									}
								>
									<p className="text-base font-medium">{step.label}</p>
								</Tab>
							)
						})}
					</Tab.List>
					<Tab.Panels>
						{currentStep === 1 && <Step2 />}
						{currentStep === 0 && <Step1 />}
						{currentStep === 2 && <Step3 />}
					</Tab.Panels>
				</Tab.Group>

				<div className="flex justify-between">
					{currentStep > 0 && (
						<Button
							onClick={handleBack}
							variant="dark"
							className="my-5"
							size="xl"
						>
							← Previous
						</Button>
					)}
					{currentStep < onboardingTabs.length - 1 && (
						<Button onClick={handleNext} className="my-5 ml-auto" size="xl">
							Next →
						</Button>
					)}
					{currentStep === 2 && (
						<Button href="/feed/all" className="my-5 ml-auto" size="xl">
							Finish →
						</Button>
					)}
				</div>
			</div>
		</div>
	)
}

//
