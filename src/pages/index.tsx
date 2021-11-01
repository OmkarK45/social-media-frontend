import { GetServerSideProps, NextPage } from 'next'
import { Navbar } from '~/components/Common/Navbar'
import React from 'react'
import { Hero } from '~/components/Hero'
import { unauthenticatedRoute } from '~/utils/redirection'

export default function Home() {
	return (
		<div className="min-h-screen overflow-hidden bg-white dark:bg-gray-900 ">
			<Navbar />
			<Hero />
		</div>
	)
}

export const getServerSideProps: GetServerSideProps = async (ctx) =>
	unauthenticatedRoute(ctx, '/feed/all')
