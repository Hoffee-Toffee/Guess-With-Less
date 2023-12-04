export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('multiplayer').del()

  // Inserts seed entries
  await knex('multiplayer').insert([{ id: 1, text: 'drugs are cool' }])
}
