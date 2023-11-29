export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('prompts').del()

  // Inserts seed entries
  await knex('prompts').insert([
    { id: 1, name: 'banana', category: 'fruit', images: '' },
    { id: 2, name: 'apple', category: 'fruit', images: '' },
    { id: 3, name: 'pineapple', category: 'fruit', images: '' },
    { id: 4, name: 'panda', category: 'animal', images: '' },
    { id: 5, name: 'tiger', category: 'animal', images: '' },
    { id: 6, name: 'octopus', category: 'animal', images: '' },
  ])
}
