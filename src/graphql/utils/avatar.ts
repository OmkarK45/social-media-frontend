const AVATARS = [
	'https://res.cloudinary.com/dogecorp/image/upload/v1631713031/dogesocial/v1/images/12_k69qix.svg',
	'https://res.cloudinary.com/dogecorp/image/upload/v1631712848/dogesocial/v1/images/120_gdzpqn.svg',
	'https://res.cloudinary.com/dogecorp/image/upload/v1631712848/dogesocial/v1/images/10_angmg5.svg',
	'https://res.cloudinary.com/dogecorp/image/upload/v1631712848/dogesocial/v1/images/11_jbcc3z.svg',
	'https://res.cloudinary.com/dogecorp/image/upload/v1631712846/dogesocial/v1/images/3_pssn4i.svg',
	'https://res.cloudinary.com/dogecorp/image/upload/v1631712846/dogesocial/v1/images/8_ni0eag.svg',
	'https://res.cloudinary.com/dogecorp/image/upload/v1631712846/dogesocial/v1/images/5_kv1wxd.svg',
	'https://res.cloudinary.com/dogecorp/image/upload/v1631712846/dogesocial/v1/images/4_vxnd5t.svg',
	'https://res.cloudinary.com/dogecorp/image/upload/v1631712574/dogesocial/v1/images/1_oi7c6m.svg',
	'https://res.cloudinary.com/dogecorp/image/upload/v1631712846/dogesocial/v1/images/2_vvbbfo.svg',
]

const COVER_IMAGES = [
	'https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
	'https://images.unsplash.com/photo-1593642532454-e138e28a63f4?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1169&q=80',
	'https://images.unsplash.com/photo-1634413656640-0bc2a33be4d1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1228&q=80',
	'https://images.unsplash.com/photo-1634404406279-dbe44a8a3114?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80',
]

export function getAvatar() {
	const index = Math.floor(Math.random() * AVATARS.length)
	return AVATARS[index]
}

export function getCoverImages() {
	const index = Math.floor(Math.random() * COVER_IMAGES.length)
	return COVER_IMAGES[index]
}
