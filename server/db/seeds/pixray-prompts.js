export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('pixray-prompts').del()

  // Inserts seed entries
  await knex('pixray-prompts').insert([
    {
      id: 2,
      name: 'apple',
      category: 'fruit',
      images: `[
      "https://replicate.delivery/pbxt/rUXreqOTy4zATSbOW3OZtldCiC0FJAy7rcAv4G7gbscgzqeRA/tempfile.png",
      "https://replicate.delivery/pbxt/TXvGuGiOdq5PNNSB0SkN84BtVgml2jwAUcTsDXdvK892ZVfIA/tempfile.png",
      "https://replicate.delivery/pbxt/ZxOL8nvYeOX1Z6FLZ7QOBFjgnIrcn6OJR3qfJUHoo821nV9RA/tempfile.png",
      "https://replicate.delivery/pbxt/4FHrWxnlTjaBAZFOB6ykBx1HVZ8ieXjrj7zFS31dUysH0qeRA/tempfile.png",
      "https://replicate.delivery/pbxt/ldAkeYNfY6r5eJLxMSEpwPgdHIQppvpjeTsXzntoy6eJFtqPC/tempfile.png",
      "https://replicate.delivery/pbxt/c5jd9VfObJWaTSoDqI2C3Nfla4RJFKkNRpI7kuItkNZDpV9RA/tempfile.png",
      "https://replicate.delivery/pbxt/P3nlC0oxXYbjDV0X9fe6PiA3OR3pvoceyUAbz9wHXds6Sr6jA/tempfile.png",
      "https://replicate.delivery/pbxt/l0meTSeOm2taGUicn9W3ytUKNKUblab5qoC7YApE05t3pV9RA/tempfile.png",
      "https://replicate.delivery/pbxt/YFxFQ3Mcqi6xIl48leFfRUUV2vKtCE0NyDx0uSI0Q75RqV9RA/tempfile.png",
      "https://replicate.delivery/pbxt/Q7dDaMJQV2oCDFqQPNzZPRLWthqqTqmqP6UQFH4XW27qaVfIA/tempfile.png",
      "https://replicate.delivery/pbxt/fegSJzK2zApwvk4v0ZsoebtfeuBoMvAGN6zv4gOMXVboYtqPC/tempfile.png",
      "https://replicate.delivery/pbxt/j3YPbbp1Hq6cNF7pDp6IcVWhfUHeh8IyAlfdFz8eQVWHuW1HB/tempfile.png",
      "https://replicate.delivery/pbxt/G104SwjtUab8GVsnW1s6QfFenVemwcHpHdRe8X4N1LrIwW1HB/tempfile.png",
      "https://replicate.delivery/pbxt/SaDKtFA5MXKUK1G6rg0iy81WrtSiZDpdufNPMR4Ty7PR2qeRA/tempfile.png",
      "https://replicate.delivery/pbxt/Qo8iTRTVBE4wGRMVj2eGeetWni3v3xi5LsGPvXzUw40Ear6jA/tempfile.png",
      "https://replicate.delivery/pbxt/4rkOKRozN3KVNBFGHS9tcOo12NfyuPHKnRZ32YbfPeCNar6jA/tempfile.png"
    ]`,
    },
    {
      id: 3,
      name: 'watermelon',
      category: 'fruit',
      images: `[
      "https://replicate.delivery/pbxt/AJeuIGg0OPXHSy4eQzeVdw6VrQukfKdT0dBD6XIXAZYR2W1HB/tempfile.png",
      "https://replicate.delivery/pbxt/ZEscenHIH3UcFqfRkQxTg5c9A14PXiuVh4Ek85jfHAYBcr6jA/tempfile.png",
      "https://replicate.delivery/pbxt/dIRJcY9CeFynJiatGEKctlFrwdzu6d4uufSPqCrM2Kf6cr6jA/tempfile.png",
      "https://replicate.delivery/pbxt/AUTjbPDfeaibfo86MyD7TbkuQrPzwaIm4jlL8fY18WRz7W1HB/tempfile.png",
      "https://replicate.delivery/pbxt/AXCZWV2I8p7tC9iE5v3nSbwPTe5VTrTE8Efz6MtLKuybvV9RA/tempfile.png",
      "https://replicate.delivery/pbxt/1geGW9jOSAXEHa61q0MJ0w3fHfHhPR41Gh7ufKBuUqShftqPC/tempfile.png",
      "https://replicate.delivery/pbxt/GikljdF205pYE5mbvlMiQSIIZa12YRWP0pqaWd9OXbCFcVfIA/tempfile.png",
      "https://replicate.delivery/pbxt/cToTOSPMwoY1NRvRnP6xVmuE6Xat1E5HSrJXKQ1Ye2fxwV9RA/tempfile.png",
      "https://replicate.delivery/pbxt/nufi4mmDODRez0jwuGhEXEuPeMNJdyjKDfTKj0UksYS5EX1HB/tempfile.png",
      "https://replicate.delivery/pbxt/DwilnPPrYy4EMJQkQavaKGGWuWQ4pbVGlUg2uIE8kVe14qeRA/tempfile.png",
      "https://replicate.delivery/pbxt/rryMtAeYZKx5WSffTb0ipH1XLSTg9NFGvfbllx1bNoCgIX1HB/tempfile.png",
      "https://replicate.delivery/pbxt/PfdZYbIaJMWIGCQXVQbyQa14efMZgxCHGLZ0hNUtqnzJlr6jA/tempfile.png",
      "https://replicate.delivery/pbxt/xP0NBpfSmzTeq0pOZ6uwrvr6dKzNxyaG1sI9wl4ZNdqBzV9RA/tempfile.png",
      "https://replicate.delivery/pbxt/hneqB6WTRjTJF6pcgtKHkKWyOdL7N4SsW6T2417Ufes7mr6jA/tempfile.png",
      "https://replicate.delivery/pbxt/Mf2uhG6LCYRYfUDLMQyZ2oMs8Hn1rbGinQfV1GoHBxu3nr6jA/tempfile.png",
      "https://replicate.delivery/pbxt/gLacpkhhC7KrHJxl1yOhwyPhoTUPhe7yre2AtcYmDUoenr6jA/tempfile.png"
    ]`,
    },
    {
      id: 6,
      name: 'octopus',
      category: 'animal',
      images: `[
      "https://replicate.delivery/pbxt/t2ujpsgGXgagLlifqs2KYemoea6dzdZhZWWAfzJPw8pyLX1HB/tempfile.png",
      "https://replicate.delivery/pbxt/fGXgabXL6x0lY6DkummEfwCnRdS5H5urHXYRNbdnETDazV9RA/tempfile.png",
      "https://replicate.delivery/pbxt/vRlABNPNLxLcCF3E7hVYV0eU1FawXHIs8jSQkTaARcc85qeRA/tempfile.png",
      "https://replicate.delivery/pbxt/xPYL7GM9EvprC1VpGHNL17J240PUsDV8aiFBVXGY2w2FdVfIA/tempfile.png",
      "https://replicate.delivery/pbxt/QyPecQMsJftp508ottLoUM5LWt5DOVWj6TmawdTR95u10V9RA/tempfile.png",
      "https://replicate.delivery/pbxt/5CU49K3oFNJiHNFugolir1gsMpw7PMOfsMVSrNAA6UCo6qeRA/tempfile.png",
      "https://replicate.delivery/pbxt/1j3xiY9aMRKaJ5ELWj1fEFTlI9itk8F5C07uAtCupga16qeRA/tempfile.png",
      "https://replicate.delivery/pbxt/TzteZH9YfffGKSXFYv1UVVyyrT1Gio7w1fEw2FNjGebVhdVfIA/tempfile.png",
      "https://replicate.delivery/pbxt/Z8RrXzdGQDr1LZQXEAkvRy7AUQeXCaG4OIH5K0berW6g2V9RA/tempfile.png",
      "https://replicate.delivery/pbxt/UYt4Pt1fIfuNBErP4OiVWnpBeZjmAfwkbnu9hAjgHJhtbX1HB/tempfile.png",
      "https://replicate.delivery/pbxt/cXaIf25Tcl12MqdorhhOCYeMfdKqVPt2WqupY0gf1IKZdX1HB/tempfile.png",
      "https://replicate.delivery/pbxt/hlPCPlvevgSQJibiBmafQLjSf0q9F6bfVEJv1hq9SFiDfuqPC/tempfile.png",
      "https://replicate.delivery/pbxt/yyv5CnpSjwofI623J7xFYsFx8CKbCSa6sEe7eSTNpwvVwr6jA/tempfile.png",
      "https://replicate.delivery/pbxt/32p8y6eik7U1ESfVYVZvZiOLmljupqlZpfjbJM1yiyFMxr6jA/tempfile.png",
      "https://replicate.delivery/pbxt/UdTTeiGWPw3jdCpa6Wdu0usO3F9t691OqezPmHmAqQGG5V9RA/tempfile.png",
      "https://replicate.delivery/pbxt/6dRH2tBkII6uLNfabfH5xiH4ANfv2tWt1hNANsQN825Xyr6jA/tempfile.png"
    ]`,
    },
  ])
}
