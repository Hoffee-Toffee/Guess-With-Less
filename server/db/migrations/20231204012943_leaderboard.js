export async function up(knex) {
  return knex.schema.createTable('leaderboard', (table) => {
    table.increments('id').primary()
    table.string('username')
    table.integer('correct')
    table.integer('totalGuesses')
    table.string('mode')
    table.integer('gameId')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('leaderboard')
}
