import { Transition } from '@headlessui/react'
import * as React from 'react'
import { useLayer, useHover, Arrow } from 'react-laag'
import { Fragment } from 'react'

interface ToolTipProps {
	children: React.ReactNode
	content: React.ReactNode
}

export function Tooltip({ children, content }: ToolTipProps) {
	const [isOver, hoverProps] = useHover({
		delayEnter: 100,
		delayLeave: 300,
	})

	const { triggerProps, layerProps, arrowProps, renderLayer } = useLayer({
		isOpen: isOver,
		triggerOffset: 8,
		auto: true,
		possiblePlacements: ['top-center', 'bottom-center'],
	})

	return (
		<>
			<span {...triggerProps} {...hoverProps}>
				{children}
			</span>
			{isOver &&
				renderLayer(
					<div className="tooltip" {...layerProps} {...hoverProps}>
						{content}
						<Arrow {...arrowProps} />
					</div>
				)}
		</>
	)
}
