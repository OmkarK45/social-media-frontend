import clsx from 'clsx'
import Image from 'next/image'

type Props = {
	url: string
	rounded?: boolean
	containerClassName?: string
}

export function Avatar({
	url,
	rounded = false,
	containerClassName,
	...props
}: Props) {
	return (
		<div
			className={clsx('flex-shrink-0 relative w-10 h-10', containerClassName)}
		>
			<Image
				src={url}
				alt="Picture of user"
				role="img"
				objectFit="cover"
				layout="fill"
				className={clsx(rounded && 'rounded-full')}
				{...props}
			/>
		</div>
	)
}
