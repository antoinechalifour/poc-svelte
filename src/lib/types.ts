import type { RequestInfo, RequestInit, Response } from 'node-fetch';

export type Fetch = (info: RequestInfo, init?: RequestInit) => Promise<Response>;

export type ImgSerializer = (arrayBuffer: ArrayBuffer) => string;

export const RequestJson = (fetch: Fetch) => <T = unknown>(url: string) =>
	fetch(url).then((response) => response.json() as Promise<T>);

export const RequestArrayBuffer = (fetch: Fetch) => (url: string): Promise<ArrayBuffer> =>
	fetch(url).then((response) => response.arrayBuffer());
