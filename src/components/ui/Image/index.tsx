import clsx from 'clsx'
import NextImage, { ImageProps as NextImageProps } from 'next/image'
import React from 'react'
import { BlurhashCanvas } from 'react-blurhash'

interface ImageProps extends NextImageProps {
	blurHash: string
}

export function Image({ blurHash, height, width, src, ...props }: ImageProps) {
	const [isLoaded, setIsLoaded] = React.useState(false)

	return (
		<>
			<div
				className={clsx(
					'img',
					'img--blur-down',

					isLoaded && 'is-loaded',
					'mx-auto -mb-px'
				)}
			>
				<BlurhashCanvas
					hash={blurHash}
					punch={1}
					style={{
						position: 'absolute',
						right: 0,
						left: 0,
						top: 0,
						bottom: 0,
						margin: 'auto',
						width,
						height,
					}}
				/>

				<div className="flex justify-center">
					<NextImage
						alt="TODO"
						className="img__element"
						src={src}
						height={height}
						width={width}
						{...props}
						onLoadingComplete={() => setIsLoaded(true)}
					/>
				</div>
			</div>
		</>
	)
}
