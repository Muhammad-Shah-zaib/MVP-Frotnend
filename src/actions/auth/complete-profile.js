"use server"

import { getClient } from "@/lib/Supabase/server";
import { cookies } from "next/headers";
import { COOKIE_NAMES } from "@/constants/cookies";
import { redirect } from "next/navigation";
import { validateFullname } from "@/utils/validators";

export async function completeProfileAction(prevState, formData) {
	const fullName = formData.get("fullName");
	let errors = {};
	const fullnameError = validateFullname(fullName);
    
	if (fullnameError) {
		errors.fullName = fullnameError;
		return { success: false, errors, values: { fullName } };
	}

	const supabase = await getClient();
	const { error } = await supabase.auth.updateUser({
		data: {
			full_name: fullName.trim(),
			profile_complete: true,
		},
	});

	if (error) {
		return { success: false, errors: { root: [error.message] }, values: { fullName } };
	}

	const cookieStore = await cookies();
		cookieStore.delete(COOKIE_NAMES.COMPLETE_PROFILE_SECRET_KEY);
		redirect("/chat");
}