import { BASE_URL } from "@/constants/URL";

export type Nasabah = {
	id?: string;
	email: string;
	phoneNumber: string;
	address: string;
	nik: string;
	birthDate: string;
	userName: string;
	password: string;
	roles?: string
}

export async function signUp(request: Nasabah) {
	try {

		const options: RequestInit = {
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(request),
		}
		const res = await fetch(BASE_URL, options)
		const { data } = await res.json()
		return data.data

	} catch (error: any) {

		console.log(error.message)
		throw new Error(error)

	}
}