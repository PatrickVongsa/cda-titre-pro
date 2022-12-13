// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// async function main() {
//   //piste_status
//   const piste_status = await prisma.prospect_status.createMany({
//     data: [
//       {
//         name: "Nouveau",
//         color: "#FFFFFF",
//         order_number: 1,
//         is_archived: false,
//       },
//       {
//         name: "Assigné",
//         color: "#FFE600",
//         order_number: 2,
//         is_archived: false,
//       },
//       {
//         name: "En cours",
//         color: "#FF8A00",
//         order_number: 3,
//         is_archived: false,
//       },
//       {
//         name: "Gagné",
//         color: "#1FD701",
//         order_number: 4,
//         is_archived: false,
//       },
//       {
//         name: "Perdu",
//         color: "#E90000",
//         order_number: 5,
//         is_archived: false,
//       },
//     ],
//   });

//   //activity
//   const activity = await prisma.activity.createMany({
//     data: [
//       { name: "Boulanger", is_archived: false },
//       { name: "Peintre", is_archived: false },
//       { name: "Publicité", is_archived: false },
//       { name: "Avocat", is_archived: false },
//       { name: "Autres", is_archived: false },
//     ],
//   });

//   //source
//   const source = await prisma.source.createMany({
//     data: [
//       {
//         name: "Partenaire",
//         is_archived: false,
//       },
//       {
//         name: "Prospection",
//         is_archived: false,
//       },
//       {
//         name: "Bouche à oreille",
//         is_archived: false,
//       },
//       {
//         name: "Autres",
//         is_archived: false,
//       },
//     ],
//   });

//   //user
//   const user = await prisma.user.createMany({
//     data: [
//       {
//         firstname: "Seif",
//         lastname: "Al-Yakoob",
//         address: "311, Avenue de lardennes",
//         postal_code: "31000",
//         city: "Toulouse",
//         occupation: "Président",
//         contrat_type: "Associé",
//         is_archived: false,
//       },
//       {
//         firstname: "Kevin",
//         lastname: "Lancereau",
//         address: "12, rue de là-bas",
//         postal_code: "83500",
//         city: "Poitiers",
//         occupation: "Directeur général",
//         contrat_type: "Associé",
//         is_archived: false,
//       },
//       {
//         firstname: "Emmanuel",
//         lastname: "Rodriguez",
//         address: "16, rue pas dans laville",
//         postal_code: "31000",
//         city: "Toulouse",
//         occupation: "Développeur",
//         contrat_type: "Associé",
//         is_archived: false,
//       },
//       {
//         firstname: "Patrick",
//         lastname: "Vongsa",
//         address: "55, Rue des amidonniers, APT 57",
//         postal_code: "31000",
//         city: "Toulouse",
//         occupation: "Développeur",
//         contrat_type: "Associé",
//         is_archived: false,
//       },
//     ],
//   });

