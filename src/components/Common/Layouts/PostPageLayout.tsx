import React from 'react'

interface PostPageLayoutProps {
	children: React.ReactNode
}

export function PostPageLayout({ children }: PostPageLayoutProps) {
	return <div className="max-w-5xl mx-auto ">{children}</div>
}
