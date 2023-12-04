export async function seed(knex) {
  await knex('multiplayer').del()

  
}
