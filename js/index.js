import { getGraves, getDeceased, getBlocks, getOwners, getRepairs, getVisits, getLogs, getUsers } from './getData.js';

const graves = await getGraves()
const deceased = await getDeceased()
const blocks = await getBlocks()
const owners = await getOwners()
const reparis = await getRepairs()
const visits = await getVisits()
const logs = await getLogs()
const users = getUsers()

console.log(deceased)