//   //piste
//   const piste = await prisma.prospect.createMany({
//     data: [
//       {
//         company_name: "Primère company",
//         address: "123, rue de l'élection",
//         postal_code: "12345",
//         city: "SaVille",
//         country: "France",
//         phone: "0101010101",
//         email: "contact@primere.company.com",
//         company_logo: "primere-company.jpg",
//         website_url: "primere-company.com",
//         facebook_url: "https://facebook.com/primere-company",
//         instagram_url: "https://instagram.com/primere-company",
//         linkedin_url: "https://linkedin.com/primere-company",
//         contacted_at: new Date("2017-06-01T08:30"),
//         estimate_budget: 1500,
//         need_description:
//           "ceci est la super description de la piste 1 qui comprend normalement beaucoup de mots pour vérifier si la bdd est ok avec ça!",
//         has_website: true,
//         website_year: 2021,
//         other_need: "",
//         is_client: false,
//         siret_number: "12345678901234",
//         assigned_to_id: 1,
//         piste_status_id: 1,
//         source_id: 1,
//         activity_id: 1,
//         is_archived: false,
//       },
//       {
//         company_name: "Segonde entreprise",
//         address: "45, rue de labourie",
//         postal_code: "23456",
//         city: "Biville",
//         country: "France",
//         phone: "0202020202",
//         email: "contact@segonde.com",
//         company_logo: "segonde.jpg",
//         website_url: "segonde.com",
//         facebook_url: "https://facebook.com/segonde",
//         instagram_url: "https://instagram.com/segonde",
//         linkedin_url: "https://linkedin.com/segonde",
//         contacted_at: new Date("2019-07-01T08:30"),
//         estimate_budget: 2000,
//         need_description:
//           "ceci est la super description de la piste 2 qui comprend normalement beaucoup de mots pour vérifier si la bdd est ok avec ça!",
//         has_website: true,
//         website_year: 2020,
//         other_need:
//           "oui, tellement que ce n'est pas possible de tout écrire ici...",
//         is_client: false,
//         siret_number: "12345678901234",
//         assigned_to_id: 2,
//         piste_status_id: 2,
//         source_id: 2,
//         activity_id: 2,
//         is_archived: false,
//       },
//       {
//         company_name: "InTerprise",
//         address: "45, rue de triade",
//         postal_code: "34567",
//         city: "Terville",
//         country: "France",
//         phone: "0303030303",
//         email: "contact@interprise.com",
//         company_logo: "interprise.jpg",
//         website_url: "interprise.com",
//         facebook_url: "https://facebook.com/interprise",
//         instagram_url: "https://instagram.com/interprise",
//         linkedin_url: "https://linkedin.com/interprise",
//         contacted_at: new Date("2020-06-01T08:30"),
//         estimate_budget: 2500,
//         need_description:
//           "ceci est la super description de la piste 3 qui comprend normalement beaucoup de mots pour vérifier si la bdd est ok avec ça!",
//         has_website: false,
//         website_year: null,
//         other_need: "SEA",
//         is_client: false,
//         siret_number: "12345678901234",
//         assigned_to_id: 3,
//         piste_status_id: 3,
//         source_id: 3,
//         activity_id: 3,
//         is_archived: false,
//       },
//       {
//         company_name: "Quadprise",
//         address: "45, rue des 4 filles",
//         postal_code: "34567",
//         city: "DuDokterMarch",
//         country: "France",
//         phone: "0404040404",
//         email: "contact@quadprise.com",
//         company_logo: "quadprise.jpg",
//         website_url: "quadprise.com",
//         facebook_url: "https://facebook.com/quadprise",
//         instagram_url: "https://instagram.com/quadprise",
//         linkedin_url: "https://linkedin.com/quadprise",
//         contacted_at: new Date("2021-06-01T08:30"),
//         estimate_budget: 3000,
//         need_description:
//           "ceci est la super description de la piste 4 qui comprend normalement beaucoup de mots pour vérifier si la bdd est ok avec ça!",
//         has_website: false,
//         website_year: null,
//         other_need: "SEA - SEO - e-commerce",
//         is_client: false,
//         siret_number: "12345678901234",
//         assigned_to_id: 4,
//         piste_status_id: 4,
//         source_id: 4,
//         activity_id: 4,
//         is_archived: false,
//       },
//       {
//         company_name: "Le Pentagone",
//         address: "45, rue des zaméricains",
//         postal_code: "56789",
//         city: "noullorc",
//         country: "France",
//         phone: "0505050505",
//         email: "contact@le-pentagone.com",
//         company_logo: "le-pentagone.jpg",
//         website_url: "le-pentagone.com",
//         facebook_url: "https://facebook.com/le-pentagone",
//         instagram_url: "https://instagram.com/le-pentagone",
//         linkedin_url: "https://linkedin.com/le-pentagone",
//         contacted_at: new Date("2022-04-01T08:30"),
//         estimate_budget: 3500,
//         need_description:
//           "ceci est la super description de la piste 5 qui comprend normalement beaucoup de mots pour vérifier si la bdd est ok avec ça!",
//         has_website: true,
//         website_year: 2009,
//         other_need: "la totalle",
//         is_client: true,
//         siret_number: "12345678901234",
//         assigned_to_id: 1,
//         piste_status_id: 5,
//         source_id: 1,
//         activity_id: 5,
//         is_archived: false,
//       },
//     ],
//   });

//   //contact
//   const contact = await prisma.contact.createMany({
//     data: [
//       {
//         firstname: "Jean",
//         lastname: "Jeanjean",
//         occupation: "Gérant",
//         phone: "0601010101",
//         email: "terjean@email.com",
//         is_prefered_contact: true,
//         piste_id: 1,
//         is_archived: false,
//       },
//       {
//         firstname: "Jeanne",
//         lastname: "Darque",
//         occupation: "Community Manager",
//         phone: "0602020202",
//         email: "jeanne.darque@email.com",
//         is_prefered_contact: true,
//         piste_id: 2,
//         is_archived: false,
//       },
//       {
//         firstname: "Pierre",
//         lastname: "Alaidifice",
//         occupation: "Maçon",
//         phone: "0603030303",
//         email: "pierre.alaidifice@email.com",
//         is_prefered_contact: true,
//         piste_id: 3,
//         is_archived: false,
//       },
//       {
//         firstname: "Melissa",
//         lastname: "Nonepleurepa",
//         occupation: "Minikeums-oh-oh",
//         phone: "0601010101",
//         email: "melissa.nonepleurepa@email.com",
//         is_prefered_contact: true,
//         piste_id: 4,
//         is_archived: false,
//       },
//       {
//         firstname: "Nana",
//         lastname: "Gedejasiteweb",
//         occupation: "Pas intéressé",
//         phone: "0605050505",
//         email: "terjean@email.com",
//         is_prefered_contact: true,
//         piste_id: 5,
//         is_archived: false,
//       },
//     ],
//   });
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
