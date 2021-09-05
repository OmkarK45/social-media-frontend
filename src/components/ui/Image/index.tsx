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

					isLoaded && 'is-loaded'
				)}
				style={{
					['--img-aspect-ratio' as keyof React.CSSProperties]: `${
						((height as any) / (width as any)) * 100
					}%`,
				}}
			>
				<BlurhashCanvas
					hash={blurHash}
					punch={1}
					style={{
						position: 'absolute',
						inset: 0,
						width,
						height,
					}}
				/>
				<NextImage
					className="img__element"
					onLoadingComplete={() => setIsLoaded(true)}
					src={src}
					height={height}
					width={width}
					{...props}
				/>
			</div>
		</>
	)
}
