import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'
import dotEnv from 'dotenv'
import { FileUpload } from 'graphql-upload'
// just in case
dotEnv.config()

const cloud_name = process.env.CLOUDINARY_CLOUD_NAME
const api_key = process.env.CLOUDINARY_API_KEY
const api_secret = process.env.CLOUDINARY_API_SECRET
const folder = process.env.CLOUDINARY_FOLDER

cloudinary.config({
	cloud_name,
	api_key,
	api_secret,
})

export async function upload(file: FileUpload): Promise<UploadApiResponse> {
	const newFile = await file
	console.log('UPLOAD FX 20', newFile)
	return new Promise((resolve, reject) => {
		const uploadStream = cloudinary.uploader.upload_stream(
			{
				folder,
			},
			(err, img) => {
				if (img) {
					resolve(img)
				} else {
					console.log('UPLOAD FX 30', err)
					reject(err)
				}
			}
		)

		newFile.createReadStream().pipe(uploadStream)
	})
}
