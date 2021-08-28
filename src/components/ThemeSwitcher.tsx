import clsx from 'clsx'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi'
import Button from './ui/Button'

/**
 * Guide by https://www.youtube.com/watch?v=1q5oOZE6o4c
 */
export function ThemeToggle() {
	const { systemTheme, theme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)
	const [animate, setAnimate] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	const renderThemeChanger = () => {
		if (!mounted) return null

		const currentTheme = theme === 'system' ? systemTheme : theme

		if (currentTheme === 'dark') {
			return (
				<Button
					rounded="full"
					onClick={() => {
						setTheme('light')
						setAnimate(true)
						setTimeout(() => {
							setAnimate(false)
						}, 1000)
					}}
				>
					<HiOutlineSun
						className={clsx('w-7 h-7', animate && 'animate-spin')}
						role="button"
					/>
				</Button>
			)
		} else {
			return (
				<Button
					rounded="full"
					onClick={() => {
						setTheme('dark')
						setAnimate(true)
						setTimeout(() => {
							setAnimate(false)
						}, 1000)
					}}
				>
					<HiOutlineMoon
						className={clsx('w-7 h-7', animate && 'animate-spin')}
					/>
				</Button>
			)
		}
	}

	return <>{renderThemeChanger()}</>
}
