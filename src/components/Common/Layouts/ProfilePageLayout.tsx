import React from 'react'

interface ProfilePageLayoutProps {
	children: React.ReactNode
}

export function ProfilePageLayout({ children }: ProfilePageLayoutProps) {
	return <div className="max-w-7xl mx-auto">{children}</div>
}
