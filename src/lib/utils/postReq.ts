import type { WikiResponse, WikiResponseWithData } from '@nemowiki/core/types';

export default function postReq(
	url: string,
	data: any
): Promise<WikiResponse | WikiResponseWithData<any>> {
	return new Promise((resolve, reject) => {
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(async (res) => {
				if (res.status >= 400 && res.status < 600) {
					reject(await res.json());
					// resolve({
					//     success: false,
					//     result: await res.json()
					// });
				} else {
					const response = await res.json();
					if (response.reason !== undefined) resolve(response);
					else resolve({ ok: true, reason: '', data: response });
				}
			})
			.catch((e) => {
				console.log(e);
				reject(e);
			});
	});
}
