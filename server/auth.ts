import { BASE_URL } from "@/constants/URL";

export type Nasabah = {
	id?: string;
	fullName: string;
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
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(request),
		}
		const res = await fetch(`${BASE_URL}/auth/signup`, options)
		const { data, message } = await res.json()
		if (!res.ok) {
			throw new Error(message)
		}
		return data

	} catch (error: any) {

		console.log(error.message)
		throw new Error(error)

	}
}