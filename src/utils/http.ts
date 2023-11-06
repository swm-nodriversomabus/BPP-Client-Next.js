/**
 * url 가져오기 => env의 url에서 가져온다
 */
function getAbsoluteUrl(url: string): string{ 
    if(url.match(/http[s]?:\/\/[\S]*/i)) return url;
    return `${process.env.NEXT_PUBLIC_API_URL}${url}`
}

async function httpGet(url: string): Promise<ResponseType> {
    const absoluteUrl = getAbsoluteUrl(url);

    const response = await fetch(absoluteUrl,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    const result = await response.json();
    return result;
}

async function httpPost(url: string, body: object): Promise<ResponseType> {
    const absoluteUrl = getAbsoluteUrl(url);

    const response = await fetch(absoluteUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body),
    });

    const result = await response.json();
    return result;
}

async function httpPut(url: string, body: object): Promise<ResponseType> {
    const absoluteUrl = getAbsoluteUrl(url);

    const response = await fetch(absoluteUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body),
    });

    const result = await response.json();
    return result;
}

async function httpDelete(url: string, body: object): Promise<ResponseType> {
    const absoluteUrl = getAbsoluteUrl(url);

    const response = await fetch(absoluteUrl, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body),
    });

    const result = await response.json();
    return result;
}