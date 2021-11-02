const COVER_IMAGES = [
	'https://res.cloudinary.com/dogecorp/image/upload/v1634659141/dogesocial/covers/10_a0ugrp.svg',
	'https://res.cloudinary.com/dogecorp/image/upload/v1634659141/dogesocial/covers/9_gummzt.svg',
	'https://res.cloudinary.com/dogecorp/image/upload/v1634659140/dogesocial/covers/7_uopoe2.svg',
	'https://res.cloudinary.com/dogecorp/image/upload/v1634659140/dogesocial/covers/8_qm6xhv.svg',
	'https://res.cloudinary.com/dogecorp/image/upload/v1634659138/dogesocial/covers/1_k5kh9g.svg',
	'https://res.cloudinary.com/dogecorp/image/upload/v1634659139/dogesocial/covers/6_d9gfyr.svg',
	'https://res.cloudinary.com/dogecorp/image/upload/v1634659138/dogesocial/covers/5_bn4v2o.svg',
	'https://res.cloudinary.com/dogecorp/image/upload/v1634659138/dogesocial/covers/4_taodbr.svg',
	'https://res.cloudinary.com/dogecorp/image/upload/v1634659138/dogesocial/covers/2_azbche.svg',
	'https://res.cloudinary.com/dogecorp/image/upload/v1634659138/dogesocial/covers/3_ovclfm.svg',
]

const COLORS = [
	'EF4444',
	'6366F1',
	'F59E0B',
	'10B981',
	'EC4899',
	'8B5CF6',
	'6B7280',
	'3B82F6',
]

export function generateCoverImage() {
	return {
		coverImage: COVER_IMAGES[Math.floor(Math.random() * COVER_IMAGES.length)],
		coverImageBg: COLORS[Math.floor(Math.random() * COLORS.length)],
	}
}
