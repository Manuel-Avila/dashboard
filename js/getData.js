import { apiFetchGet } from './api.js';

export async function getDeceased() {
  return apiFetchGet('/deceased');
}
