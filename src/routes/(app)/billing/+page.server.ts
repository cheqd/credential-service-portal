import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const idToken = await locals.idToken;
    return { idToken }

};