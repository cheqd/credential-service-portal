import { type RequestHandler } from "@sveltejs/kit";
import { env as privEnv } from '$env/dynamic/private';


/** @type {import('./$types').RequestHandler} */
export const POST = ( async( { request }) => {
	
    console.log('clicked')

    // const response = await fetch('http://localhost:3000/admin/subscription/list', {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'id-token': request.headers.get('id-token') || '',
    //         'Authorization': `Bearer ${privEnv.LOGTO_M2M_TOKEN}`
    //     },
    // });
    // console.log(await response.text())
    const requestBody = await request.json()
    const response = await fetch('http://localhost:3000/admin/checkout/session/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'id-token': request.headers.get('id-token') || '',
            'Authorization': `Bearer ${privEnv.LOGTO_M2M_TOKEN}`
        },
        body: JSON.stringify(requestBody)
    });
    return new Response(JSON.stringify(await response.json()))
}) satisfies RequestHandler;