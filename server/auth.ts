import { BASE_URL } from "@/constants/URL";
import * as SecureStore from "expo-secure-store";

export type Nasabah = {
	id?: string;
	fullName: string;
	email: string;
	phoneNumber: string;
	address: string;
	nik: string;
	birthDate: string;
	username: string;
	password: string;
	roles?: string
}

export type AuthRequest = {
	username: string;
	password: string;
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

export async function signIn(request: AuthRequest) {
	try {

		const options: RequestInit = {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(request),
		}
		const res = await fetch(`${BASE_URL}/auth/signin`, options)

		const { data, message } = await res.json()

		if (!res.ok) {
			throw new Error(message)
		}

		await SecureStore.setItemAsync("auth", data)

		return data

	} catch (error: any) {

		console.log(error.message)
		throw new Error(error)

	}
}