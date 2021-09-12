import {
	LinkPreview as ReactLinkPreview,
	LinkPreviewProps,
} from '@dhaiwat10/react-link-preview'
import clsx from 'clsx'

export function LinkPreview({ url, className, ...props }: LinkPreviewProps) {
	return (
		<div className="text-xs max-w-[250px] hover:bg-opacity-25">
			<ReactLinkPreview
				width="100%"
				url={url}
				imageHeight="120px"
				borderRadius="5px"
				className={clsx(className)}
				{...props}
			/>
		</div>
	)
}
