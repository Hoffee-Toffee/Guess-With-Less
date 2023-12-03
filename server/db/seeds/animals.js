export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('sd-prompts').del()

  // Inserts seed entries
  await knex('sd-prompts').insert([
    { id: 1, name: 'Bear', category: 'animals'},
    { id: 2, name: 'Cat', category: 'animals'},
    { id: 3, name: 'Giraffe', category: 'animals'},
    { id: 4, name: 'Hippo', category: 'animals'},
    { id: 5, name: 'Pug', category: 'animals'},
    { id: 6, name: 'Tiger', category: 'animals'},
    { id: 7, name: 'Walter White', category: 'humans'},
    { id: 8, name: 'Red Panda', category: 'animals'},
    { id: 9, name: 'Sean Penn', category: 'humans'},
    
  ]
)}