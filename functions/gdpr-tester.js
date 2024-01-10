export function onRequest(context) {
    const request = context.request;
    const resp = new Response(
        JSON.stringify({
            gdpr:
                request.cf.isEUCountry === "1" ||
                request.cf.country === "GB" ||
                false,
            country: request.cf.country,
        }),
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return resp;
}