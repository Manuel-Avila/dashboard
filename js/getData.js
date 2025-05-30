import { apiFetchGet } from './api.js';

export async function getGraves() {
  return apiFetchGet('/graves');
}

export async function getDeceased() {
  return apiFetchGet('/deceased');
}

export async function getBlocks() {
  return apiFetchGet('/blocks');
}

export async function getOwners() {
  return apiFetchGet('/owners');
}

export async function getRepairs() {
  return apiFetchGet('/repairs');
}

export async function getVisits() {
  return apiFetchGet('/visits');
}

export async function getLogs() {
  return apiFetchGet('/logs');
}

export async function getUsers() {
  return apiFetchGet('/users');
}

