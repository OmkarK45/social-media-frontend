import Image from 'next/image'
import { buildUrl, extractPublicId } from 'cloudinary-build-url'

interface CloudinaryImageProps {
	publicId: string
	height: number
	width: number
	alt: string
	title?: string
	className?: string
}

export const Public_ID_Regex = /upload\/(?:v\d+\/)?([^\.]+)/

export default function CloudinaryImg({
	publicId,
	height,
	width,
	alt = 'Project Image',
	title,
	className,
}: CloudinaryImageProps) {
	const urlBlurred = buildUrl(publicId, {
		cloud: {
			cloudName: 'dogecorp',
		},
		transformations: {
			effect: {
				name: 'blur:1000',
			},
			quality: 1,
		},
	})
	console.log(urlBlurred)
	const url = buildUrl(publicId, {
		cloud: {
			cloudName: 'dogecorp',
		},
	})

	return (
		<div
			className={className}
			style={{
				position: 'relative',
				height: 0,
				paddingTop: `${(height / width) * 100}%`,
				backgroundImage: `url(${urlBlurred})`,
				backgroundPosition: 'center center',
				backgroundSize: `100%`,
			}}
		>
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
				}}
			>
				<Image
					width={width}
					height={height}
					src={url}
					alt={alt}
					unoptimized={true}
					title={title || alt}
				/>
			</div>
		</div>
	)
}
